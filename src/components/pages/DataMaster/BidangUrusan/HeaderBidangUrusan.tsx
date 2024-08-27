"use client"

import Image from "next/image";
import { ButtonSc } from "@/components/common/Button/Button";

const HeaderBidangUrusan = () => {

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="uppercase font-bold mr-1">Data Bidang Urusan Kota Madiun</h1>
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

export default HeaderBidangUrusan;
