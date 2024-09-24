"use client";

import { useState, useEffect } from "react";
import {ButtonSc, ButtonPr} from "@/components/common/Button/Button";
import Loading from "@/components/global/Loading/Loading";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/common/Alert/Alert";
import OpdNull from "@/components/common/Alert/OpdNull";

interface rencana {
  id: number;
  keterangan: string;
  kode_opd: string;
  tahun: number;
  nama_domain: string;
  proses_bisnis: ProsesBisnis;
  jenis_kebutuhan: JenisKebutuhan[];
  indikator_pj: string;
  penanggung_jawab: PerangkatDaerah;
  rencana_pelaksanaan: RencanaPelaksanaan[];
}
interface KondisiAwal {
  id: number;
  jenis_kebutuhan_id: number;
  keterangan: string;
  tahun: number;
}

interface JenisKebutuhan {
  id: number;
  kebutuhan_id: number;
  kebutuhan: string;
  kondisi_awal: KondisiAwal[];
}

interface ProsesBisnis {
  id: number;
  nama_proses_bisnis: string;
}

interface SasaranKinerja {
  id: number;
  kode_opd: string;
  kode_sasaran: string;
  tahun_sasaran: string;
  sasaran_kinerja: string;
  anggaran_sasaran: string;
  pelaksana_sasaran: string;
  kode_subkegiatan_sasaran: string;
  subkegiatan_sasaran: string;
}

interface PerangkatDaerah {
  kode_opd: string;
  nama_opd: string;
}

interface TahunPelaksanaan {
  id_tahun_pelaksanaan: number;
  tahun: number;
}

interface RencanaPelaksanaan {
  id: number;
  kode_opd: string;
  id_kebutuhan: number;
  sasaran_kinerja: SasaranKinerja;
  indikator_pd: string;
  perangkat_daerah: PerangkatDaerah;
  tahun_pelaksanaan: TahunPelaksanaan[];
}


