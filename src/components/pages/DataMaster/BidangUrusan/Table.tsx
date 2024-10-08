"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import OpdNull from "@/components/common/Alert/OpdNull";

interface BidangUrusan {
    id : number;
    nama_opd : string;
    kode_opd : string;
    urusan_opd : urusan_opd[]; 
}
interface urusan_opd {
    kode_urusan : string;
    urusan : string;
    bidang_urusan: bidang_urusan_opd[];
}

interface bidang_urusan_opd {
    kode_bidang_urusan: string;
    bidang_urusan: string;
}

const Table = () => {

    const [opdUrusan, setOpdUrusan] = useState<BidangUrusan[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true)
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const token = getToken();
    const [user, setUser] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);

        const data = getOpdTahun ();
        if(data.opd){
          const dataOpd = {
            value: data.opd.value,
            label: data.opd.label
          }
          setSelectedOpd(dataOpd);
        }
      }, []);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchingData = async (url: string) => {
          try {
            setLoading(true);
            const response = await fetch(url, {
              headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('cant fetching data');
            }
            const data = await response.json();
            if (data.data === null) {
              setOpdUrusan([]);
              setDataNull(true);
            } else {
              setOpdUrusan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError('Gagal memuat data, silakan cek koneksi internet atau database server');
          } finally {
            setLoading(false);
          }
        };
      
        if (user?.roles == 'admin_kota') {
          if (SelectedOpd?.value === 'all_opd') {
            // Fetch semua OPD
            fetchingData(`${API_URL}/v1/opd-urusan`);
            setOpdKosong(false);
            setLoading(false);
        } else if (SelectedOpd?.value != 'all_opd' && SelectedOpd?.value != (undefined || null)) {
            // Fetch OPD yang dipilih
            fetchingData(`${API_URL}/v1/opd-urusan?kode_opd=${SelectedOpd?.value}`);
            setOpdKosong(false);
            setLoading(false);
        } else if (SelectedOpd?.value == (undefined || null)){
            setOpdKosong(true);
            setLoading(false);
          }
        }
      }, [SelectedOpd, token, user]);

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    } else if(opdKosong){
        return <OpdNull />
    }

    return(
        <>
        <div className="overflow-auto shadow-xl rounded-xl">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs text-white uppercase bg-amber-500">
                    <tr>
                        <th className="px-6 py-3 border text-center">No</th>
                        <th className="px-6 py-3 border">Nama OPD</th>
                        <th className="px-6 py-3 border text-center">Kode OPD</th>
                        <th className="px-6 py-3 border text-center">Urusan</th>
                        <th className="px-6 py-3 border">Bidang Urusan</th>
                    </tr>
                </thead>
                <tbody>
                    {dataNull ? (
                        <tr>
                            <td className="px-6 py-3" colSpan={6}>
                                Data Kosong / Belum Ditambahkan
                            </td>
                        </tr>
                    ) : (
                        opdUrusan.map((data, index) => (
                            // Setiap data OPD bisa memiliki banyak urusan_opd
                            data.urusan_opd.map((urusanItem: any, urusanIdx: number) => (
                                <tr key={urusanIdx} className="border hover:bg-slate-50">
                                    {/* Kolom No, Nama OPD, dan Kode OPD hanya muncul di baris pertama (urusanIdx === 0) */}
                                    {urusanIdx === 0 && (
                                        <>
                                            <td
                                                className="px-6 py-4 border text-center"
                                                rowSpan={data.urusan_opd.length}
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                className="px-6 py-4 border"
                                                rowSpan={data.urusan_opd.length}
                                            >
                                                {data.nama_opd}
                                            </td>
                                            <td
                                                className="px-6 py-4 border text-center"
                                                rowSpan={data.urusan_opd.length}
                                            >
                                                {data.kode_opd}
                                            </td>
                                        </>
                                    )}
                                    {/* Data Kode Urusan dan Urusan */}
                                    <td className="px-6 py-4 border">{urusanItem.kode_urusan} .  {urusanItem.urusan}</td>

                                    {/* Bidang Urusan */}
                                    <td className="px-6 py-4 border">
                                        {urusanItem.bidang_urusan &&
                                        Array.isArray(urusanItem.bidang_urusan) &&
                                        urusanItem.bidang_urusan.length > 0 ? (
                                            urusanItem.bidang_urusan.map(
                                                (bidang: any, bidangIdx: number) => (
                                                    <div key={bidangIdx}>
                                                        <span className="w-full">
                                                            {bidang.kode_bidang_urusan} - {bidang.bidang_urusan}
                                                        </span>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div>Tidak ada Bidang Urusan</div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Table;