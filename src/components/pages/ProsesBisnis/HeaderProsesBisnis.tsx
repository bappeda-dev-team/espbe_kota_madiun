"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTahun } from "@/store/ProsesBisnisSlicer";


const HeaderProsesBisnis = () => {

  const [valueTahun, setValueTahun] = useState<number | "">("");
  const dispatch = useDispatch();
  
const handlerTahun = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const tahun = e.target.value === "" ? "" : Number(e.target.value);
  setValueTahun(tahun);
  if(tahun !== ""){
    dispatch(setTahun(tahun))
  }
}

  return (
    <>
      <div className="flex flex-wrap">
        
        <h1 className="uppercase font-bold">
          Proses Bisnis Badan Perencanaan, Penelitian dan Pengembangan Daerah
        </h1>

        <select
          className="border-0 rounded-lg uppercase font-bold"
          name="Tahun Proses Bisnis"
          id="Tahun Proses Bisnis"
          defaultValue={0}
          onChange={handlerTahun}
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
      </div>
    </>
  );
};

export default HeaderProsesBisnis;
