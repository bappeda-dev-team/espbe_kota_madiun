"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { ButtonSc } from "@/components/common/Button/Button";

const HeaderReferensiArsitektur = () => {

  const tahun = useSelector((state: RootState) => state.Tahun.tahun);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-bold mr-1">Referensi Arsitektur Kota Madiun {tahun === 0 ? "Semua Tahun" : tahun}</h1>
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
