"use client"

import Button from "@/components/common/Button/Button";
import { useState, useEffect } from "react";
import Loading from "@/components/global/Loading/Loading";
import PopUp from "@/components/common/PopUp/PopUp";

interface dataInformasi {
    Id: number
    NamaData : string,
    UraianData : string,
    SifatData : string,
    JenisData : string,
    ProdusenData : string,
    ValiditasData: string,
    PjData : string,
    KodeOPD : string,
    InformasiTerkaitInput : string,
    InformasiTerkaitOutput : string,
    Interoprabilitas : string,
    Tahun : number,
    RadLevel1id : rad_level_1_4,
    RadLevel2id : rad_level_1_4,
    RadLevel3id : rad_level_1_4,
    RadLevel4id : rad_level_1_4,
    StrategicId : rad_level_5_7,
    TacticalId : rad_level_5_7,
    OperationalId : rad_level_5_7;
}

interface rad_level_1_4 {
    Id: number;
    nama_referensi: string;
    kode_referensi: string;
    level_referensi: number;
}
interface rad_level_5_7 {
    id: number;
    nama_pohon: string;
    level_pohon: string;
}

const Table = () => {
    //state fetch data informasi
    const [datainformasi, setDatainformasi] = useState<dataInformasi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>()
    const [dataNull, setDataNull] = useState<boolean>(false);
    //state validasi & popup
    const [getId, setId] = useState<number | null>(null);
    const [popup, setPopup] = useState<boolean>(false);
    const [hapus, setHapus] = useState<boolean>(false);
    const [terhapus, setTerhapus] = useState<boolean>(false);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDataInformasi = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/datainformasi`)
                if(!response.ok){
                    throw new Error("cant fetch data");
                }
                const result = await response.json();
                if (result.data === null) {
                  setDatainformasi([]);
                  setDataNull(true);
                } else {
                  setDatainformasi(result.data);
                  setDataNull(false);
                }
            } catch(err){
                setError("Gagal memuat data, cek koneksi internet atau database server")
            } finally{
                setLoading(false)
            }
        }
        fetchDataInformasi();
    },[])

    const hapusDataInformasi = async(Id: any) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/deletedatainformasi/${Id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                alert("cant fetch data")
            }
            setHapus(true);
            setTerhapus(true);
            setDatainformasi(datainformasi.filter((data) => (data.Id !== Id)))
        }catch(err){
            setHapus(true);
            setTerhapus(false);
        }
    }

    if(loading){
        return <Loading />;
    } else if(error){
        return <h1 className="text-red-500">{error}</h1>
    }

    return(
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 min-w-[200px]">Nama Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Uraian Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Sifat Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Jenis Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Validitas Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Produsen Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Penanggung Jawab Data</th>
                        <th className="px-6 py-3 min-w-[200px]">Informasi Terkait Input</th>
                        <th className="px-6 py-3 min-w-[200px]">Informasi Terkait Output</th>
                        <th className="px-6 py-3 min-w-[200px]">Interoperabilitas</th>
                        <th className="px-6 py-3 min-w-[200px]">Kode OPD</th>
                        <th className="px-6 py-3 min-w-[200px]">Tahun</th>
                        <th className="px-6 py-3 min-w-[200px]">RAD Level 1</th>
                        <th className="px-6 py-3 min-w-[200px]">RAD Level 2</th>
                        <th className="px-6 py-3 min-w-[200px]">RAD Level 3</th>
                        <th className="px-6 py-3 min-w-[200px]">RAD Level 4</th>
                        <th className="px-6 py-3 min-w-[200px]">Strategic</th>
                        <th className="px-6 py-3 min-w-[200px]">Tactical</th>
                        <th className="px-6 py-3 min-w-[200px]">Operational</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataNull ? (
                        <tr>
                           <td className="px-6 py-3" colSpan={19}>
                             Data Kosong / Belum Ditambahkan
                           </td>
                        </tr>
                    ) : (
                        datainformasi.map((data,index) => (
                        <tr key={data.Id} className="border rounded-b-lg hover:bg-slate-50">
                            <td className="px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                            <td className="px-6 py-4">{data.NamaData? `${data.NamaData}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.UraianData? `${data.UraianData}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.SifatData? `${data.SifatData}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.JenisData? `${data.JenisData}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.ValiditasData? `${data.ValiditasData}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.ProdusenData? `${data.ProdusenData}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.PjData? `${data.PjData}` : "N/A"}</td>
                            <td className="px-6 py-4">{data.InformasiTerkaitInput ? `${data.InformasiTerkaitInput}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.InformasiTerkaitOutput ? `${data.InformasiTerkaitOutput}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.Interoprabilitas ? `${data.Interoprabilitas}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.KodeOPD? `${data.Interoprabilitas}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.Tahun ? `${data.Tahun}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RadLevel1id? `${data.RadLevel1id.kode_referensi} ${data.RadLevel1id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RadLevel2id? `${data.RadLevel2id.kode_referensi} ${data.RadLevel2id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RadLevel3id? `${data.RadLevel3id.kode_referensi} ${data.RadLevel3id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.RadLevel4id? `${data.RadLevel4id.kode_referensi} ${data.RadLevel4id.nama_referensi}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.StrategicId? `${data.StrategicId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.TacticalId? `${data.TacticalId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4">{data.OperationalId? `${data.OperationalId.nama_pohon}`: "N/A"}</td>
                            <td className="px-6 py-4 flex flex-col">
                                <Button 
                                    typee="button" 
                                    className="my-1"
                                    halaman_url={`/DataInformasi/EditData/${data.Id}`}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    typee="button"
                                    className="bg-red-500 my-1"
                                    onClick={() => {
                                        setId(data.Id);
                                        setPopup(true);
                                    }}
                                >
                                    Hapus
                                </Button>
                                <PopUp 
                                    isOpen={popup}
                                    onClose={() => {
                                        setPopup(false);
                                        setId(null);
                                        setHapus(false);
                                        setTerhapus(false);
                                    }}
                                >
                                    {hapus? 
                                    <>
                                        <div className="flex flex-col justify-center">
                                        {terhapus ? 
                                            <h1>Berhasil menghapus Data Informasi</h1>
                                        :
                                            <h1>Gagal menghapus Data Informasi, cek koneksi internet atau database server</h1>
                                        }
                                            <Button
                                                className="mt-5"
                                                onClick={() => {
                                                    setPopup(false);
                                                    setId(null);
                                                    setHapus(false);
                                                    setTerhapus(false);
                                                }}
                                            >
                                                Tutup
                                            </Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1>Hapus Data Informasi yang dipilih?</h1>
                                        <div className="flex justify-around mt-5">
                                            <Button
                                                onClick={() => {
                                                    setPopup(false);
                                                    setId(null);
                                                }}
                                                >
                                                Batal
                                            </Button>
                                            <Button 
                                                className="bg-red-500 hover:bg-red-700"
                                                onClick={() => {
                                                    hapusDataInformasi(getId);
                                                }}
                                                >
                                                Hapus
                                            </Button>
                                        </div>
                                    </>
                                    }
                                </PopUp>
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