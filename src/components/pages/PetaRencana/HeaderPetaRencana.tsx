"use client";

import { useEffect, useState } from "react";
import { ButtonSc } from "@/components/common/Button/Button";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface opd {
  kode_opd : string,
  nama_opd : string,
}

const HeaderPetaRencana = () => {
  const [user, setUser] = useState<any>(null);
  const [tahun, setTahun] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const [opd, setOpd] = useState<opd[]>([]);
  const token = getToken();

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
    if (user?.role !== "admin_kota") {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const fetchOPD = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/opd`, {
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Tidak dapat mengambil data OPD');
          }
          const data = await response.json();
          setOpd(data.data);
        } catch (err) {
          console.log("Gagal mengambil data OPD:", err);
        }
      };
      fetchOPD();
    }
  }, [user, token]);

  const cetakPetaRencana = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if(user?.roles == "admin_kota"){
      if(SelectedOpd?.value == (undefined || 'all_opd') || tahun?.value == (undefined || 0)){
        AlertNotification("Pilih Tahun dan OPD di header", "" ,"warning", 2000, true);
      } else {
        try {
          const response = await fetch(`${API_URL}/exportexcelpetarencana?kode_opd=${SelectedOpd?.value}&tahun=${tahun?.value}`, {
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
          a.download = `data_petarencana_${SelectedOpd?.value}_tahun_${tahun?.value}.xlsx`; // Nama file yang diunduh
          document.body.appendChild(a);
          a.click();
    
          // Membersihkan elemen setelah unduhan
          a.remove();
          window.URL.revokeObjectURL(url);
        } catch (err) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      }
    } else {
      if(tahun?.value == (0 || undefined)){
        AlertNotification("Pilih Tahun di header", "", "warning", 2000, true);
      } else {
        try {
          const response = await fetch(`${API_URL}/exportexcelpetarencana?kode_opd=${user?.kode_opd}&tahun=${tahun?.value}`, {
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
          a.download = `data_[petarencana_${user?.kode_opd}_tahun_${tahun?.value}.xlsx`; // Nama file yang diunduh
          document.body.appendChild(a);
          a.click();
    
          // Membersihkan elemen setelah unduhan
          a.remove();
          window.URL.revokeObjectURL(url);
        } catch (err) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      }
    }
  };
  
    return (
        <>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap">
                <h1 className="uppercase font-bold">
                  Peta Rencana{" "}
                  {user?.roles == 'admin_kota' 
                    ? `${SelectedOpd?.value == (undefined || null) ? "" : SelectedOpd?.label} ${tahun == (null || undefined) ? "" : tahun?.label}`
                    : `${opd.length > 0 ? opd[0].nama_opd : ''} ${tahun == (undefined || 0) ? "" : tahun?.label}`
                  }
                </h1>
              </div>
              {/* <ButtonSc onClick={() => cetakPetaRencana()}>Cetak</ButtonSc> */}
            </div>
        </>
    )
}

export default HeaderPetaRencana;