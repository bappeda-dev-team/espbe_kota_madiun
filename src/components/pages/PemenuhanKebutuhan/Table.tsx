"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Loading from "@/components/global/Loading/Loading";
import {ButtonPr, ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { useRouter } from "next/navigation";

interface OptionTypeString {
  value: string;
  label: string;
}

interface PemenuhanKebutuhan {
    id: number;
    keterangan: string;
    kode_opd: number;
    tahun: number;
    nama_domain: string;
    id_prosesbisnis: number;
    jenis_kebutuhan: JenisKebutuhan[];
    penanggung_jawab: string;
    indikator_pj: string;
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
interface opd {
  kode_opd : string;
  nama_opd : string;
  urusan_opd : any;
}

const Table = () => {
    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [kebutuhan, setKebutuhan] = useState<PemenuhanKebutuhan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);
    const [optionOpd, setOptionOpd] = useState<OptionTypeString[]>([])
    const token = getToken();
    const router = useRouter();
    
    const {
      control,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<any>();

    const indikator: OptionTypeString[] = [
      {value: '', label: 'Pilih' },
      {value: 'internal', label: 'Internal' },
      {value: 'eksternal', label: 'Eksternal' },
    ];

    useEffect(() => {
      const fetchUser = getUser();
      setUser(fetchUser);
    },[])

    useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const fetchOptionOpd = async() => {
        try{
          const response = await fetch(`${API_URL}/v1/opdall`, {
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });
          if(!response.ok){
            throw new Error('cant fetch data opd');
          }
          const data = await response.json();
          setOptionOpd(data);
        } catch (err){
          console.log(err);
        }
        fetchOptionOpd();
      }
    },[])

    useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if(tahun !== 0 && SelectedOpd !== "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/kebutuhanspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
              setKebutuhan([]);
              setDataNull(true);
            } else {
              setKebutuhan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError("gagal mendapatkan data kebutuhan spbe, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else if(tahun == 0 && SelectedOpd != "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/kebutuhanspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
              setKebutuhan([]);
              setDataNull(true);
            } else {
              setKebutuhan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError("gagal mendapatkan data kebutuhan spbe, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else if(tahun != 0 && SelectedOpd == "all_opd"){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/kebutuhanspbe?tahun=${tahun}`, {
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
              setKebutuhan([]);
              setDataNull(true);
            } else {
              setKebutuhan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError("gagal mendapatkan data kebutuhan spbe, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else {
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/kebutuhanspbe`, {
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
              setKebutuhan([]);
              setDataNull(true);
            } else {
              setKebutuhan(data.data);
              setDataNull(false);
            }
          } catch (err) {
            setError("gagal mendapatkan data kebutuhan spbe, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      }
    }, [tahun, SelectedOpd, token]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    } else if (loading) {
        return <Loading />;
    }

    return (
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
          </div>
          <div className="overflow-auto rounded-t-xl bg-white shadow-lg border">
              <table className="w-full text-sm text-left">
                  <thead className="text-xs rounded-t-xl text-white bg-sky-600 uppercase">
                      <tr>
                          <th rowSpan={2} className="border px-6 py-3 max-w-[20px] sticky bg-sky-600 left-[-1px]">No.</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px]">Keterangan GAP</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[150px]">Nama Domain</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px]">Kebutuhan</th>
                          <th colSpan={3} className="border px-6 py-3 min-w-[200px] text-center">Kondisi Awal</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Indikator PJ</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Penanggung Jawab</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Aksi</th>
                      </tr>
                      <tr>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2022</th>
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
                                  <td className="px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                                  <td className="border px-6 py-4">{data.keterangan ? data.keterangan : "N/A"}</td>
                                  <td className="border px-6 py-4">{data.nama_domain ? data.nama_domain : "N/A"}</td>
                                  {data.jenis_kebutuhan == null ? (
                                      <>
                                          <td className="border px-6 py-4">
                                            <h1>N/A</h1>
                                          </td>
                                          <td className="border px-6 py-4">
                                            <h1>N/A</h1>
                                          </td>
                                          <td className="border px-6 py-4">
                                            <h1>N/A</h1>
                                          </td>
                                          <td className="border px-6 py-4">
                                            <h1>N/A</h1>
                                          </td>
                                      </>
                                      ) : (
                                      <>
                                          <td className="border px-6 py-4">
                                              <div className="flex flex-col">
                                                  {data.jenis_kebutuhan.map((info, idx) => (
                                                  <div key={info.id}>
                                                      <div>{info.kebutuhan? info.kebutuhan : "N/A"}</div>
                                                  </div>
                                              ))}
                                              </div>
                                          </td>
                                          <td className="border px-6 py-4">
                                              {data.jenis_kebutuhan.map((info, idx) => (
                                                  <div key={idx}>
                                                      {info.kondisi_awal.find(ka => ka.tahun === 2022)?.keterangan || "N/A"}
                                                  </div>
                                              ))}
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
                                  <td className="border px-6 py-4">
                                    {data.indikator_pj ? data.indikator_pj : "N/A"}
                                  </td>
                                  <td className="border px-6 py-4">
                                    {data.penanggung_jawab ? data.penanggung_jawab : "N/A"}
                                  </td>
                                  <td className="px-6 py-4 flex flex-col gap-2">
                                    <ButtonSc className="my-1">
                                      <div className="flex items-center justify-center w-full">
                                          <Image
                                              className="mr-1"
                                              src="/iconLight/edit.svg"
                                              alt="edit"
                                              width={15}
                                              height={15}
                                          />
                                          Simpan
                                      </div>
                                    </ButtonSc>
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