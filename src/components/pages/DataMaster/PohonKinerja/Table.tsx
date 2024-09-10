"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken } from "@/app/Login/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [pohonKinerja, setPohonKinerja] = useState<PohonKinerja[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const token = getToken();

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if(tahun !== 0 && SelectedOpd !== "all_opd"){
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/pohonkinerja?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
                setPohonKinerja([]);
                setDataNull(true);
              } else {
                setPohonKinerja(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data pohon kinerja, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
        } else if(tahun == 0 && SelectedOpd != "all_opd"){
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/pohonkinerja?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
                setPohonKinerja([]);
                setDataNull(true);
              } else {
                setPohonKinerja(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data pohon kinerja, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
        } else if(tahun != 0 && SelectedOpd == "all_opd"){
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/pohonkinerja?tahun=${tahun}`, {
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
                setPohonKinerja([]);
                setDataNull(true);
              } else {
                setPohonKinerja(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data pohon kinerja, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
        } else {
          const fetchingData = async () => {
            try {
              const response = await fetch(`${API_URL}/v1/pohonkinerja`, {
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
                setPohonKinerja([]);
                setDataNull(true);
              } else {
                setPohonKinerja(data.data);
                setDataNull(false);
              }
            } catch (err) {
              setError("gagal mendapatkan data pohon kinerja, cek koneksi internet atau database server");
            } finally {
              setLoading(false);
            }
          };
          fetchingData();
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