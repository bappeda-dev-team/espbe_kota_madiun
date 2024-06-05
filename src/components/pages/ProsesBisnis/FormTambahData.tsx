"use client";

import Button from "@/components/common/Button/Button";
import { useState, useEffect } from "react";

interface radLevel {
  Id: number,
  kode_referensi : string,
  nama_referensi : string,
  level_referensi : number,
  jenis_referensi : string,
  tahun : number
}

interface typeProsesBisnis {
  id : number;
  nama_proses_bisnis : string;
  sasaran_kota : string;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan : string;
  rab_level_1? : radLevel;
  rab_level_2? : radLevel;
  rab_level_3? : radLevel;
  rab_level_4? : radLevel;
  rab_level_5? : radLevel;
  rab_level_6? : radLevel;
  tahun: number;
}

function FormTambahData() {

    const [dropDown, setDropDown] = useState<radLevel[]>([])
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    // fetching data untuk dropdown RAB
    useEffect(() => {
        const fetchDropdown = async () => {
            try{
                const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
                if(!response.ok){
                    throw new Error('cant fetching data');
                }
                const data = await response.json();
                setDropDown(data.data);
                console.log(data.data)
            } catch (err){
                console.log("database gagal / tidak terhubung")
            }
            
        }
        fetchDropdown();

    },[]);

    const RAD_Option = (level : number) => {
        return dropDown
        .filter(item => item.level_referensi === level)
        .map(item => (
            <option key={item.Id} value={item.Id}>{item.kode_referensi}</option>
        ))
    }

    return(
        <>
        <div className="border p-5">
            <h1 className="uppercase font-bold">Form tambah data proses bisnis</h1>
            <form className="flex flex-col mx-5 py-5">
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Proses Bisnis</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Proses Bisnis" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Sasaran Kota</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Sasaran Kota" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Bidang Urusan</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Bidang Urusan" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Kode OPD</label>
                    <input className="border px-4 py-2" id="1" name="1" type="number" placeholder="Masukkan Kode OPD" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Kode Proses Bisnis</label>
                    <input className="border px-4 py-2" id="1" name="1" type="number" placeholder="Masukkan Kode Proses Bisnis" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Tahun</label>
                    <input className="border px-4 py-2" id="1" name="1" type="number" placeholder="Masukkan Tahun" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 1">RAD Level 1</label>
                        <select className="border px-4 py-2" name="RAD Level 1" id="RAD Level 1" defaultValue="">
                            <option hidden value="">Pilih RAD Level 1</option>
                            {RAD_Option(1)}
                        </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 2">RAD Level 2</label>
                    <select className="border px-4 py-2" name="RAD Level 2" id="RAD Level 2" defaultValue="">
                        <option hidden value="">Pilih RAD Level 2</option>
                        {RAD_Option(2)}
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 3">RAD Level 3</label>
                    <select className="border px-4 py-2" name="RAD Level 3" id="RAD Level 3" defaultValue={3}>
                        <option hidden value="3">Pilih RAD Level 3</option>
                        {RAD_Option(3)}
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 4">RAD Level 4</label>
                    <select className="border px-4 py-2" name="RAD Level 4" id="RAD Level 4" defaultValue={4}>
                        <option hidden value="4">Pilih RAD Level 4</option>
                        {RAD_Option(4)}
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 5">RAD Level 5</label>
                    <select className="border px-4 py-2" name="RAD Level 5" id="RAD Level 5" defaultValue={5}>
                        <option hidden value="5">Pilih RAD Level 5</option>
                        {RAD_Option(5)}
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 6">RAD Level 6</label>
                    <select className="border px-4 py-2" name="RAD Level 6" id="RAD Level 6" defaultValue={6}>
                        <option hidden value="6">Pilih RAD Level 6</option>
                        {RAD_Option(6)}
                    </select>
                </div>
                <div className="pt-5">
                    <Button className="w-full" halaman_url="/ProsesBisnis">Simpan</Button>
                </div>
            </form>
        </div>
        </>
    )
}

export default FormTambahData;