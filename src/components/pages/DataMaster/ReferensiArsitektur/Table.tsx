"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface ReferensiArsitektur {
    Id : number,
    nama_referensi : string;
    kode_referensi : string;
    jenis_referensi : string;
    level_referensi : number;
    tahun : string;
}

const Table = () => {

    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const [referensiarsitektur, setReferensiArsitektur] = useState<ReferensiArsitektur[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if(tahun !== 0){
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/referensiarsitektur?tahun=${tahun}`, {
                headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error("cant fetching data");
              }
              const data = await response.json();
              if (data.data === null) {
                setReferensiArsitektur([]);
                setDataNull(true);
              } else {
                setReferensiArsitektur(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data referensi arsitektur, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
        } else {
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/referensiarsitektur`, {
                headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error("cant fetching data");
              }
              const data = await response.json();
              if (data.data === null) {
                setReferensiArsitektur([]);
                setDataNull(true);
              } else {
                setReferensiArsitektur(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data referensi arsitektur, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
        }
      }, [tahun, token]);

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
            <div className="overflow-auto rounded-xl shadow-xl">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-amber-500">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] text-center sticky bg-amber-500 left-[-1px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Nama Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Jenis Referensi</th>
                        <th className="px-6 py-3 border min-w-[170px]">Level Referensi</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kode Referensi</th>
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
                    referensiarsitektur.map((data, index) => (
                    <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white text-center left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.nama_referensi}</td>
                        <td className="px-6 py-4 border">{data.jenis_referensi}</td>
                        <td className="px-6 py-4 border text-center">{data.level_referensi}</td>
                        <td className="px-6 py-4 border">{data.kode_referensi}</td>
                        <td className="px-6 py-4 border text-center">{data.tahun}</td>
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