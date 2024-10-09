"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken, getOpdTahun } from "@/app/Login/Auth/Auth";

interface ReferensiArsitektur {
    Id : number,
    nama_referensi : string;
    kode_referensi : string;
    jenis_referensi : string;
    level_referensi : number;
    tahun : string;
}

const Table = () => {
  //level
  const [levelAll, setLevelAll] = useState<boolean | null>(true);
  const [level, setLevel] = useState<number | null>(null);
  //jenis
  const [jenisAll, setJenisAll] = useState<boolean | null>(true);
  const [rab, setRab] = useState<boolean | null>(null);
  const [ral, setRal] = useState<boolean | null>(null);
  const [rad, setRad] = useState<boolean | null>(null);
  const [raa, setRaa] = useState<boolean | null>(null);

  const [tahun, setTahun] = useState<any>(null);
  const [referensiarsitektur, setReferensiArsitektur] = useState<ReferensiArsitektur[]>([]);
  const [filteredReferensi, setFilteredReferensi] = useState<ReferensiArsitektur[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const [dataNull, setDataNull] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
    const data = getOpdTahun();
    if(data.tahun){
      const dataTahun = {
        value: data.tahun.value,
        label: data.tahun.label
      }
      setTahun(dataTahun);
    }
  }, []);

  useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if(tahun?.value != (0 || undefined)){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/referensiarsitektur?tahun=${tahun?.value}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            if(data.data === null){
              setDataNull(true);
              setReferensiArsitektur([]);
            } else {
              setDataNull(false);
              setReferensiArsitektur(data.data);
            }
          } catch (err) {
            setError("gagal mendapatkan data referensi arsitektur, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else if(tahun?.value == undefined){
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
            if(data.data === null){
              setDataNull(true);
              setReferensiArsitektur([]);
            } else {
              setDataNull(false);
              setReferensiArsitektur(data.data);
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

    useEffect(() => {
      if(rab){
        if(level != null){
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'ProsesBisnis' && item.level_referensi == level
          
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        } else {
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'ProsesBisnis'
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        }
      } else if(ral){
        if(level != null){
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'Layanan' && item.level_referensi == level
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        } else {
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'Layanan'
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        }
      } else if(rad){
        if(level != null){
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'DataDanInformasi' && item.level_referensi == level
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        } else {
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'DataDanInformasi'
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        }
      } else if(raa){
        if(level != null){
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'Aplikasi' && item.level_referensi == level
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        } else {
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.jenis_referensi == 'Aplikasi'
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        }
      } else if(jenisAll){
        if(level != null){
          const filteredReferensi = referensiarsitektur.filter((item: any) => {
            return item.level_referensi == level
          });
          if(filteredReferensi.length == 0){
            setDataNull(true);
            setFilteredReferensi([]);
          } else {
            setDataNull(false);
            setFilteredReferensi(filteredReferensi);
          }
        } else {
          setFilteredReferensi(referensiarsitektur);
        }
      }
    },[rab, ral, rad, raa, jenisAll ,referensiarsitektur, level])

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
          <div className="flex mb-3 justify-between">
            <div className="flex">
              {jenisAll ? 
                <button className="mx-1 text-xs py-1 px-2 min-w-[100px] border bg-amber-500 text-white rounded-lg">Semua Jenis</button>
                :
                <button className="mx-1 text-xs py-1 px-2 min-w-[100px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setJenisAll(true);
                    setRab(false);
                    setRal(false);
                    setRad(false);
                    setRaa(false);
                  }}
                >Jenis</button>
              }
              {rab ? 
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border bg-amber-500 text-white rounded-lg">RAB</button>
                :
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setJenisAll(false);
                    setRab(true);
                    setRal(false);
                    setRad(false);
                    setRaa(false);
                  }}
                >RAB</button>
              }
              {ral ? 
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border bg-amber-500 text-white rounded-lg">RAL</button>
                :
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setJenisAll(false);
                    setRab(false);
                    setRal(true);
                    setRad(false);
                    setRaa(false);
                  }}
                >RAL</button>
              }
              {rad ? 
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border bg-amber-500 text-white rounded-lg">RAD</button>
                :
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setJenisAll(false);
                    setRab(false);
                    setRal(false);
                    setRad(true);
                    setRaa(false);
                  }}
                >RAD</button>
              }
              {raa ? 
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border bg-amber-500 text-white rounded-lg">RAA</button>
                :
                <button className="mx-1 text-xs py-1 px-2 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setJenisAll(false);
                    setRab(false);
                    setRal(false);
                    setRad(false);
                    setRaa(true);
                  }}
                >RAA</button>
              }
            </div>
            <div className="flex">
              {levelAll ? 
                <button className="mx-1 text-xs py-1 min-w-[100px] border bg-amber-500 text-white rounded-lg">Semua Level</button>
                :
                <button className="mx-1 text-xs py-1 min-w-[100px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setLevelAll(true);
                    setLevel(null);
                  }}
                >Level</button>
              }
              {level == 1 ? 
                <button className="mx-1 text-xs py-1 min-w-[40px] border bg-amber-500 text-white rounded-lg">1</button>
                :
                <button className="mx-1 text-xs py-1 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setLevelAll(false);
                    setLevel(1);
                  }}
                >1</button>
              }
              {level == 2 ? 
                <button className="mx-1 text-xs py-1 min-w-[40px] border bg-amber-500 text-white rounded-lg">2</button>
                :
                <button className="mx-1 text-xs py-1 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setLevelAll(false);
                    setLevel(2);
                  }}
                >2</button>
              }
              {level == 3 ? 
                <button className="mx-1 text-xs py-1 min-w-[40px] border bg-amber-500 text-white rounded-lg">3</button>
                :
                <button className="mx-1 text-xs py-1 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setLevelAll(false);
                    setLevel(3);
                  }}
                >3</button>
              }
              {level == 4 ? 
                <button className="mx-1 text-xs py-1 min-w-[40px] border bg-amber-500 text-white rounded-lg">4</button>
                :
                <button className="mx-1 text-xs py-1 min-w-[40px] border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white"
                  onClick={() => {
                    setLevelAll(false);
                    setLevel(4);
                  }}
                >4</button>
              }
            </div>
          </div>
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
                  filteredReferensi.map((data, index) => (
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