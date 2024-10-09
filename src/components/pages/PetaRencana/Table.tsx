"use client"

import { useEffect, useState } from "react";
import { getToken, getUser, getOpdTahun } from "@/app/Login/Auth/Auth";
import Loading from "@/components/global/Loading/Loading";
import OpdNull from "@/components/common/Alert/OpdNull";

interface PetaRencana {
    generated_id : string,
    id: number,
    kode_opd : string,
    tahun : number,
    nama_proses_bisnis : string,
    kode_proses_bisnis : string,
    layanans : layanan[],
    data_dan_informasi : datainformasi[],
    aplikasi : aplikasi[],
    kebutuhan_spbe : kebutuhan_spbe[],
}

interface layanan {
    nama_layanan : string;
}
interface datainformasi {
    nama_data : string;
}
interface aplikasi {
    nama_aplikasi : string;
}
interface kebutuhan_spbe {
        id : number,
        keterangan : string,
        kode_opd : string,
        perangkat_daerah : {
            kode_opd : string,
            nama_opd : string,
        },
        tahun : number,
        nama_domain : string,
        proses_bisnis : {
            id : number,
            nama_proses_bisnis : string,
        },
        jenis_kebutuhan : jenis_kebutuhan[],
        indikator_pj : string,
        penanggung_jawab : {
            kode_opd: string,
            nama_opd: string,
        },
        rencana_pelaksanaan : rencana_pelaksanaan[]
}
interface jenis_kebutuhan {
    id : number,
    kebutuhan_id : number,
    kebutuhan : string,
    kondisi_awal : kondisi_awal[]
}
interface rencana_pelaksanaan {
        id : number,
        kode_opd : string,
        id_kebutuhan : number,
        sasaran_kinerja : {
            id : number,
            kode_opd : string,
            kode_sasaran : string,
            tahun_sasaran : string,
            sasaran_kinerja : string,
            anggaran_sasaran : string,
            pelaksana_sasaran : string,
            kode_subkegiatan_sasaran : string,
            subkegiatan_sasaran : string,
        },
        tahun_pelaksanaan : tahun_pelaksanaan[],
}
interface kondisi_awal {
    id : number,
    jenis_kebutuhan_id : number,
    keterangan : string,
    tahun : number,
}
interface tahun_pelaksanaan {
    id_tahun_pelaksanaan : number,
    tahun : number,
}

