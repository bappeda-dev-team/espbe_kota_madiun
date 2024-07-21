"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";

interface PohonKinerja {
    id : 2,
    nama_pohon : string;
    jenis_pohon : string;
    level_pohon : number;
    kode_opd : string;
    tahun : string;
}

const Table = () => {

    const [pohonKinerja, setPohonKinerja] = useState<PohonKinerja[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchPohonKinerja = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/pohonkinerja`);
                if(!response.ok){
                    throw new Error("cant fetch data pohon kinerja");
                }
                const result = await response.json();
                setPohonKinerja(result.data);
            } catch(err){
                setError("Gagal fetching data Pohon Kinerja, cek koneksi internet atau database server")
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
            <h1 className="uppercase font-bold mb-5">Data pohon kinerja badan perencanaan, penelitian dan pengembangan daerah</h1>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Nama Pohon</th>
                        <th className="px-6 py-3 border min-w-[200px]">Jenis Pohon</th>
                        <th className="px-6 py-3 border min-w-[200px]">Level Pohon</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kode OPD</th>
                    </tr>
                </thead>
                <tbody>
                    {pohonKinerja.map((data, index) => (
                    <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.nama_pohon}</td>
                        <td className="px-6 py-4 border">{data.jenis_pohon}</td>
                        <td className="px-6 py-4 border">{data.level_pohon}</td>
                        <td className="px-6 py-4 border">{data.kode_opd}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;