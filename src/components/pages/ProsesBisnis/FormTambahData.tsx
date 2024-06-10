"use client";

import Button from "@/components/common/Button/Button";
import { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";

interface rabLevel1_3 {
  Id: number,
  kode_referensi : string,
  nama_referensi : string,
  level_referensi : number,
  jenis_referensi : string,
  tahun : number
}

function FormTambahData() {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [dropDown, setDropDown] = useState<rabLevel1_3[]>([])
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter();

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
            } catch (err){
                console.log("database gagal / tidak terhubung")
            }
            
        }
        fetchDropdown();

    },[]);

    const RAB_Option = (level : number) => {
        return dropDown
        .filter(item => item.level_referensi === level)
        .map(item => (
            <option 
                key={item.Id} 
                value={item.Id}
            >
                {item.kode_referensi}
            </option>
        ))
    }

    const prosesBisnis = async (formData: any) => {
        const dataProsesBisnis = {
            id: 1,
            kode_opd: formData.kode_opd,
            nama_proses_bisnis: formData.nama_proses_bisnis,
            sasaran_kota: formData.sasaran_kota,
            kode_proses_bisnis: formData.kode_proses_bisnis,
            bidang_urusan: formData.bidang_urusan,
            rab_level_1_id: parseInt(formData.rab_level_1_id, 10),
            rab_level_2_id: parseInt(formData.rab_level_2_id, 10),
            rab_level_3_id: parseInt(formData.rab_level_3_id, 10),
            rab_level_4_id: formData.rab_level_4_id ? parseInt(formData.rab_level_4_id, 10) : null,
            rab_level_5_id: formData.rab_level_5_id ? parseInt(formData.rab_level_5_id, 10) : null,
            rab_level_6_id: formData.rab_level_6_id ? parseInt(formData.rab_level_6_id, 10) : null,
            tahun: parseInt(formData.tahun, 10)
        }
        try{
            const response = await fetch(`${API_URL}/v1/createprosesbisnis`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json' 
                },
                body : JSON.stringify(dataProsesBisnis)
            });
            if(!response.ok) {
                throw new Error('cant post data')
            }
            const result = response.json();
            alert('berhasil menambahkan data');
            router.push("/ProsesBisnis")
        } catch (err) {
            alert("gagal menyimpan data, silakan cek koneksi internet/database server")
        }
    }
    

    return(
        <>
        <div className="border p-5">
            <h1 className="uppercase font-bold">Form tambah data proses bisnis</h1>
            <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(prosesBisnis)}>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Proses Bisnis</label>
                    <input 
                        className="border px-4 py-2" 
                        id="nama_proses_bisnis" 
                        type="text" 
                        placeholder="Masukkan Proses Bisnis"
                        {...register("nama_proses_bisnis", {required: true})}
                    />
                    {errors.nama_proses_bisnis && <><h1 className="text-red-500">proses bisnis harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota">Sasaran Kota</label>
                    <input 
                        className="border px-4 py-2" 
                        id="sasaran_kota"
                        type="text" 
                        placeholder="Masukkan Sasaran Kota"
                        {...register("sasaran_kota", {required: true})}
                    /> 
                    {errors.sasaran_kota && <><h1 className="text-red-500">sasaran kota harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="bidang_urusan">Bidang Urusan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="bidang_urusan"
                        type="text" 
                        placeholder="Masukkan Bidang Urusan" 
                        {...register("bidang_urusan", {required: true})}
                    /> 
                    {errors.bidang_urusan && <><h1 className="text-red-500">bidang urusan harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_opd">Kode OPD</label>
                    <input 
                        className="border px-4 py-2" 
                        id="kode_opd"
                        type="text" 
                        placeholder="Masukkan Kode OPD" 
                        {...register("kode_opd", {required: true})}
                    /> 
                    {errors.kode_opd && <><h1 className="text-red-500">kode OPD harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_proses_bisnis">Kode Proses Bisnis</label>
                    <input 
                        className="border px-4 py-2" 
                        id="kode_proses_bisnis" 
                        type="number" 
                        placeholder="Masukkan Kode Proses Bisnis" 
                        {...register("kode_proses_bisnis", {required: true})}
                    /> 
                    {errors.kode_proses_bisnis && <><h1 className="text-red-500">kode proses bisnis harus terisi</h1></>} 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun</label>
                    <input 
                        className="border px-4 py-2" 
                        id="tahun"
                        type="number"
                        placeholder="Masukkan Tahun" 
                        {...register("tahun", {required: true})}
                    /> 
                    {errors.tahun && <><h1 className="text-red-500">tahun harus terisi</h1></>} 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">RAB Level 1</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_1_id" 
                            defaultValue=""
                            {...register("rab_level_1_id", {required: true})}
                        >
                            <option hidden value="">Pilih RAB Level 1</option>
                            {RAB_Option(1)}
                        </select>
                        {errors.rab_level_1_id && <><h1 className="text-red-500">rab Level 1 Harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">RAB Level 2</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_2_id" 
                            defaultValue=""
                            {...register("rab_level_2_id", {required: true})}
                        >
                            <option hidden value="">Pilih RAB Level 2</option>
                            {RAB_Option(2)}
                        </select>
                        {errors.rab_level_2_id && <><h1 className="text-red-500">rab Level 2 Harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">RAB Level 3</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_3_id" 
                            defaultValue=""
                            {...register("rab_level_3_id", {required: true})}
                        >
                            <option hidden value="">Pilih rab Level 3</option>
                            {RAB_Option(3)}
                        </select>
                        {errors.rab_level_3_id && <><h1 className="text-red-500">rab Level 3 Harus terisi</h1></>}
                </div>
                {/* data masih blm ada rab 4-6 */}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_4_id" 
                            defaultValue=""
                            {...register("rab_level_4_id")}
                        >
                            <option hidden value="">Pilih rab Level 4</option>
                            {RAB_Option(4)}
                        </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">RAB Level 5</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_5_id" 
                            defaultValue=""
                            {...register("rab_level_5_id")}
                        >
                            <option hidden value="">Pilih rab Level 5</option>
                            {RAB_Option(5)}
                        </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6_id">RAB Level 6</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_6_id" 
                            defaultValue=""
                            {...register("rab_level_6_id")}
                        >
                            <option hidden value="">Pilih rab Level 6</option>
                            {RAB_Option(6)}
                        </select>
                </div>
                <div className="pt-5">
                    <Button className="w-full">Simpan</Button>
                </div>
            </form>
        </div>
        </>
    )
}

export default FormTambahData;