"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";

interface ReferensiArsitektur {
    Id : number,
    nama_referensi : string;
    kode_referensi : string;
    jenis_referensi : string;
    level_referensi : number;
    tahun : string;
}

const Table = () => {

    const [referensiarsitektur, setReferensiArsitektur] = useState<ReferensiArsitektur[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchReferensiArsitektur = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
                if(!response.ok){
                    throw new Error("cant fetch data Referensi Arsitektur");
                }
                const result = await response.json();
                if(result.data === null){
                    setReferensiArsitektur([]);
                    setDataNull(true);
                } else {
                    setReferensiArsitektur(result.data);
                    setDataNull(false);
                }
            } catch(err){
                setError("Gagal fetching data Referensi Arsitektur, cek koneksi internet atau database server")
            } finally{
                setLoading(false);
            }
        }
        fetchReferensiArsitektur();
    },[])

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
            <h1 className="uppercase font-bold mb-5">Data Referensi Arsitektur badan perencanaan, penelitian dan pengembangan daerah</h1>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Nama Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Jenis Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Level Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kode Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Tahun</th>
                    </tr>
                </thead>
                <tbody>
                {dataNull ? (
                <tr>
                    <td className="px-6 py-3" colSpan={5}>
                        Data Kosong / Belum Ditambahkan
                    </td>
                </tr>
                ) : (
                    referensiarsitektur.map((data, index) => (
                    <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.nama_referensi}</td>
                        <td className="px-6 py-4 border">{data.jenis_referensi}</td>
                        <td className="px-6 py-4 border">{data.level_referensi}</td>
                        <td className="px-6 py-4 border">{data.kode_referensi}</td>
                        <td className="px-6 py-4 border">{data.tahun}</td>
                    </tr>
                    ))
                )}
                </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;