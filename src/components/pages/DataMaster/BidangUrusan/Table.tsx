"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getUser, getToken } from "@/app/Login/Auth/Auth";

interface BidangUrusan {
    id : number,
    bidang_urusan : string;
    kode_bidang_urusan : string;
}

const Table = () => {

    const [BidangUrusan, setBidangUrusan] = useState<BidangUrusan[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);
    const token = getToken();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
    },[])

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchBidangUrusan = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/bidangurusan`, {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if(!response.ok){
                    throw new Error("cant fetch data Bidang Urusan");
                }
                const result = await response.json();
                if(result.data ===  null){
                    setBidangUrusan([]);
                    setDataNull(true);
                } else {
                    setDataNull(false);
                    setBidangUrusan(result.data);
                }
            } catch(err){
                setError("Gagal fetching data Bidang Urusan, cek koneksi internet atau database server")
            } finally{
                setLoading(false);
            }
        }
        fetchBidangUrusan();
    },[token])

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
                        <th className="px-6 py-3 border max-w-[20px] text-center sticky bg-amber-500 left-[-1px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Bidang</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">Kode Bidang Urusan</th>
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
                    BidangUrusan.map((data, index) => (
                    <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border text-center sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.bidang_urusan}</td>
                        <td className="px-6 py-4 border text-center">{data.kode_bidang_urusan}</td>
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