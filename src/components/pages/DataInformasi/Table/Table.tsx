"use client"

import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { useState, useEffect } from "react";
import Loading from "@/components/global/Loading/Loading";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import OpdNull from "@/components/common/Alert/OpdNull";

interface dataInformasi {
    Id: number
    NamaData : string,
    UraianData : string,
    SifatData : string,
    JenisData : string,
    ProdusenData : string,
    ValiditasData: string,
    PjData : string,
    KodeOPD : string,
    InformasiTerkaitInput : string,
    InformasiTerkaitOutput : string,
    Interoprabilitas : string,
    Keterangan: string,
    Tahun : number,
    RadLevel1id : rad_level_1_4,
    RadLevel2id : rad_level_1_4,
    RadLevel3id : rad_level_1_4,
    RadLevel4id : rad_level_1_4,
    StrategicId : rad_level_5_7,
    TacticalId : rad_level_5_7,
    OperationalId : rad_level_5_7;
}

interface rad_level_1_4 {
    Id: number;
    nama_referensi: string;
    kode_referensi: string;
    level_referensi: number;
}
interface rad_level_5_7 {
    id: number;
    nama_pohon: string;
    level_pohon: string;
}

const Table = () => {
    //state fetch data informasi
    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [datainformasi, setDatainformasi] = useState<dataInformasi[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const token = getToken();

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
            setDatainformasi([]);
            setDataNull(true);
          } else {
            setDatainformasi(data.data);
            setDataNull(false);
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
          fetchingData(`${API_URL}/v1/datainformasi?tahun=${tahun}`);
          setOpdKosong(false);
        } else if (SelectedOpd !== 'all_opd' && SelectedOpd !== '') {
          // Fetch OPD yang dipilih
          fetchingData(`${API_URL}/v1/datainformasi?tahun=${tahun}&kode_opd=${SelectedOpd}`);
          setOpdKosong(false);
        } else if (SelectedOpd === '') {
          // OPD kosong
          setOpdKosong(true);
        }
      } else if(user?.roles != "admin_kota" && user?.roles != undefined) {
        // Bukan admin kota, fetch default
        fetchingData(`${API_URL}/v1/datainformasi?tahun=${tahun}`);
        setOpdKosong(false);
      }
    }, [tahun, SelectedOpd, token, user]);

    //tambah data
    const tambahData= async() => {
      if(user?.roles == 'admin_kota'){
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
          router.push(`/DataInformasi/TambahData`)
        } else {
          AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
        }
      } else {
        router.push(`/DataInformasi/TambahData`)
      }
    }
    //edit data
    const editData = async(id: number) => {
      if(user?.roles == 'admin_kota'){
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
          router.push(`/DataInformasi/EditData/${id}`)
        } else {
          AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
        }
      } else {
        router.push(`/DataInformasi/EditData/${id}`)
      }
    }

    const hapusDataInformasi = async(Id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/deletedatainformasi/${Id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `${token}`,
                },
            })
            if(!response.ok){
                alert("cant fetch data")
            }
            setDatainformasi(datainformasi.filter((data) => (data.Id !== Id)))
            AlertNotification("Berhasil", "Berhasil hapus data informasi", "success", 1000);
        }catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    const cetakDataInformasi = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await fetch(`${API_URL}/exportexcelDataInformasi`, {
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
        a.download = `data_dan_informasi_${SelectedOpd}_tahun_${tahun}.xlsx`; // Nama file yang diunduh
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
        return <Loading />;
    } else if(error){
        return <h1 className="text-red-500">{error}</h1>
    } else if(opdKosong){
      return <OpdNull />
    }

    return(
        <>
          <div className="flex justify-between mb-5">
              <ButtonSc typee="button" onClick={() => {cetakDataInformasi()}}>
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
              <thead className="text-xs text-white bg-emerald-500 uppercase">
                  <tr>
                      <th className="border px-6 py-3 max-w-[20px] sticky bg-emerald-500 left-[-1px]">No.</th>
                      <th className="border px-6 py-3 min-w-[200px]">Nama Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Uraian Data</th>
                      <th className="border px-6 py-3 min-w-[150px]">Sifat Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Jenis Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Validitas Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Produsen Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Penanggung Jawab Data</th>
                      <th className="border px-6 py-3 min-w-[200px]">Informasi Terkait Input</th>
                      <th className="border px-6 py-3 min-w-[200px]">Informasi Terkait Output</th>
                      <th className="border px-6 py-3 min-w-[200px]">Interoperabilitas</th>
                      <th className="border px-6 py-3 min-w-[200px]">Keterangan</th>
                      <th className="border px-6 py-3 min-w-[100px] text-center">Tahun</th>
                      <th className="border px-6 py-3 min-w-[200px] text-center">Kode OPD</th>
                      <th className="border px-6 py-3 min-w-[200px]">RAD Level 1</th>
                      <th className="border px-6 py-3 min-w-[200px]">RAD Level 2</th>
                      <th className="border px-6 py-3 min-w-[200px]">RAD Level 3</th>
                      <th className="border px-6 py-3 min-w-[200px]">RAD Level 4</th>
                      <th className="border px-6 py-3 min-w-[200px]">Strategic</th>
                      <th className="border px-6 py-3 min-w-[200px]">Tactical</th>
                      <th className="border px-6 py-3 min-w-[200px]">Operational</th>
                      <th className="border px-6 py-3 text-center">Aksi</th>
                  </tr>
              </thead>
              <tbody>
                  {dataNull ? (
                      <tr>
                         <td className="px-6 py-3" colSpan={19}>
                           Data Kosong / Belum Ditambahkan
                         </td>
                      </tr>
                  ) : (
                      datainformasi.map((data,index) => (
                      <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                          <td className="border px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                          <td className="border px-6 py-4">{data.NamaData? `${data.NamaData}` : "N/A"}</td>
                          <td className="border px-6 py-4">{data.UraianData? `${data.UraianData}` : "N/A"}</td>
                          <td className="border px-6 py-4">{data.SifatData? `${data.SifatData}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.JenisData? `${data.JenisData}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.ValiditasData? `${data.ValiditasData}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.ProdusenData? `${data.ProdusenData}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.PjData? `${data.PjData}` : "N/A"}</td>
                          <td className="border px-6 py-4">{data.InformasiTerkaitInput ? `${data.InformasiTerkaitInput}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.InformasiTerkaitOutput ? `${data.InformasiTerkaitOutput}`: "N/A"}</td>
                          <td className="border px-6 py-4 text-center">{data.Interoprabilitas ? `${data.Interoprabilitas}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.Keterangan ? `${data.Keterangan}`: "Tanpa Keterangan"}</td>
                          <td className="border px-6 py-4 text-center">{data.Tahun ? `${data.Tahun}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.KodeOPD? `${data.KodeOPD}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.RadLevel1id? `${data.RadLevel1id.kode_referensi} ${data.RadLevel1id.nama_referensi}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.RadLevel2id? `${data.RadLevel2id.kode_referensi} ${data.RadLevel2id.nama_referensi}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.RadLevel3id? `${data.RadLevel3id.kode_referensi} ${data.RadLevel3id.nama_referensi}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.RadLevel4id? `${data.RadLevel4id.kode_referensi} ${data.RadLevel4id.nama_referensi}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.StrategicId? `${data.StrategicId.nama_pohon}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.TacticalId? `${data.TacticalId.nama_pohon}`: "N/A"}</td>
                          <td className="border px-6 py-4">{data.OperationalId? `${data.OperationalId.nama_pohon}`: "N/A"}</td>
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
                                      AlertQuestion("Hapus?", "hapus data informasi yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                          if(result.isConfirmed){
                                              hapusDataInformasi(data.Id);
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

export default Table;