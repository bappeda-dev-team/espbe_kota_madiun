"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface SasaranKota {
    ID : number,
    Sasaran : string;
    TujuanKota : string;
    StrategiKota : string;
    Tahun : string;
}

const Table = () => {

    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const [SasaranKota, setSasaranKota] = useState<SasaranKota[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if(tahun != 0){
            const fetchPohonKinerja = async() => {
                try{
                    const response = await fetch(`${API_URL}/v1/sasarankota?tahun=${tahun}`, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if(!response.ok){
                        throw new Error("cant fetch data Sasaran Kota");
                    }
                    const result = await response.json();
                    if(result.data === null){
                        setSasaranKota([]);
                        setDataNull(true);
                    } else {
                        setSasaranKota(result.data);
                        setDataNull(false);
                    }
                } catch(err){
                    setError("Gagal fetching data Sasaran Kota, cek koneksi internet atau database server")
                } finally{
                    setLoading(false);
                }
            }
            fetchPohonKinerja();
        } else {
            const fetchPohonKinerja = async() => {
                try{
                    const response = await fetch(`${API_URL}/v1/sasarankota`, {
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if(!response.ok){
                        throw new Error("cant fetch data Sasaran Kota");
                    }
                    const result = await response.json();
                    if(result.data === null){
                        setSasaranKota([]);
                        setDataNull(true);
                    } else {
                        setSasaranKota(result.data);
                        setDataNull(false);
                    }
                } catch(err){
                    setError("Gagal fetching data Sasaran Kota, cek koneksi internet atau database server")
                } finally{
                    setLoading(false);
                }
            }
            fetchPohonKinerja();

        }
    },[token, tahun])

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
            <div className="overflow-auto shadow-xl rounded-xl">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-amber-500">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] text-center sticky bg-amber-500 left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Sasaran</th>
                        <th className="px-6 py-3 border min-w-[200px]">Tujuan Kota</th>
                        <th className="px-6 py-3 border min-w-[200px]">Strategi Kota</th>
                        <th className="px-6 py-3 border min-w-[100px] text-center">Tahun</th>
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
                        <td className="px-6 py-4 border text-center sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.Sasaran}</td>
                        <td className="px-6 py-4 border">{data.TujuanKota}</td>
                        <td className="px-6 py-4 border">{data.StrategiKota}</td>
                        <td className="px-6 py-4 border text-center">{data.Tahun}</td>
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