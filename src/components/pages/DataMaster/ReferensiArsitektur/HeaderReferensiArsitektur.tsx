"use client";

import { useEffect, useState } from "react";
import { getOpdTahun } from "@/app/Login/Auth/Auth";
import Image from "next/image";
import { ButtonSc } from "@/components/common/Button/Button";

const HeaderReferensiArsitektur = () => {

  const [tahun, setTahun] = useState<any>(null);

  useEffect(() => {
    const data = getOpdTahun ();
    if(data.tahun){
      const dataTahun = {
        value: data.tahun.value,
        label: data.tahun.label
      }
      setTahun(dataTahun);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-bold mr-1">Referensi Arsitektur Kota Madiun {tahun?.value == (0 || undefined) ? "Semua Tahun" : tahun?.label}</h1>
        <ButtonSc className="py-2">
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

export default HeaderReferensiArsitektur;