const Table = () => {
    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [user, setUser] = useState<any>(null);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");
    const token = getToken();
    const router = useRouter();

    const [Internal, setInternal] = useState<boolean>(true);
    const [Eksternal, setEksternal] = useState<boolean>(false);
    const [rencana, setRencana] = useState<rencana[]>([])

    useEffect(() => {
      const fetchUser = getUser();
      setUser(fetchUser);
    },[])

    useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const fetchingData = async (url: string) => {
        try {
          setLoading(true);
          const response = await fetch(url, {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('cant fetching data');
          }
          const data = await response.json();
          if (data.data === null) {
            setRencana([]);
            setDataNull(true);
          } else {
            if(Internal){
              const filtered = data.data.filter(
                (item: any) => {
                  return item.indikator_pj === "internal"
                }
              )
              setRencana(filtered);
              setDataNull(false);
            } else if(Eksternal){
              const filtered = data.data.filter(
                (item: any) => {
                  return item.indikator_pj === "eksternal"
                }
              )
              setRencana(filtered);
              setDataNull(false);
            }
          }
        } catch (err) {
          setError('Gagal memuat data, silakan cek koneksi internet atau database server');
        } finally {
          setLoading(false);
        }
      };
    
      if (user?.roles == 'admin_kota') {
        if (SelectedOpd === 'all_opd') {
          // Fetch semua OPD
          fetchingData(`${API_URL}/v1/penanggungjawabkebutuhanspbe?tahun=${tahun}`);
          setOpdKosong(false);
        } else if (SelectedOpd !== 'all_opd' && SelectedOpd !== '') {
          // Fetch OPD yang dipilih
          fetchingData(`${API_URL}/v1/penanggungjawabkebutuhanspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`);
          setOpdKosong(false);
        } else if (SelectedOpd === '') {
          // OPD kosong
          setOpdKosong(true);
        }
      } else if(user?.roles != "admin_kota" && user?.roles != undefined) {
        // Bukan admin kota, fetch default
        fetchingData(`${API_URL}/v1/penanggungjawabkebutuhanspbe?tahun=${tahun}`);
        setOpdKosong(false);
      }
    }, [tahun, SelectedOpd, token, user, Internal, Eksternal]);

    //edit data
    const editPemenuhan = async(id: number) => {
      if(user?.roles == 'admin_kota'){
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
          router.push(`/PemenuhanKebutuhan/EditPemenuhan/${id}`)
        } else {
          AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
        }
      } else {
        router.push(`/PemenuhanKebutuhan/EditPemenuhan/${id}`)
      }
    }

    if(loading){
      return <Loading />
    } else if(error){
      return <h1 className="text-red-500">{error}</h1>
    } else if(opdKosong){
      return <OpdNull />
    }

    return (
        <>
          <div className="flex justify-between mb-3">
              <div className="flex flex-wrap">
                {Internal ? 
                  <button className="rounded-lg mx-1 py-1 min-w-[100px] bg-sky-600 text-white">Internal</button>
                :
                  <button 
                    className="border rounded-lg mx-1 py-1 min-w-[100px] border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                    onClick={() => {
                      setInternal(true);
                      setEksternal(false);
                    }}
                    >
                    Internal
                  </button>
                }
                {Eksternal ? 
                  <button className="rounded-lg mx-1 py-1 min-w-[100px] text-white bg-green-600">Eksternal</button>
                  :
                  <button 
                  className="border rounded-lg mx-1 py-1 min-w-[100px] border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => {  
                    setInternal(false);
                    setEksternal(true);
                  }}
                  >
                    Eksternal
                  </button>
                }
              </div>
              <ButtonSc typee="button">
                <div className="flex">
                    <Image 
                      className="mr-1"
                      src="/iconLight/cetak.svg" 
                      alt="add" 
                      width={20}
                      height={20}
                    />
                    Cetak
                </div>
              </ButtonSc>
          </div>
          <div className="overflow-auto rounded-t-xl bg-white shadow-lg border">
              <table className="w-full text-sm text-left">
                  <thead className={`text-xs rounded-t-xl text-white ${Internal ? "bg-sky-600" : "bg-green-600"} uppercase`}>
                      <tr>
                          <th rowSpan={2} className={`border px-6 py-3 max-w-[20px] sticky ${Internal ? "bg-sky-600" : "bg-green-600"} left-[-1px]`}>No.</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[150px]">Nama Domain</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Kebutuhan</th>
                          <th colSpan={3} className="border px-6 py-3 min-w-[200px] text-center">Kondisi Awal</th>
                          <th colSpan={2} className="border px-6 py-3 min-w-[400px] text-center">Penanggung Jawab</th>
                          <th colSpan={2} className="border px-6 py-3 min-w-[400px] text-center">Sasaran Kinerja</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Pagu Anggaran</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Sub Kegiatan</th>
                          <th colSpan={2} className="border px-6 py-3 min-w-[400px] text-center">Perangkat Daerah</th>
                          <th colSpan={5} className="border px-6 py-3 min-w-[200px] text-center">Tahun</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Aksi</th>
                      </tr>
                      <tr>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2022</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2023</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2024</th>
                          <th className="border px-6 py-3 min-w-[100px] text-center">Indikator</th>
                          <th className="border px-6 py-3 min-w-[300px] text-center">Nama OPD</th>
                          <th className="border px-6 py-3 min-w-[100px] text-center">Kode</th>
                          <th className="border px-6 py-3 min-w-[300px] text-center">Nama Sasaran</th>
                          <th className="border px-6 py-3 min-w-[100px] text-center">Indikator</th>
                          <th className="border px-6 py-3 min-w-[300px] text-center">Nama OPD</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2025</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2026</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2027</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2028</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2029</th>
                      </tr>
                  </thead>
                  <tbody>
                  {dataNull ? (
                        <tr>
                            <td className="px-6 py-3" colSpan={20}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                      ) : (
                        rencana.map((data, index) => (
                          <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                              <td className="border px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                              <td className="border px-6 py-4">{data.nama_domain? data.nama_domain : "N/A"}</td>
                              {data.jenis_kebutuhan === null ?
                              <>
                                <td className="border px-6 py-4">N/A</td>
                                <td className="border px-6 py-4">N/A</td>
                                <td className="border px-6 py-4">N/A</td>
                                <td className="border px-6 py-4">N/A</td>
                              </>
                              :
                              <>
                                {data.jenis_kebutuhan.length > 1 ? 
                                  <>
                                    <td className="border px-6 py-4">
                                        <div className="flex flex-col">
                                            {data.jenis_kebutuhan.map((info, idx) => (
                                            <>
                                              <div className="my-1" key={idx}>{info.kebutuhan? info.kebutuhan : "N/A"}</div>
                                              {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                            </>
                                        ))}
                                        </div>
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div className="flex flex-col" key={idx}>
                                                <div className="my-1">{info.kondisi_awal.find(ka => ka.tahun === 2022)?.keterangan || "N/A"}</div>
                                                {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div className="flex flex-col" key={idx}>
                                                <div className="my-1">{info.kondisi_awal.find(ka => ka.tahun === 2023)?.keterangan || "N/A"}</div>
                                                {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div className="flex flex-col" key={idx}>
                                                <div className="my-1">{info.kondisi_awal.find(ka => ka.tahun === 2024)?.keterangan || "N/A"}</div>
                                                {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                            </div>
                                        ))}
                                    </td>
                                  </>
                                :
                                  <>
                                    <td className="border px-6 py-4">
                                        <div className="flex flex-col">
                                            {data.jenis_kebutuhan.map((info, idx) => (
                                            <div key={info.id}>
                                                <div>{info.kebutuhan? info.kebutuhan : "N/A"}</div>
                                            </div>
                                        ))}
                                        </div>
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div key={idx}>
                                                {info.kondisi_awal.find(ka => ka.tahun === 2022)?.keterangan || "N/A"}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div key={idx}>
                                                {info.kondisi_awal.find(ka => ka.tahun === 2023)?.keterangan || "N/A"}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {data.jenis_kebutuhan.map((info, idx) => (
                                            <div key={idx}>
                                                {info.kondisi_awal.find(ka => ka.tahun === 2024)?.keterangan || "N/A"}
                                            </div>
                                        ))}
                                    </td>
                                  </>
                                }
                                </>
                              }
                              <td className="border px-6 py-4">{data.indikator_pj? data.indikator_pj : "N/A"}</td>
                              <td className="border px-6 py-4">{data.penanggung_jawab? data.penanggung_jawab.nama_opd : "N/A"}</td>
                              {data.rencana_pelaksanaan === null ? 
                                <>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>
                                  <td className="border px-6 py-4 min-w-[200px]">N/A</td>

                                  <td className="border px-6 py-4 min-w-[200px] bg-red-500"></td>
                                  <td className="border px-6 py-4 min-w-[200px] bg-red-500"></td>
                                  <td className="border px-6 py-4 min-w-[200px] bg-red-500"></td>
                                  <td className="border px-6 py-4 min-w-[200px] bg-red-500"></td>
                                  <td className="border px-6 py-4 min-w-[200px] bg-red-500"></td>
                                  <td className="border px-6 py-4 text-center gap-2">
                                    {data.jenis_kebutuhan.map((item: any) => (
                                    <ButtonPr key={item.id} className="my-1 px-5 w-full" halaman_url={`/PemenuhanKebutuhan/TambahPemenuhan/${item.kebutuhan_id}`}>
                                      <div className="flex items-center justify-center">
                                          <Image
                                              className="mr-1"
                                              src="/iconLight/edit.svg"
                                              alt="edit"
                                              width={15}
                                              height={15}
                                          />
                                          Tambah
                                      </div>
                                    </ButtonPr>
                                    ))}
                                  </td>
                                </>
                              :
                                data.rencana_pelaksanaan.map((info) => (
                                <>
                                  <td className="border px-6 py-4">{info.sasaran_kinerja.kode_sasaran ? info.sasaran_kinerja.kode_sasaran : "N/A"}</td>
                                  <td className="border px-6 py-4">{info.sasaran_kinerja.sasaran_kinerja ? info.sasaran_kinerja.sasaran_kinerja : "N/A"}</td>
                                  <td className="border px-6 py-4">{info.sasaran_kinerja.anggaran_sasaran ? `Rp. ${info.sasaran_kinerja.anggaran_sasaran}` : "N/A"}</td>
                                  <td className="border px-6 py-4">
                                    {info.sasaran_kinerja.subkegiatan_sasaran ? 
                                      `${info.sasaran_kinerja.kode_subkegiatan_sasaran}, ${info.sasaran_kinerja.subkegiatan_sasaran}` 
                                      :
                                      "N/A"
                                    }
                                  </td>
                                  <td className="border px-6 py-4">{info.indikator_pd ? info.indikator_pd : "N/A"}</td>
                                  <td className="border px-6 py-4">{info.perangkat_daerah.nama_opd ? info.perangkat_daerah.nama_opd : "N/A"}</td>
                                  {info.tahun_pelaksanaan.find(t => t.tahun === 2025)?.tahun ?
                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                    :
                                    <td className="border px-6 py-4 bg-red-500"></td>
                                  }
                                  {info.tahun_pelaksanaan.find(t => t.tahun === 2026)?.tahun ?
                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                    :
                                    <td className="border px-6 py-4 bg-red-500"></td>
                                  }
                                  {info.tahun_pelaksanaan.find(t => t.tahun === 2027)?.tahun ?
                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                    :
                                    <td className="border px-6 py-4 bg-red-500"></td>
                                  }
                                  {info.tahun_pelaksanaan.find(t => t.tahun === 2028)?.tahun ?
                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                    :
                                    <td className="border px-6 py-4 bg-red-500"></td>
                                  }
                                  {info.tahun_pelaksanaan.find(t => t.tahun === 2029)?.tahun ?
                                    <td className="border px-6 py-4 text-center text-white font-extrabold bg-green-500">V</td>
                                    :
                                    <td className="border px-6 py-4 bg-red-500"></td>
                                  }
                                  <td className="border px-6 py-4 text-center gap-2">
                                    <ButtonSc className="my-1 px-5 w-full"
                                    onClick={() => editPemenuhan(info.id)}>
                                      <div className="flex items-center justify-center">
                                          <Image
                                              className="mr-1"
                                              src="/iconLight/edit.svg"
                                              alt="edit"
                                              width={15}
                                              height={15}
                                          />
                                          Edit
                                      </div>
                                    </ButtonSc>
                                  </td>
                                </>  
                                ))
                              }
                          </tr>
                        ))
                    )
                  }
                  </tbody>
              </table>
          </div>
        </>
    );
};

export default Table;
