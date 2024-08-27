"use client"

import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Loading from "@/components/global/Loading/Loading";
import { useState, useEffect } from "react";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { useRouter } from "next/navigation";

interface layanan {
    Id: number;
    NamaLayanan: string;
    KodeLayanan: string;
    TujuanLayananId: tujuan_layanan;
    FungsiLayanan: string;
    Tahun: number;
    KodeOPD: string;
    KementrianTerkait: string;
    MetodeLayanan: string;
    RalLevel1id?: ral_level_1_4;
    RalLevel2id?: ral_level_1_4;
    RalLevel3id?: ral_level_1_4;
    RalLevel4id?: ral_level_1_4;
    StrategicId?: ral_level_5_7;
    TacticalId?: ral_level_5_7;
    OperationalId?: ral_level_5_7;
}

interface tujuan_layanan{
    id: number;
    nama_pohon: string;
    level_pohon: number;
}

interface ral_level_1_4{
    Id: number;
    nama_referensi: string;
    kode_referensi: string;
    level_referensi: number;
}

interface ral_level_5_7{
    id: number;
    nama_pohon: string;
    level_pohon: string;
}

const Table = () => {
    //state fetch data layanan
    const [layanan, setLayanan] = useState<layanan[]>([])
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const tahun = useSelector((state: RootState) => state.Tahun.tahun)
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value)
    const [user, setUser] = useState<any>(null);
    const token = getToken();
    const router = useRouter();

    useEffect(() => {
      const fetchUser = getUser();
      setUser(fetchUser);
    },[])

    useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if(tahun !== 0 && SelectedOpd !== "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/layananspbe/?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            if (data.data === null) {
              setLayanan([]);
              setDataNull(true);
            } else {
              setLayanan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else if(tahun == 0 && SelectedOpd != "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/layananspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            if (data.data === null) {
              setLayanan([]);
              setDataNull(true);
            } else {
              setLayanan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else if(tahun != 0 && SelectedOpd == "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/layananspbe?tahun=${tahun}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            if (data.data === null) {
              setLayanan([]);
              setDataNull(true);
            } else {
              setLayanan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else {
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/layananspbe`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            if (data.data === null) {
              setLayanan([]);
              setDataNull(true);
            } else {
              setLayanan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      }
    }, [tahun, SelectedOpd, token]);

    //tambah data
    const tambahData= async() => {
      if(user?.roles == 'admin_kota'){
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
          router.push(`/Layanan/LayananSPBE/TambahData`)
        } else {
          AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
        }
      } else {
        router.push(`/Layanan/LayananSPBE/TambahData`)
      }
    }
    //edit data
    const editData = async(id: number) => {
      if(user?.roles == 'admin_kota'){
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
          router.push(`/Layanan/LayananSPBE/EditData/${id}`)
        } else {
          AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
        }
      } else {
        router.push(`/Layanan/LayananSPBE/EditData/${id}`)
      }
    }

    const hapusDataLayanan = async(Id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const result = await fetch(`${API_URL}/v1/deletelayananspbe/${Id}`, {
                method : 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if(!result.ok){
                throw new Error("gagal terhubung dengan database server")
            }
            setLayanan(layanan.filter((item) => item.Id !== Id));
            AlertNotification("Berhasil", "Berhasil hapus data layanan", "success", 1000);
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    const cetakLayanan = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${API_URL}/exportexcelLayananspbe`, {
          method: "GET",
          headers: {
            'Authorization': `${token}`,
            // 'Content-Type': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjQxNDQ3ODcsImtvZGVfb3BkIjoiMS4wMS4wLjAwLjAuMDAuMDEuMDAyMyIsIm5hbWEiOiJhZ25hciIsIm5pcCI6InRlc3QiLCJyb2xlcyI6WyJhc24iXSwidXNlcl9pZCI6Mn0.xdcqLXbE8eNBlTbDI4qNSgdRJ8BnUSFa7bLi9Vn7t2E`,
          },
        });
        if(!response.ok){
          throw new Error('terdapat kesalahan di server atau database')
        }
        // Mengonversi respons ke Blob untuk diunduh
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        // Membuat elemen link untuk mengunduh file
        const a = document.createElement('a');
        a.href = url;
        a.download = `data_layanan_spbe_${SelectedOpd}_tahun_${tahun}.xlsx`; // Nama file yang diunduh
        document.body.appendChild(a);
        a.click();
  
        // Membersihkan elemen setelah unduhan
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    };

    if(loading){
        return <Loading />
    } else if(error){
        return <h1>Gagal memuat data halaman Layanan, silakan cek koneksi internet atau database server</h1>
    } else {

        return(
          <>
            <div className="flex justify-between mb-5">
                <ButtonSc typee="button" onClick={() => {cetakLayanan()}}>
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
                <ButtonPr typee="button" onClick={() => tambahData()}>
                <div className="flex">
                    <Image 
                    className="mr-1"
                    src="/iconLight/add.svg" 
                    alt="add" 
                    width={20} 
                    height={20} 
                    />
                    Tambah Data
                </div>
                </ButtonPr>
            </div>
            <div className="overflow-auto rounded-t-xl bg-white shadow-lg border">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-white bg-emerald-500 uppercase border">
                    <tr>
                        <th className="px-6 py-3 max-w-[20px] sticky bg-emerald-500 left-[-1px]">No.</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Nama Layanan</th>
                        <th className="border-x border-b px-6 py-3 min-w-[150px] text-center">Kode Layanan</th>
                        <th className="border-x border-b px-6 py-3 min-w-[100px] text-center">Tahun</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px] text-center">Kode OPD</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Tujuan Layanan</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Fungsi Layanan</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Metode Layanan</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Kementrian/Lembaga Terkait</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">RAL Level 1</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">RAL Level 2</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">RAL Level 3</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">RAL Level 4</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Strategic </th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Tactical</th>
                        <th className="border-x border-b px-6 py-3 min-w-[200px]">Operational</th>
                        <th className="border-x border-b px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataNull ? (
                    <tr>
                       <td className="px-6 py-3" colSpan={17}>
                           Data Kosong / Belum Ditambahkan
                       </td>
                    </tr>
                    ) : (
                        layanan.map((data, index) => (
                        <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                            <td className="border px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                            <td className="border px-6 py-4">{data.NamaLayanan ? `${data.NamaLayanan}` : "N/A"}</td>
                            <td className="border px-6 py-4 text-center">{data.KodeLayanan ? `${data.KodeLayanan}` : "N/A"}</td>
                            <td className="border px-6 py-4 text-center">{data.Tahun ? `${data.Tahun}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.KodeOPD ? `${data.KodeOPD}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.TujuanLayananId ? `${data.TujuanLayananId.nama_pohon}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.FungsiLayanan ? `${data.FungsiLayanan}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.MetodeLayanan ? `${data.MetodeLayanan}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.KementrianTerkait ? `${data.KementrianTerkait}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.RalLevel1id ? `${data.RalLevel1id.kode_referensi} ${data.RalLevel1id.nama_referensi}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.RalLevel2id ? `${data.RalLevel2id.kode_referensi} ${data.RalLevel2id.nama_referensi}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.RalLevel3id ? `${data.RalLevel3id.kode_referensi} ${data.RalLevel3id.nama_referensi}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.RalLevel4id ? `${data.RalLevel4id.kode_referensi} ${data.RalLevel4id.nama_referensi}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.StrategicId ? `${data.StrategicId.nama_pohon}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.TacticalId ? `${data.TacticalId.nama_pohon}` : "N/A"}</td>
                            <td className="border px-6 py-4">{data.OperationalId ? `${data.OperationalId.nama_pohon}` : "N/A"}</td>
                            <td className="border px-6 py-4 flex flex-col">
                                <ButtonSc 
                                    typee="button" 
                                    className="my-1"
                                    onClick={() => {editData(data.Id)}}
                                >
                                    <div className="flex items-center justify-center w-full">
                                        <Image 
                                        className="mr-1"
                                        src="/iconLight/edit.svg" 
                                        alt="edit" 
                                        width={15} 
                                        height={15} 
                                        />
                                        <span>Edit</span>
                                    </div>
                                </ButtonSc>
                                <ButtonTr 
                                    typee="button" 
                                    className="bg-red-500 my-1"
                                    onClick={() => {
                                        AlertQuestion("Hapus?", "hapus layanan yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                            if(result.isConfirmed){
                                                hapusDataLayanan(data.Id);
                                            }
                                        })
                                    }}
                                >
                                <div className="flex items-center justify-center w-full">
                                        <Image 
                                        className="mr-1"
                                        src="/iconLight/trash.svg" 
                                        alt="trash" 
                                        width={15} 
                                        height={15} 
                                        />
                                        <span>Hapus</span>
                                    </div>
                                </ButtonTr>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
          </>
        );
    }
}

export default Table;