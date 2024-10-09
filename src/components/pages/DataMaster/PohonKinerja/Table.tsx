"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import OpdNull from "@/components/common/Alert/OpdNull";

interface PohonKinerja {
    id : 2,
    nama_pohon : string;
    jenis_pohon : string;
    level_pohon : number;
    kode_opd : string;
    tahun : string;
}

const Table = () => {

    const [Semua, setSemua] = useState<boolean | null>(true);
    const [Strategic, setStrategic] = useState<boolean | null>(null);
    const [Tactical, setTactical] = useState<boolean | null>(null);
    const [Operational, setOperational] = useState<boolean | null>(null);
    const [filteredPohonKinerja, setFilteredPohonKinerja] = useState<PohonKinerja[]>([])

    const [pohonKinerja, setPohonKinerja] = useState<PohonKinerja[]>([]);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [tahun, setTahun] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const token = getToken();

    useEffect(() => {
      const data = getOpdTahun();
      if(data){
        if(data.tahun){
          const dataTahun = {
            value: data.tahun.value,
            label: data.tahun.label
          }
          setTahun(dataTahun);
        } 
        if(data.opd){
          const dataOpd = {
            value: data.opd.value,
            label: data.opd.label
          }
          setSelectedOpd(dataOpd);
        }
      }
    },[])

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
            setPohonKinerja([]);
            setDataNull(true);
          } else {
            setPohonKinerja(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError('Gagal memuat data, silakan cek koneksi internet atau database server');
        } finally {
          setLoading(false);
        }
      };
    
      //opd kosong
      if (SelectedOpd?.value == (undefined || null) || SelectedOpd?.value == 'all_opd') {
        setOpdKosong(true);
        setLoading(false);
      } else {
        if(tahun?.value == (0 || undefined)){
          fetchingData(`${API_URL}/v1/pohonkinerja?kode_opd=${SelectedOpd?.value}`);
          setOpdKosong(false);
        } else {
          fetchingData(`${API_URL}/v1/pohonkinerja?kode_opd=${SelectedOpd?.value}&tahun=${tahun?.value}`);
          setOpdKosong(false);
        }
      }
    }, [tahun, SelectedOpd, token]);

      useEffect(() => {
        if(Strategic){
          const filter_result = pohonKinerja.filter(
            (item: any) => {
              return item.level_pohon === 4
            }
          );
          setFilteredPohonKinerja(filter_result);
        } else if(Tactical){
          const filter_result = pohonKinerja.filter(
            (item: any) => {
              return item.level_pohon === 5
            }
          );
          setFilteredPohonKinerja(filter_result);
        } else if(Operational){
          const filter_result = pohonKinerja.filter(
            (item: any) => {
              return item.level_pohon === 6
            }
          );
          setFilteredPohonKinerja(filter_result);
        } else if(Semua){
         setFilteredPohonKinerja(pohonKinerja); 
        }
      },[Strategic, Tactical, Operational, Semua, pohonKinerja])

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    } else if(opdKosong){
      return <OpdNull />
    }

    return(
        <>
          <div className="flex mb-3">
            {Semua ?
              <button className="mx-1 py-1 min-w-[100px] border bg-amber-500 text-white rounded-lg" onClick={() => setSemua(true)}>Semua</button>
              :
              <button className="mx-1 py-1 min-w-[100px] border border-amber-500 hover:bg-amber-500 hover:text-white rounded-lg text-amber-500" 
                onClick={() => {
                  setSemua(true);
                  setStrategic(false);
                  setTactical(false);
                  setOperational(false);
                }}
              >
                Semua
              </button>
            }
            {Strategic ? 
              <button className="mx-1 py-1 min-w-[100px] border bg-red-500 text-white rounded-lg" onClick={() => setStrategic(true)}>Strategic</button>
              :
              <button className="mx-1 py-1 min-w-[100px] border border-red-500 hover:bg-red-500 hover:text-white rounded-lg text-red-500" 
                onClick={() => {
                  setStrategic(true);
                  setSemua(false);
                  setTactical(false);
                  setOperational(false);
                }}
              >
                Strategic
              </button>
            }
            {Tactical ?
              <button className="mx-1 py-1 min-w-[100px] border bg-blue-500 text-white rounded-lg" onClick={() => setTactical(true)}>Tactical</button>
            :
              <button className="mx-1 py-1 min-w-[100px] border border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg text-blue-500" 
                onClick={() => {
                  setTactical(true);
                  setSemua(false);
                  setStrategic(false);
                  setOperational(false);
                }}
              >
                Tactical
              </button>
            }
            {Operational ? 
              <button className="mx-1 py-1 min-w-[100px] border bg-green-500 text-white rounded-lg" onClick={() => setOperational(true)}>Operational</button>
              :
              <button className="mx-1 py-1 min-w-[100px] border border-green-500 hover:bg-green-500 hover:text-white rounded-lg text-green-500" 
                onClick={() => {
                  setOperational(true);
                  setSemua(false);
                  setStrategic(false);
                  setTactical(false);
                }}
              >
                Operational
              </button>
            }
          </div>
          <div className="overflow-auto shadow-xl rounded-xl">
              <table className="w-full text-sm text-left">
              <thead className={`text-xs text-white uppercase ${Semua ? "bg-amber-500" : (Strategic ? "bg-red-500" : (Tactical ? "bg-blue-500" : "bg-green-500"))}`}>
                  <tr>
                      <th className={`px-6 py-3 border max-w-[20px] text-center sticky ${Semua ? "bg-amber-500" : (Strategic ? "bg-red-500" : (Tactical ? "bg-blue-500" : "bg-green-500"))} left-[-2px]`}>No.</th>
                      <th className="px-6 py-3 border min-w-[200px]">Nama Pohon</th>
                      <th className="px-6 py-3 border min-w-[200px]">Jenis Pohon</th>
                      <th className="px-6 py-3 border min-w-[150px]">Level Pohon</th>
                      <th className="px-6 py-3 border min-w-[200px]">Kode OPD</th>
                      <th className="px-6 py-3 border min-w-[100px] text-center">Tahun</th>
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
                  filteredPohonKinerja.map((data, index) => (
                  <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                      <td className="px-6 py-4 border text-center sticky bg-white left-[-2px]">{index +1}</td>
                      <td className="px-6 py-4 border">{data.nama_pohon}</td>
                      <td className="px-6 py-4 border">{data.jenis_pohon}</td>
                      <td className="px-6 py-4 border text-center">{data.level_pohon}</td>
                      <td className="px-6 py-4 border">{data.kode_opd}</td>
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