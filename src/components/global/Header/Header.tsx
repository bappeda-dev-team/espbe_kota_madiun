"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTahun } from "@/store/TahunSlicer";

function Header() {
  const { id, Id } = useParams();
  const [textPath, setTextPath] = useState<string>();
  const url = usePathname();
  const [valueTahun, setValueTahun] = useState<number | string>("");
  const dispatch = useDispatch();


  useEffect(() => {
    if (
        url === "/" || 
        url === "/User" || 
        url === "/DataMaster" ||
        url === "/PohonKinerja" ||
        url === "/ReferensiArsitektur" ||
        url === "/SasaranKota" ||
        url === "/BidangUrusan" 
      ) {
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
      url === "/KebutuhanSPBE" ||
      url === "/KebutuhanSPBE/TambahKebutuhan" ||
      url === `/KebutuhanSPBE/EditKebutuhan/${id}` ||
      url === "/PemenuhanKebutuhan" ||
      url === "/SdmInfrastruktur" ||
      url === "/PetaRencana"
    ) {
      setTextPath("Arsitekur SPBE");
    } else {
      setTextPath("-");
    }
  }, [url, id]);

  const handlerTahun = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tahun = e.target.value === "" ? "" : Number(e.target.value);
    setValueTahun(tahun);
    if(tahun !== ""){
      dispatch(setTahun(tahun))
    }
  }

  return (
    <>
      <div className="flex items-center border-b h-[77px] border-stone-300 top-0 z-10">
        <div className="flex justify-between items-center flex-row w-screen p-5">
          <div className="text-page flex flex-row">
            <h1 className="text-stone-300">{textPath}</h1>
          </div>
          <div className="flex">
            <select 
              onChange={handlerTahun} 
              className="bg-white text-emerald-500 border border-emerald-500 rounded-lg px-3 mx-3" 
              defaultValue={0}
            >
              <option value={0}>Semua Tahun</option>
              <option value={2019}>tahun 2019</option>
              <option value={2020}>tahun 2020</option>
              <option value={2021}>tahun 2021</option>
              <option value={2022}>tahun 2022</option>
              <option value={2023}>tahun 2023</option>
              <option value={2024}>tahun 2024</option>
              <option value={2025}>tahun 2025</option>
              <option value={2026}>tahun 2026</option>
              <option value={2027}>tahun 2027</option>
              <option value={2028}>tahun 2028</option>
              <option value={2029}>tahun 2029</option>
              <option value={2030}>tahun 2030</option>
            </select>
            <button className="rounded-lg p-3 border border-emerald-500 text-emerald-500 font-bold text-sm hover:bg-emerald-500 hover:text-white">
              {/* ambil di local storage ketika sudah login */}
              Admin Kota 
            </button>
          </div>
          {/* <input type="text" className="bg-stone-300 rounded-lg px-5" placeholder="Search"/> */}
        </div>
      </div>
    </>
  );
}

export default Header;
