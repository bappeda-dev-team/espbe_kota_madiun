"use client";

import { ButtonSc } from "@/components/common/Button/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";

interface opd {
  kode_opd : string,
  nama_opd : string,
}

const HeaderGapArsitektur = () => {
  const [opd, setOpd] = useState<opd[]>([]);
  const [user, setUser] = useState<any>(null);
  const [tahun, setTahun] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
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

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex">
          <h1 className="uppercase font-bold">
            GAP Arsitektur{" "}
            {user?.roles == 'admin_kota' 
              ? `${SelectedOpd?.value == (undefined || null) ? "" : SelectedOpd?.label} ${tahun?.value == (undefined || null) ? "" : tahun?.label}`
              : `${opd.length > 0 ? opd[0].nama_opd : ''} ${tahun?.value == (undefined || 0) ? "Semua Tahun" : tahun?.label}`
            }
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeaderGapArsitektur;
