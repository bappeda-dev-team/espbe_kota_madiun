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

interface rabLevel4_6{
  id : number,
  nama_pohon : string,
  jenis_pohon : string,
  level_pohon : number,
  kode_opd : string,
  tahun : string
}

interface sasaran_kota {
  ID : number,
  Sasaran :string,
  TujuanKota  : string,
  StrategiKota : string,
  Tahun : number;
}

function FormLayanan() {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [dropDownRAB1_3, setDropDownRAB1_3] = useState<rabLevel1_3[]>([])
    const [dropDownRAB4_6, setDropDownRAB4_6] = useState<rabLevel4_6[]>([])
    const [sasaranKota, setSasaranKota] =useState<sasaran_kota[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter();

    // fetching data untuk dropdown RAB Level 1 - 3
    useEffect(() => {
        const fetchDropdownRAB1_3 = async () => {
            try{
                const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
                if(!response.ok){
                    throw new Error('cant fetching data');
                }
                const data = await response.json();
                setDropDownRAB1_3(data.data);
            } catch (err){
                console.log("gagal fetcing data RAB Level 1 -3")
            }
        }
        fetchDropdownRAB1_3();
    },[]);

    // fetching data untuk dropdown RAB Level 4 - 6
    useEffect(() => {
        const fetchDropdownRAB4_6 = async () => {
            try{
                const response = await fetch (`${API_URL}/v1/pohonkinerja`);
                if(!response.ok){
                    throw new Error('cant fetching data');
                }
                const result = await response.json();
                setDropDownRAB4_6(result.data);
            } catch(err) {
                console.log("gagal fetching data RAB Level 4 - 6")
            }
        }
        fetchDropdownRAB4_6();
    })

    // fetching data untuk dropdown sasaran kota
    useEffect(() => {
        const fetchsasarankota = async () => {
            try{
                const response = await fetch(`${API_URL}/v1/sasarankota`);
                if(!response.ok){
                    throw new Error("cant fetch data");
                }
                const data = await response.json();
                setSasaranKota(data.data);
                } catch(err){
            console.log("gagal fetch data sasaran kota");
            }
        }
        fetchsasarankota();
    },[]);

    // dropdown RAB Level 1 - 3
    const RAB_Option1_3 = (level : number) => {
        return dropDownRAB1_3
        .filter(item => item.level_referensi === level)
        .map(item => (
            <option 
                key={item.Id} 
                value={item.Id}
            >
                {item.kode_referensi}
            </option>
        ));
    }

    // dropdown RAB Level 4 - 6
    const RAB_Option4_6 =(level: number) => {
        return dropDownRAB4_6
        .filter(item => item.level_pohon === level)
        .map(item => (
            <option 
                key={item.id} 
                value={item.id}
            >
                {item.jenis_pohon} - {item.nama_pohon}
            </option>
        ));
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
            <h1 className="uppercase font-bold">Form tambah data Layanan SPBE</h1>
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
                    <select 
                        className="border px-4 py-2" 
                        id="sasaran_kota"
                        defaultValue=""
                        {...register("sasaran_kota", {required: true})}
                    >
                        <option hidden value="">Pilih Sasaran Kota</option>
                        {sasaranKota.map((item) => (
                            <option key={item.ID} value={item.ID}>{item.Sasaran}</option>
                        ))}
                    </select>
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
                            {RAB_Option1_3(1)}
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
                            {RAB_Option1_3(2)}
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
                            {RAB_Option1_3(3)}
                        </select>
                        {errors.rab_level_3_id && <><h1 className="text-red-500">rab Level 3 Harus terisi</h1></>}
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4</label>
                        <select 
                            className="border px-4 py-2" 
                            id="rab_level_4_id" 
                            defaultValue=""
                            {...register("rab_level_4_id")}
                        >
                            <option hidden value="">Pilih rab Level 4</option>
                            {RAB_Option4_6(4)}
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
                            {RAB_Option4_6(5)}
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
                            {RAB_Option4_6(6)}
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

export default FormLayanan;