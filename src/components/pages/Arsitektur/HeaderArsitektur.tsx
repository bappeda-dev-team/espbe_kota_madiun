"use client";

import { ButtonSc } from "@/components/common/Button/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUser } from "@/app/Login/Auth/Auth";
import { getToken } from "@/app/Login/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface opd {
  kode_opd : string,
  nama_opd : string,
}

const HeaderArsitektur = () => {
  const tahun = useSelector((state: RootState) => state.Tahun.tahun);
  const SelectedOpd = useSelector((state: RootState) => state.Opd.label);
  const [opd, setOpd] = useState<opd[]>([]);
  const [user, setUser] = useState<any>(null);
  const token = getToken();

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
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
      <div className="flex items-center justify-between">
        <div className="flex">
          <h1 className="uppercase font-bold mr-1">Arsitektur </h1>
          {user?.roles == 'admin_kota' ? 
            <h1 className="uppercase font-bold">{SelectedOpd === '' ? "Semua OPD" : SelectedOpd} {tahun === 0 ? "Semua Tahun" : tahun}</h1>
          :
            <h1 className="uppercase font-bold">{opd.length > 0 ? opd[0].nama_opd : ''} {tahun === 0 ? "Semua Tahun" : tahun}</h1>
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
    </>
  );
};

export default HeaderArsitektur;
