"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/global/Loading/Loading";
import Button from "@/components/common/Button/Button";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";

interface KebutuhanSPBE {
    id: number;
    kode_opd: number;
    tahun: number;
    nama_domain: string;
    id_prosesbisnis: number;
    jenis_kebutuhan: JenisKebutuhan[];
}

interface JenisKebutuhan {
    id: number;
    kebutuhan_id: number;
    kebutuhan: string;
    kondisi_awal: KondisiAwal[];
}

interface KondisiAwal {
    id: number;
    jenis_kebutuhan_id: number;
    keterangan: string;
    tahun: number;
}

const Table = () => {
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [kebutuhan, setKebutuhan] = useState<KebutuhanSPBE[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDataKebutuhan = async () => {
            try {
                const response = await fetch(`${API_URL}/v1/kebutuhanspbe`);
                if (!response.ok) {
                    throw new Error("Gagal fetch data kebutuhan SPBE");
                }
                const data = await response.json();
                if (data.data === null) {
                    setDataNull(true);
                    setKebutuhan([]);
                } else {
                    setKebutuhan(data.data);
                    setDataNull(false);
                }
            } catch (error) {
                setError("Gagal memuat data Kebutuhan SPBE, cek koneksi internet dan database server");
            } finally {
                setLoading(false);
            }
        };
        fetchDataKebutuhan();
    }, []);

    const hapusKebutuhan = async (id: number) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/v1/deletekebutuhanspbe/${id}`, {
                method: "DELETE",
            })
            if(!response.ok){
                alert("gagal fetch kebutuhan");
            } 
            setKebutuhan(kebutuhan.filter(data => data.id !== id));
            AlertNotification("Berhasil", "Data Kebutuhan SPBE berhasil dihapus", "success", 1000);
        } catch (error) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    } else if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase border">
                        <tr>
                            <th rowSpan={2} className="border px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                            <th rowSpan={2} className="border px-6 py-3 min-w-[200px]">Nama Domain</th>
                            <th rowSpan={2} className="border px-6 py-3 min-w-[200px]">Jenis Kebutuhan</th>
                            <th colSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Kondisi Awal</th>
                            <th rowSpan={2} className="border px-6 py-3 text-center">Aksi</th>
                        </tr>
                        <tr>
                            <th className="border px-6 py-3 min-w-[200px] text-center">2023</th>
                            <th className="border px-6 py-3 min-w-[200px] text-center">2024</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataNull ? (
                            <tr>
                                <td className="px-6 py-3" colSpan={4}>
                                    Data Kosong / Belum Ditambahkan
                                </td>
                            </tr>
                        ) : (
                            kebutuhan.map((data, index) => (
                                <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                                    <td className="border px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                                    <td className="px-6 py-4">{data.nama_domain ? data.nama_domain : "N/A"}</td>
                                    {data.jenis_kebutuhan.length > 1 ? (
                                        <>
                                            <td className="border px-6 py-4">
                                                <div className="flex flex-col">
                                                    {data.jenis_kebutuhan.map((info, idx) => (
                                                        <div key={info.id}>
                                                            <div>{info.kebutuhan}</div>
                                                            {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="border px-6 py-4">
                                                {data.jenis_kebutuhan.map((info, idx) => (
                                                    <div key={idx}>
                                                        {info.kondisi_awal.find(ka => ka.tahun === 2023)?.keterangan || "N/A"}
                                                        {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="border px-6 py-4">
                                                {data.jenis_kebutuhan.map((info, idx) => (
                                                    <div key={idx}>
                                                        {info.kondisi_awal.find(ka => ka.tahun === 2024)?.keterangan || "N/A"}
                                                        {idx < data.jenis_kebutuhan.length - 1 && <hr className="border-t my-2" />}
                                                    </div>
                                                ))}
                                            </td>
                                        </>
                                        ) : (
                                        <>
                                            <td className="border px-6 py-4">
                                                <div className="flex flex-col">
                                                    {data.jenis_kebutuhan.map((info, idx) => (
                                                    <div key={info.id}>
                                                        <div>{info.kebutuhan}</div>
                                                    </div>
                                                ))}
                                                </div>
                                            </td>
                                            <td className="border px-6 py-4">
                                                {data.jenis_kebutuhan.map((info, idx) => (
                                                    <div key={idx}>
                                                        {info.kondisi_awal.find(ka => ka.tahun === 2023)?.keterangan || "N/A"}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="border px-6 py-4">
                                                {data.jenis_kebutuhan.map((info, idx) => (
                                                    <div key={idx}>
                                                        {info.kondisi_awal.find(ka => ka.tahun === 2024)?.keterangan || "N/A"}
                                                    </div>
                                                ))}
                                            </td>
                                        </>
                                    )}
                                    <td className="px-6 py-4 flex flex-col gap-2">
                                        <Button 
                                            className="my-1"
                                            halaman_url={`/KebutuhanSPBE/EditKebutuhan/${data.id}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="my-1 bg-red-500 hover:bg-red-700"
                                            onClick={() => {
                                                AlertQuestion("Hapus?", "Hapus Kebutuhan SPBE yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                    if(result.isConfirmed){
                                                        hapusKebutuhan(data.id);
                                                    }
                                                });
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
