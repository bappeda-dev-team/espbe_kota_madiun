"use client"

import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { AlertNotification, AlertQuestion} from "@/components/common/Alert/Alert";
import Image from "next/image";

interface aplikasi {
    Id: number;
    NamaAplikasi : string;
    FungsiAplikasi : string;
    JenisAplikasi : string;
    ProdusenAplikasi : string;
    PjAplikasi : string;
    KodeOPD : string;
    InformasiTerkaitInput : string;
    InformasiTerkaitOutput : string;
    Interoprabilitas : string;
    Tahun : number;
    RaaLevel1id : Raa_Level_1_4;
    RaaLevel2id : Raa_Level_1_4;
    RaaLevel3id : Raa_Level_1_4;
    StrategicId : Raa_Level_5_7;
    TacticalId : Raa_Level_5_7;
    OperationalId : Raa_Level_5_7;
}

interface Raa_Level_1_4 {
    Id: number;
    kode_referensi: string;
    nama_referensi: string;
    level_referensi: number;
}
interface Raa_Level_5_7 {
    id: number;
    nama_pohon: string;
    level_pohon: number;
}

const Table = () => {
    //state fetch data Aplikasi
    const [aplikasi, setAplikasi] = useState<aplikasi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [dataNull, setDataNull] = useState<boolean>(false);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchAplikasi = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/aplikasi`);
                if(!response.ok){
                    throw new Error("cant fetch data aplikasi")
                }
                const result = await response.json();
                if (result.data === null) {
                  setAplikasi([]);
                  setDataNull(true);
                } else {
                  setAplikasi(result.data);
                  setDataNull(false);
                }
            } catch(err){
                setError("gagal memuat data aplikasi, cek koneksi internet atau database server")
            } finally {
                setLoading(false);
            }
        }
        fetchAplikasi();
    },[]);

    const hapusAplikasi = async(Id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/deleteaplikasi/${Id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                alert("cant fetch data")
            }
            setAplikasi(aplikasi.filter((data) => (data.Id !== Id)))
            AlertNotification("Berhasil", "Data Aplikasi Berhasil Dihapus", "success", 1000);
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    }

    if(loading){
        return <Loading/>
    } else if(error){
        return <h1 className="text-red-500">{error}</h1>
    }

    return(
        <>
            <div className="flex justify-between mb-5">
                <ButtonSc typee="button">
                <div className="flex">
                    <Image 
                    className="mr-1"
                    src="/iconLight/cetak.svg" 
                    alt="add" 
                    width={20} 
                    height={20} 
                    />
                    Cetak
                </div>
                </ButtonSc>
                <ButtonPr halaman_url="/Aplikasi/TambahData" typee="button">
                <div className="flex">
                    <Image 
                    className="mr-1"
                    src="/iconLight/add.svg" 
                    alt="add" 
                    width={20} 
                    height={20} 
                    />
                    Tambah Data
                </div>
                </ButtonPr>
            </div>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 min-w-[200px]">Nama Aplikasi</th>
                        <th className="px-6 py-3 min-w-[200px]">Fungsi Aplikasi</th>
                        <th className="px-6 py-3 min-w-[200px]">Jenis Aplikasi</th>
                        <th className="px-6 py-3 min-w-[200px]">Produsen Aplikasi</th>
                        <th className="px-6 py-3 min-w-[200px]">Penanggung Jawab Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Informasi Terkait Input</th>
                        <th className="px-6 py-3 min-w-[200px]">Informasi Terkait Output</th>
                        <th className="px-6 py-3 min-w-[200px]">Interoperabilitas</th>
                        <th className="px-6 py-3 min-w-[200px]">RAA Level 1</th>
                        <th className="px-6 py-3 min-w-[200px]">RAA Level 2</th>
                        <th className="px-6 py-3 min-w-[200px]">RAA Level 3</th>
                        <th className="px-6 py-3 min-w-[200px]">Strategic</th>
                        <th className="px-6 py-3 min-w-[200px]">Tactical</th>
                        <th className="px-6 py-3 min-w-[200px]">Operational</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataNull ? (
                        <tr>
                           <td className="px-6 py-3" colSpan={13}>
                                Data Kosong / Belum Ditambahkan
                           </td>
                        </tr>
                    ) : (
                        aplikasi.map((data, index) => (
                        <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                            <td className="px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                            <td className="px-6 py-4">{data.NamaAplikasi? `${data.NamaAplikasi}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.FungsiAplikasi? `${data.FungsiAplikasi}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.JenisAplikasi? `${data.JenisAplikasi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.ProdusenAplikasi? `${data.ProdusenAplikasi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.PjAplikasi? `${data.PjAplikasi}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.InformasiTerkaitInput ? `${data.InformasiTerkaitInput}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.InformasiTerkaitOutput? `${data.InformasiTerkaitOutput}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.Interoprabilitas? `${data.Interoprabilitas}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RaaLevel1id? `${data.RaaLevel1id.kode_referensi} ${data.RaaLevel1id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RaaLevel2id? `${data.RaaLevel2id.kode_referensi} ${data.RaaLevel2id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RaaLevel3id? `${data.RaaLevel3id.kode_referensi} ${data.RaaLevel3id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.StrategicId? `${data.StrategicId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.TacticalId? `${data.TacticalId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.OperationalId? `${data.OperationalId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4 flex flex-col">
                                <ButtonSc 
                                    typee="button" 
                                    className="my-1"
                                    halaman_url={`/Aplikasi/EditData/${data.Id}`}
                                >
                                    <div className="flex items-center justify-center w-full">
                                        <Image 
                                        className="mr-1"
                                        src="/iconLight/edit.svg" 
                                        alt="edit" 
                                        width={15} 
                                        height={15} 
                                        />
                                        <span>Edit</span>
                                    </div>
                                </ButtonSc>
                                <ButtonTr 
                                    typee="button"
                                    className="bg-red-500 my-1"
                                    onClick={() => {
                                        AlertQuestion("Hapus?", "hapus Aplikasi yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                                            if(result.isConfirmed){
                                                hapusAplikasi(data.Id);
                                            }
                                        });
                                    }}
                                >
                                    <div className="flex items-center justify-center w-full">
                                        <Image 
                                        className="mr-1"
                                        src="/iconLight/trash.svg" 
                                        alt="trash" 
                                        width={15} 
                                        height={15} 
                                        />
                                        <span>Hapus</span>
                                    </div>
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

export default Table;