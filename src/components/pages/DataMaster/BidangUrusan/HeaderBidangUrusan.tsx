"use client"

import { getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ButtonSc } from "@/components/common/Button/Button";
import { AlertNotification } from "@/components/common/Alert/Alert";

const HeaderBidangUrusan = () => {

  const token = getToken();
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);

  useEffect(() => {
    const data = getOpdTahun();
      if(data.opd){
        const dataOpd = {
          value: data.opd.value,
          label: data.opd.label
        }
        setSelectedOpd(dataOpd);
      }
  },[])

  const sinkronBidangUrusan = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if(SelectedOpd?.value != ('all_opd' || undefined || null)){
        try {
          const response = await fetch(`${API_URL}/bidangurusanfetch?kode_opd=${SelectedOpd?.value}`, {
            method: "GET",
            headers: {
              'Authorization': `${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("cant fetch data");
          }
          AlertNotification("Berhasil", "Berhasil Sinkron data user", "success", 1000);
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
      <div className="flex justify-between items-center">
        <h1 className="uppercase font-bold mr-1">Data Bidang Urusan {" "}
        {SelectedOpd?.label == (undefined || null) ? "" : SelectedOpd?.label}
        </h1>
        <ButtonSc onClick={() => sinkronBidangUrusan()} className="py-2">
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

export default HeaderBidangUrusan;
