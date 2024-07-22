"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

function Header() {
  const { id, Id } = useParams();
  const [textPath, setTextPath] = useState<string>();
  const url = usePathname();

  useEffect(() => {
    if (url === "/" || url === "/User" || url === "/DataMaster" || url === "/PohonKinerja") {
      setTextPath("Kota");
    } else if (
      url === "/ProsesBisnis" ||
      url === "/ProsesBisnis/TambahData" ||
      url === `/ProsesBisnis/EditData/${id}` ||
      url === "/Layanan/StandartPelayanan" ||
      url === "/Layanan/LayananSPBE" ||
      url === "/Layanan/LayananSPBE/TambahData" ||
      url === `/Layanan/LayananSPBE/EditData/${Id}` ||
      url === "/DataInformasi" ||
      url === "/DataInformasi/TambahData" ||
      url === `/DataInformasi/EditData/${Id}` ||
      url === "/Aplikasi" ||
      url === "/Aplikasi/TambahData" ||
      url === `/Aplikasi/EditData/${Id}` ||
      url === "/GapArsitektur" ||
      url === "/Arsitektur" ||
      url === "/SdmInfrastruktur" ||
      url === "/PetaRencana"
    ) {
      setTextPath("Arsitekur SPBE");
    } else {
      setTextPath("-");
    }
  }, [url, id]);

  return (
    <>
      <div className="flex items-center border-b h-[77px] border-stone-300">
        <div className="flex justify-between flex-row w-full p-5">
          <div className="text-page flex flex-row">
            <h1 className="text-stone-300">{textPath}</h1>
          </div>
          <input
            type="text"
            className="bg-stone-300 rounded-lg px-5"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
