"use client"

import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Loading from "@/components/global/Loading/Loading";
import { useState, useEffect } from "react";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";

interface layanan {
    Id: number;
    NamaLayanan: string;
    KodeLayanan: string;
    TujuanLayananId: tujuan_layanan;
    FungsiLayanan: string;
    Tahun: number;
    KodeOPD: string;
    KementrianTerkait: string;
    MetodeLayanan: string;
    RalLevel1id?: ral_level_1_4;
    RalLevel2id?: ral_level_1_4;
    RalLevel3id?: ral_level_1_4;
    RalLevel4id?: ral_level_1_4;
    StrategicId?: ral_level_5_7;
    TacticalId?: ral_level_5_7;
    OperationalId?: ral_level_5_7;
}

interface tujuan_layanan{
    id: number;
    nama_pohon: string;
    level_pohon: number;
}

interface ral_level_1_4{
    Id: number;
    nama_referensi: string;
    kode_referensi: string;
    level_referensi: number;
}

interface ral_level_5_7{
    id: number;
    nama_pohon: string;
    level_pohon: string;
}

const Table = () => {

    //state fetch data layanan
    const [layanan, setLayanan] = useState<layanan[]>([])
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchLayanan = async () => {
            try{
                const response = await fetch(`${API_URL}/v1/layananspbe`)
                if(!response.ok){
                    throw new Error("cant fetch data");
                }
                const result = await response.json();
                if(result.data == null){
                    setLayanan([]);
                    setDataNull(true);
                } else {
                    setLayanan(result.data);
                    setDataNull(false);
                }
            } catch(err){
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchLayanan();
    }, [])

    const hapusDataLayanan = async(Id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const result = await fetch(`${API_URL}/v1/deletelayananspbe/${Id}`, {
                method : 'DELETE',
            });
            if(!result.ok){
                throw new Error("gagal terhubung dengan database server")
            }
            setLayanan(layanan.filter((item) => item.Id !== Id));
            AlertNotification("Berhasil", "Berhasil hapus data layanan", "success", 1000);
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    }

    if(loading){
        return(
            <Loading />
        )
    } else if(error){
        return( <h1>Gagal memuat data halaman Layanan, silakan cek koneksi internet atau database server</h1> )
    } else {

        return(
            <>
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase border">
                        <tr>
                            <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                            <th className="px-6 py-3 min-w-[200px]">Nama Layanan</th>
                            <th className="px-6 py-3 min-w-[200px]">Kode Layanan</th>
                            <th className="px-6 py-3 min-w-[200px]">Tahun</th>
                            <th className="px-6 py-3 min-w-[200px]">Kode OPD</th>
                            <th className="px-6 py-3 min-w-[200px]">Tujuan Layanan</th>
                            <th className="px-6 py-3 min-w-[200px]">Fungsi Layanan</th>
                            <th className="px-6 py-3 min-w-[200px]">Metode Layanan</th>
                            <th className="px-6 py-3 min-w-[200px]">Kementrian/Lembaga Terkait</th>
                            <th className="px-6 py-3 min-w-[200px]">RAL Level 1</th>
                            <th className="px-6 py-3 min-w-[200px]">RAL Level 2</th>
                            <th className="px-6 py-3 min-w-[200px]">RAL Level 3</th>
                            <th className="px-6 py-3 min-w-[200px]">RAL Level 4</th>
                            <th className="px-6 py-3 min-w-[200px]">Strategic </th>
                            <th className="px-6 py-3 min-w-[200px]">Tactical</th>
                            <th className="px-6 py-3 min-w-[200px]">Operational</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataNull ? (
                        <tr>
                           <td className="px-6 py-3" colSpan={17}>
                               Data Kosong / Belum Ditambahkan
                           </td>
                        </tr>
                        ) : (
                            layanan.map((data, index) => (
                            <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                                <td className="px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                                <td className="px-6 py-4">{data.NamaLayanan ? `${data.NamaLayanan}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.KodeLayanan ? `${data.KodeLayanan}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.Tahun ? `${data.Tahun}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.KodeOPD ? `${data.KodeOPD}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.TujuanLayananId ? `${data.TujuanLayananId.nama_pohon}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.FungsiLayanan ? `${data.FungsiLayanan}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.MetodeLayanan ? `${data.MetodeLayanan}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.KementrianTerkait ? `${data.KementrianTerkait}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.RalLevel1id ? `${data.RalLevel1id.kode_referensi} ${data.RalLevel1id.nama_referensi}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.RalLevel2id ? `${data.RalLevel2id.kode_referensi} ${data.RalLevel2id.nama_referensi}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.RalLevel3id ? `${data.RalLevel3id.kode_referensi} ${data.RalLevel3id.nama_referensi}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.RalLevel4id ? `${data.RalLevel4id.kode_referensi} ${data.RalLevel4id.nama_referensi}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.StrategicId ? `${data.StrategicId.nama_pohon}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.TacticalId ? `${data.TacticalId.nama_pohon}` : "N/A"}</td>
                                <td className="px-6 py-4">{data.OperationalId ? `${data.OperationalId.nama_pohon}` : "N/A"}</td>
                                <td className="px-6 py-4 flex flex-col">
                                    <ButtonSc 
                                        typee="button" 
                                        className="my-1"
                                        halaman_url={`/Layanan/LayananSPBE/EditData/${data.Id}`}
                                    >
                                        Edit
                                    </ButtonSc>
                                    <ButtonTr 
                                        typee="button" 
                                        className="bg-red-500 my-1"
                                        onClick={() => {
                                            AlertQuestion("Hapus?", "hapus layanan yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                                if(result.isConfirmed){
                                                    hapusDataLayanan(data.Id);
                                                }
                                              })
                                        }}
                                    >
                                        Hapus
                                    </ButtonTr>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Table;