"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../../global/Loading/Loading";
import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";
import Image from "next/image";
import { getToken } from "@/app/Login/Auth/Auth";
import { getUser } from "@/app/Login/Auth/Auth";
import OpdNull from "@/components/common/Alert/OpdNull";

interface rabLevel1_3 {
  Id: number;
  kode_referensi: string;
  nama_referensi: string;
  level_referensi: number;
  jenis_referensi: string;
  tahun: number;
}

interface rabLevel4_6 {
  id: number;
  nama_pohon: string;
  jenis_pohon: string;
  level_pohon: number;
  kode_opd: string;
  tahun: number;
}

interface sasaran_kota {
  ID: number;
  Sasaran: string;
}

interface bidang_urusan {
  id: number;
  bidang_urusan: string;
}

interface typeProsesBisnis {
  id: number;
  nama_proses_bisnis: string;
  sasaran_kota?: sasaran_kota;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan_id: bidang_urusan;
  rab_level_1?: rabLevel1_3;
  rab_level_2?: rabLevel1_3;
  rab_level_3?: rabLevel1_3;
  rab_level_4?: rabLevel4_6;
  rab_level_5?: rabLevel4_6;
  rab_level_6?: rabLevel4_6;
  tahun: number;
}

function Table() {
  //state fetch data proses bisnis
  const tahun = useSelector((state: RootState) => state.Tahun.tahun) //tahunProsesBisnis diambil dari store.ts, tahun diambil dari ProsesBisnisSlicer.ts -> interface TahunState{ tahun: number }
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
  const [dataProsesBisnis, setDataProsesBisnis] = useState<typeProsesBisnis[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [dataNull, setDataNull] = useState<boolean>(false);
  const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>();
  const token = getToken();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  },[])

  //fetch data proses bisnis
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
          setDataProsesBisnis([]);
          setDataNull(true);
        } else {
          setDataProsesBisnis(data.data);
          setDataNull(false);
        }
      } catch (err) {
        setError("Gagal memuat data halaman Layanan, silakan cek koneksi internet atau database server");
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.roles == 'admin_kota') {
      if (SelectedOpd === 'all_opd') {
        // Fetch semua OPD
        fetchingData(`${API_URL}/v1/prosesbisnis?tahun=${tahun}`);
        setOpdKosong(false);
      } else if (SelectedOpd !== 'all_opd' && SelectedOpd !== '') {
        // Fetch OPD yang dipilih
        fetchingData(`${API_URL}/v1/prosesbisnis?tahun=${tahun}&kode_opd=${SelectedOpd}`);
        setOpdKosong(false);
      } else if (SelectedOpd === '') {
        // OPD kosong
        setOpdKosong(true);
      }
    } else if(user?.roles != "admin_kota" && user?.roles != undefined) {
      // Bukan admin kota, fetch default
      fetchingData(`${API_URL}/v1/prosesbisnis?tahun=${tahun}`);
      setOpdKosong(false);
    }
  }, [tahun, SelectedOpd, token, user]);
  

  //tambah data
  const tambahData= async() => {
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
        router.push(`/ProsesBisnis/TambahData`)
      } else {
        AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
      }
    } else {
      router.push(`/ProsesBisnis/TambahData`)
    }
  }
  //edit data
  const editData = async(id: number) => {
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
        router.push(`/ProsesBisnis/EditData/${id}`)
      } else {
        AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
      }
    } else {
      router.push(`/ProsesBisnis/EditData/${id}`)
    }
  }
  //hapus data
  const hapusProsesBisnis = async (id: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_URL}/v1/deleteprosesbisnis/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("cant fetch data");
      }
      setDataProsesBisnis(dataProsesBisnis.filter((item) => item.id !== id));
      AlertNotification("Berhasil", "Berhasil hapus data proses bisnis", "success", 1000);
    } catch (err) {
      AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
    }
  };
  //cetak data
  const cetakProsesBisnis = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_URL}/exportexcelprosesbisnis`, {
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
      a.download = `data_proses_bisnis_${SelectedOpd}_tahun_${tahun}.xlsx`; // Nama file yang diunduh
      document.body.appendChild(a);
      a.click();

      // Membersihkan elemen setelah unduhan
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <h1>{error}</h1>;
  } else if (opdKosong){
    return <OpdNull />
  }

  return (
    <>
      <div className="flex justify-between mb-5">
        <ButtonSc typee="button" onClick={() => cetakProsesBisnis()}>
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
        <table className="w-screen text-sm text-left">
          <thead className="text-xs rounded-t-xl text-white bg-emerald-500 uppercase">
            <tr>
              <th className="px-6 py-3 max-w-[20px] sticky bg-emerald-500 left-[-1px]">No.</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Proses Bisnis</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px] text-center">Kode Proses Bisnis</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px] text-center">Kode OPD</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Bidang Urusan</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Sasaran Kota</th>
              <th className="border-x border-b px-6 py-3 min-w-[100px] text-center">Tahun</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">RAB Level 1</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">RAB Level 2</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">RAB Level 3</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Strategic</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Tactical</th>
              <th className="border-x border-b px-6 py-3 min-w-[200px]">Operational</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataNull ? (
              <tr>
                <td className="px-6 py-3" colSpan={14}>
                  Data Kosong / Belum Ditambahkan
                </td>
              </tr>
            ) : (
              dataProsesBisnis.map((data, index) => (
                <tr key={data.id} className="border-y rounded-b-lg hover:bg-slate-50">
                  <td className="px-6 py-4 sticky bg-white left-[-1px]">{index + 1}</td>
                  <td className="border px-6 py-4">{data.nama_proses_bisnis}</td>
                  <td className="border px-6 py-4 text-center">{data.kode_proses_bisnis}</td>
                  <td className="border px-6 py-4">{data.kode_opd}</td>
                  <td className="border px-6 py-4">{data.bidang_urusan_id ? `${data.bidang_urusan_id.bidang_urusan}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.sasaran_kota ? `${data.sasaran_kota.Sasaran}` : "N/A"}</td>
                  <td className="border px-6 py-4 text-center">{data.tahun}</td>
                  <td className="border px-6 py-4">{data.rab_level_1 ? `${data.rab_level_1.kode_referensi} ${data.rab_level_1.nama_referensi}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.rab_level_2 ? `${data.rab_level_2.kode_referensi} ${data.rab_level_2.nama_referensi}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.rab_level_3 ? `${data.rab_level_3.kode_referensi} ${data.rab_level_3.nama_referensi}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.rab_level_4 ? `${data.rab_level_4.nama_pohon}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.rab_level_5 ? `${data.rab_level_5.nama_pohon}` : "N/A"}</td>
                  <td className="border px-6 py-4">{data.rab_level_6 ? `${data.rab_level_6.nama_pohon}` : "N/A"}</td> 
                  <td className="px-6 py-4 flex flex-col">
                    <ButtonSc
                      typee="button"
                      className="my-1"
                      onClick={() => editData(data.id)}
                    >
                      <div className="flex">
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
                    <ButtonTr
                      typee="button"
                      className="my-1"
                      onClick={() => {
                        AlertQuestion("Hapus?", "hapus proses bisnis yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                          if(result.isConfirmed){
                              hapusProsesBisnis(data.id);
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
