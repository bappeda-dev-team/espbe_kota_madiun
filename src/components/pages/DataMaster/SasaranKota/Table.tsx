"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";

interface SasaranKota {
    ID : number,
    Sasaran : string;
    TujuanKota : string;
    StrategiKota : string;
    Tahun : string;
}

const Table = () => {

    const [SasaranKota, setSasaranKota] = useState<SasaranKota[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchPohonKinerja = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/sasarankota`);
                if(!response.ok){
                    throw new Error("cant fetch data Sasaran Kota");
                }
                const result = await response.json();
                setSasaranKota(result.data);
            } catch(err){
                setError("Gagal fetching data Sasaran Kota, cek koneksi internet atau database server")
            } finally{
                setLoading(false);
            }
        }
        fetchPohonKinerja();
    },[])

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
            <h1 className="uppercase font-bold mb-5">Data Sasaran Kota badan perencanaan, penelitian dan pengembangan daerah</h1>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Sasaran</th>
                        <th className="px-6 py-3 border min-w-[200px]">Tujuan Kota</th>
                        <th className="px-6 py-3 border min-w-[200px]">Strategi Kota</th>
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
                    SasaranKota.map((data, index) => (
                    <tr key={data.ID} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.Sasaran}</td>
                        <td className="px-6 py-4 border">{data.TujuanKota}</td>
                        <td className="px-6 py-4 border">{data.StrategiKota}</td>
                        <td className="px-6 py-4 border">{data.Tahun}</td>
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