const Table = () => {

    const token = getToken();
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<any>(null);
    const [tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [rencana, setRencana] = useState<PetaRencana[]>([]);
    const [rencanaNull, setRencanaNull] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
        const data = getOpdTahun();
        if(data.tahun){
          const dataTahun = {
            value: data.tahun.value,
            label: data.tahun.label
          }
          setTahun(dataTahun);
        }
        if(data.opd){
          const dataOpd = {
            value: data.opd.value,
            label: data.opd.label
          }
          setSelectedOpd(dataOpd);
        }
      }, []);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchPetaRencana = async(url: string) => {
            try{
                setLoading(true);
                const response = await fetch(url , {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                      },
                });
                const result = await response.json();
                if(result.code == 500){
                    setRencanaNull(true);
                    setRencana([]);
                } else if(result.code == 200 && result.data == null){
                    setRencanaNull(true);
                    setRencana([]);
                } else if(result.code == 200 && result.data != null){
                    setRencanaNull(false);
                    const data = result.data;
                    setRencana(data)
                }
            } catch(err){
                setError("Gagal mendapatkan data peta rencana, silakan cek koneksi internet atau database server");
            } finally {
                setLoading(false)
            }
        }
        if (user?.roles == 'admin_kota') {
          if (SelectedOpd?.value == 'all_opd' && tahun?.value != (undefined || null)) {
            // Fetch semua OPD
            fetchPetaRencana(`${API_URL}/v1/petarencanaspbe?tahun=${tahun?.value}`);
            setOpdKosong(false);
          } else if (SelectedOpd?.value != 'all_opd' && SelectedOpd?.value != (undefined || null) && tahun?.value != (undefined || null) ) {
            // Fetch OPD yang dipilih
            fetchPetaRencana(`${API_URL}/v1/petarencanaspbe?tahun=${tahun?.value}&kode_opd=${SelectedOpd?.value}`);
            setOpdKosong(false);
          } else if (SelectedOpd?.value == (undefined || null) || tahun?.value == (undefined || null)) {
            // OPD kosong
            setOpdKosong(true);
          }
        } else if(user?.roles != "admin_kota" && user?.roles != undefined) {
          // Bukan admin kota, fetch default
          if(tahun?.value == (undefined || null)){
            fetchPetaRencana(`${API_URL}/v1/petarencanaspbe`);
            setOpdKosong(false);
          } else {
            fetchPetaRencana(`${API_URL}/v1/petarencanaspbe?tahun=${tahun?.value}`);
            setOpdKosong(false);
          }
        }
    },[token, tahun, SelectedOpd, user]);

    const formatRupiah = (value: string | number) => {
      const number = parseFloat(value.toString()); // Ubah ke angka
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    if(loading){
        return <Loading />
    } else if(rencanaNull){
        return <h1>Belum ada data peta rencana yang ditambahkan di {SelectedOpd?.label} di {tahun?.label}</h1>
    } else if(error){
        return <h1 className="text-red-500">{error}</h1>
    } else if(opdKosong) {
        return <OpdNull />
    }else {
        return(
            <>
                {rencana.map((data: any) => (
                    <>
                    <div key={data.id} className="w-full py-2 px-3 mt-3 rounded-t-xl bg-gradient-to-r to-[#007F73] from-[#35BC81] text-white">
                        <div className="flex flex-wrap items-center font-extrabold">
                            <h1 className="uppercase">Proses Bisnis :</h1>
                            <h1 className="uppercase">{data.nama_proses_bisnis ? data.nama_proses_bisnis : "kosong"}</h1>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-2 border-emerald-500 text-emerald-500 px-6 py-3 min-w-[200px] max-w-[400px]">Layanan</th>
                                    <th className="border-2 border-emerald-500 text-emerald-500 px-6 py-3 min-w-[200px] max-w-[400px]">Data Informasi</th>
                                    <th className="border-2 border-emerald-500 text-emerald-500 px-6 py-3 min-w-[200px] max-w-[400px]">Aplikasi</th>
                                    <th className="border-2 border-emerald-500 text-emerald-500 px-6 py-3 min-w-[200px] max-w-[400px]">Ket.Kebutuhan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* layanan */}
                                {data.layanans.length > 1 ? 
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.layanans.map((layanans: any, index: number) => (
                                            <>
                                                <h1>{layanans.nama_layanan}</h1>
                                                {index < data.layanans.length - 1 && <hr className="border-t-2 border-emerald-500 my-2" />}
                                            </>
                                        ))}
                                    </td>
                                :
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.layanans.map((layanans: any, index: number) => (
                                            <h1 key={index}>{layanans.nama_layanan}</h1>
                                        ))}
                                    </td>
                                }
                                {/* data dan informasi */}
                                {data.data_dan_informasi.length > 1 ? 
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.data_dan_informasi.map((data: any, index: number) => (
                                            <>
                                                <h1>{data.nama_data}</h1>
                                                {index < data.data_dan_informasi.length - 1 && <hr className="border-t-2 border-emerald-500 my-2" />}
                                            </>
                                        ))}
                                    </td>
                                :
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.data_dan_informasi.map((data: any, index: number) => (
                                            <h1 key={index}>{data.nama_data}</h1>
                                        ))}
                                    </td>
                                }
                                {/* aplikasi */}
                                {data.aplikasi.length > 1 ? 
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.aplikasi.map((aplikasi: any, index: number) => (
                                            <>
                                                <h1>{aplikasi.nama_aplikasi}</h1>
                                                {index < data.aplikasi.length - 1 && <hr className="border-t-2 border-emerald-500 my-2" />}
                                            </>
                                        ))}
                                    </td>
                                :
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                        {data.aplikasi.map((aplikasi: any, index: number) => (
                                            <h1 key={index}>{aplikasi.nama_aplikasi}</h1>
                                        ))}
                                    </td>
                                }
                                {/* kebutuhan */}
                                {data.kebutuhan_spbe.length == 0 ? 
                                    <td className="border-2 border-emerald-500 px-6 py-4 text-center text-red-500">Data Kosong</td>
                                :
                                    data.kebutuhan_spbe.length > 1 ? 
                                        <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                            {data.kebutuhan_spbe.map((kebutuhan: any, index: number) => (
                                                <>
                                                    <h1>{kebutuhan.keterangan}</h1>
                                                    {index < data.kebutuhan_spbe.length - 1 && <hr className="border-t-2 border-emerald-500 my-2" />}
                                                </>
                                            ))}
                                        </td>
                                    :
                                        <td className="border-2 border-emerald-500 px-6 py-4 text-center">
                                            {data.kebutuhan_spbe.map((kebutuhan: any, index: number) => (
                                                <h1 key={index}>{kebutuhan.keterangan}</h1>
                                            ))}
                                        </td>
                                }
                            </tbody>
                        </table>
                    </div>
                    {data.kebutuhan_spbe.length == 0 ? 
                        <></>
                    :
                        <>
                        {data.kebutuhan_spbe.map((kebutuhan: any) => (
                            <>
                            <div key={kebutuhan.id} className="border-x-2 border-b-2 border-emerald-500 bg-emerald-500 text-white w-full py-1 px-2">
                                <div className="flex flex-wrap justify-between">
                                    <h1 className="font-semibold">Ket.Kebutuhan : {kebutuhan.keterangan ? kebutuhan.keterangan : "kosong"}</h1>
                                </div>
                            </div>
                            <div className="border-x-2 border-b-2 border-emerald-500 w-full py-2 px-3">
                                    <div className="overflow-auto rounded-xl border-2 border-emerald-500">
                                        <table className="w-full text-sm">
                                            <thead className="">
                                                <tr>
                                                    <th rowSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">Kebutuhan SPBE</th>
                                                    <th rowSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">Domain</th>
                                                    <th colSpan={3} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">Kondisi Awal</th>
                                                    <th colSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[400px] text-center">Perangkat Daerah</th>
                                                    <th colSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[400px] text-center">Sasaran Kinerja</th>
                                                    <th rowSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">Pagu Anggaran</th>
                                                    <th rowSpan={2} className="border-r-2 border-emerald-500 px-6 py-3 min-w-[400px] text-center">Sub Kegiatan</th>
                                                    <th colSpan={5} className="px-6 py-3 min-w-[200px] text-center">Tahun</th>
                                                </tr>
                                                <tr>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2022</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2023</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2024</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[100px] text-center">Pelaksana</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[300px] text-center">Nama OPD</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[50px] text-center">Kode</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[350px] text-center">Nama Sasaran</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2025</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2026</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2027</th>
                                                    <th className="border-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2028</th>
                                                    <th className="border-y-2 border-emerald-500 px-6 py-3 min-w-[200px] text-center">2029</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {kebutuhan.jenis_kebutuhan.map((jk: any) => (
                                                <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                                                    <td className="border-r-2 border-y-2 border-emerald-500 px-6 py-4">{jk.kebutuhan ? jk.kebutuhan : "kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{kebutuhan.nama_domain ? kebutuhan.nama_domain : "kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{jk.kondisi_awal.find((ka: any) => ka.tahun == 2022)?.keterangan || "Kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{jk.kondisi_awal.find((ka: any) => ka.tahun == 2023)?.keterangan || "Kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{jk.kondisi_awal.find((ka: any) => ka.tahun == 2024)?.keterangan || "Kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{kebutuhan.indikator_pj ? kebutuhan.indikator_pj: "kosong"}</td>
                                                    <td className="border-2 border-emerald-500 px-6 py-4">{kebutuhan.penanggung_jawab.nama_opd ? kebutuhan.penanggung_jawab.nama_opd : "kosong"}</td>
                                                    {kebutuhan.rencana_pelaksanaan === null ?
                                                        <>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px]">Kosong</td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px]">Kosong</td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px]">Kosong</td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px]">Kosong</td>

                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px] bg-red-500"></td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px] bg-red-500"></td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px] bg-red-500"></td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px] bg-red-500"></td>
                                                            <td className="border-2 border-emerald-500 px-6 py-4 min-w-[200px] bg-red-500"></td>
                                                        </> 
                                                    :
                                                        kebutuhan.rencana_pelaksanaan.map((rp: any) => (
                                                            <>
                                                                <td className="border-2 border-emerald-500 px-6 py-4">{rp.sasaran_kinerja.kode_sasaran ? rp.sasaran_kinerja.kode_sasaran : "kosong"}</td>
                                                                <td className="border-2 border-emerald-500 px-6 py-4">{rp.sasaran_kinerja.sasaran_kinerja ? rp.sasaran_kinerja.sasaran_kinerja : "kosong"}</td>
                                                                <td className="border-2 border-emerald-500 px-6 py-4">{rp.sasaran_kinerja.anggaran_sasaran ? formatRupiah(rp.sasaran_kinerja.anggaran_sasaran) : "kosong"}</td>
                                                                <td className="border-2 border-emerald-500 px-6 py-4">
                                                                    {rp.sasaran_kinerja.subkegiatan_sasaran ? 
                                                                    `${rp.sasaran_kinerja.kode_subkegiatan_sasaran}, ${rp.sasaran_kinerja.subkegiatan_sasaran}` 
                                                                    :
                                                                    "kosong"
                                                                    }
                                                                </td>
                                                                {rp.tahun_pelaksanaan.find((t: any) => t.tahun === 2025)?.tahun ?
                                                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                                                    :
                                                                    <td className="border px-6 py-4 bg-red-500"></td>
                                                                }
                                                                {rp.tahun_pelaksanaan.find((t: any) => t.tahun === 2026)?.tahun ?
                                                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                                                    :
                                                                    <td className="border px-6 py-4 bg-red-500"></td>
                                                                }
                                                                {rp.tahun_pelaksanaan.find((t: any) => t.tahun === 2027)?.tahun ?
                                                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                                                    :
                                                                    <td className="border px-6 py-4 bg-red-500"></td>
                                                                }
                                                                {rp.tahun_pelaksanaan.find((t: any) => t.tahun === 2028)?.tahun ?
                                                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                                                    :
                                                                    <td className="border px-6 py-4 bg-red-500"></td>
                                                                }
                                                                {rp.tahun_pelaksanaan.find((t: any) => t.tahun === 2029)?.tahun ?
                                                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                                                    :
                                                                    <td className="border px-6 py-4 bg-red-500"></td>
                                                                }
                                                            </>
                                                        ))}
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                            </>
                        ))}
                        </>
                    }
                    </>
                ))}
            </>
        )
    }

}

export default Table;