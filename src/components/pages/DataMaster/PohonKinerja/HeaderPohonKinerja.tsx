"use client";

import { useEffect, useState } from "react";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import Image from "next/image";
import { ButtonSc } from "@/components/common/Button/Button";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface opd {
  kode_opd : string,
  nama_opd : string,
}

const HeaderPohonKinerja = () => {

  const [user, setUser] = useState<any>(null);
  const [tahun, setTahun] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const [opd, setOpd] = useState<opd[]>([]);
  const token = getToken();

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
    const data = getOpdTahun ();
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

  const sinkronPokin = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if(SelectedOpd?.value !== 'all_opd' && (SelectedOpd?.value !== undefined || null)){
        try {
          const response = await fetch(`${API_URL}/pohonkinerjafetch?kode_opd=${SelectedOpd?.value}`, {
            method: "GET",
            headers: {
              'Authorization': `${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("cant fetch data");
          }
          AlertNotification("Berhasil", "Berhasil Sinkron data pohon kinerja", "success", 1000);
          setTimeout(() => {
            window.location.reload(); // Refresh halaman
          }, 1000);
        } catch (err) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } else {
        AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
      }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <h1 className="uppercase font-bold mr-1">
            Pohon Kinerja{" "}
            {user?.roles == 'admin_kota' 
              ? `${SelectedOpd?.label == (undefined || null) ? "" : SelectedOpd?.label} ${tahun?.value == (0 || undefined) ? "" : tahun?.label}`
              : `${opd.length > 0 ? opd[0].nama_opd : ''} ${tahun?.value == ( null || undefined) ? "" : tahun?.label}`
            }
          </h1>
        </div>
        <ButtonSc onClick={() => sinkronPokin()} className="py-2">
          <div className="flex">
            <Image 
              className="mr-1"
              src="/iconLight/refresh-2.svg" 
              alt="refresh-2" 
              width={15} 
              height={15} 
            />
            Sinkron
          </div>
        </ButtonSc>
      </div>
    </>
  );
};

export default HeaderPohonKinerja;
