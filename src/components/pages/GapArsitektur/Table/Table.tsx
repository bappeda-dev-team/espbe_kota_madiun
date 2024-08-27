"use client"

import { useEffect, useState } from 'react';
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Loading from '@/components/global/Loading/Loading';
import { useRouter } from 'next/navigation';
import { ButtonSc, ButtonPr } from '@/components/common/Button/Button';
import { AlertNotification } from '@/components/common/Alert/Alert';

interface ProsesBisnis {
  id: number;
  kode_opd: string;
  tahun: number;
  nama_proses_bisnis: string;
  kode_proses_bisnis: string;
  layanans: layanans[];
  data_dan_informasi: data_dan_informaasi[];
  aplikasi: aplikasi[];
  keterangan: keterangan[];
}
interface layanans {
  nama_layanan: string | null;
}
interface data_dan_informaasi {
  nama_data: string | null;
}
interface aplikasi {
  nama_aplikasi: string | null;
}
interface keterangan {
  id_keterangan: number;
  keterangan: string;
}

const Table = (data: any) => {

  const tahun = useSelector((state: RootState) => state.Tahun.tahun);
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
  const [gap, setGap] = useState<ProsesBisnis[]>([]);
  const [dataNull, setDataNull] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const token = getToken();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  },[])

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if(tahun !== 0 && SelectedOpd !== "all_opd"){
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/gapspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
            setGap([]);
            setDataNull(true);
          } else {
            setGap(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError("gagal mendapatkan data GAP Arsitektur, cek koneksi internet atau database server");
        } finally {
          setLoading(false);
        }
      };
      fetchingData();
    } else if(tahun == 0 && SelectedOpd != "all_opd"){
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/gapspbe?tahun=${tahun}&kode_opd=${SelectedOpd}`, {
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
            setGap([]);
            setDataNull(true);
          } else {
            setGap(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError("gagal mendapatkan data GAP Arsitektur, cek koneksi internet atau database server");
        } finally {
          setLoading(false);
        }
      };
      fetchingData();
    } else if(tahun != 0 && SelectedOpd == "all_opd"){
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/gapspbe?tahun=${tahun}`, {
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
            setGap([]);
            setDataNull(true);
          } else {
            setGap(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError("gagal mendapatkan data GAP Arsitektur, cek koneksi internet atau database server");
        } finally {
          setLoading(false);
        }
      };
      fetchingData();
    } else {
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/gapspbe`, {
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
            setGap([]);
            setDataNull(true);
          } else {
            setGap(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError("gagal mendapatkan data GAP Arsitektur, cek koneksi internet atau database server");
        } finally {
          setLoading(false);
        }
      };
      fetchingData();
    }
  }, [tahun, SelectedOpd, token]);

  const tambahketerangan = async(id: number) => {
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
        router.push(`/GapArsitektur/TambahKeterangan/${id}`)
      } else {
        AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
      }
    } else {
      router.push(`/GapArsitektur/TambahKeterangan/${id}`)
    }
  }
  const editketerangan = async(id: number) => {
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
        router.push(`/GapArsitektur/EditKeterangan/${id}`)
      } else {
        AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
      }
    } else {
      router.push(`/GapArsitektur/EditKeterangan/${id}`)
    }
  }

  if(loading){
    return <Loading />
  } else if(error){
    return <h1 className="text-red-500">{error}</h1>
  }

  return (
    <>
      <div className="overflow-auto rounded-t-xl bg-white shadow-lg border">
          <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-emerald-500 rounded-t-xl">
              <tr>
                  <th className="border px-6 py-3 max-w-[20px] sticky bg-emerald-500 left-[-1px]">No.</th>
                  <th className="border px-6 py-3 min-w-[350px] text-center">Nama Proses Bisnis</th>
                  <th className="border px-6 py-3 min-w-[200px] text-center">Layanan</th>
                  <th className="border px-6 py-3 min-w-[200px] text-center">Data dan Informasi</th>
                  <th className="border px-6 py-3 min-w-[200px] text-center">Aplikasi</th>
                  <th className="border px-6 py-3 min-w-[300px] text-center">Keterangan GAP</th>
              </tr>
          </thead>
          <tbody>
              {dataNull ? (
              <tr>
                 <td className="px-6 py-3" colSpan={8}>
                     Data Kosong / Belum Ditambahkan
                 </td>
              </tr>
              ) : (
                  gap.map((data, index) => (
                  <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                      <td className="border px-6 py-4 sticky bg-white left-[-2px]">{index + 1}</td>
                      
                      {data.nama_proses_bisnis ? (
                        <td className="border px-6 py-4">
                          {data.nama_proses_bisnis}
                        </td>
                      ) : (
                        <td className="border px-6 py-4 bg-red-500 text-white text-center font-bold">
                          GAP
                        </td>
                      )}
                      {/* Layanan */}
                      {data.layanans.length > 0 && data.layanans.some(data => data.nama_layanan !== null) ? (
                        <td className="border px-6 py-4">
                          {data.layanans.length > 1 ? (
                            <div className="flex flex-col">
                              {data.layanans.map((info, idx) => (
                                <>
                                  <div key={idx}>{info.nama_layanan}</div>
                                  {idx < data.layanans.length - 1 && <hr className="border-t my-2" />}
                                </>
                              ))}
                            </div>
                          ) : (
                            <ul>
                              {data.layanans.map((info, idx) => (
                                <li key={idx}>{info.nama_layanan}.</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      ) : (
                        <td className="border px-6 py-4 bg-red-500">
                          <h1 className="text-white font-bold text-center">GAP</h1>
                        </td>
                      )}
                      {/* Data dan Informasi */}
                      {data.data_dan_informasi.length > 0 && data.data_dan_informasi.some(data => data.nama_data !== null) ? (
                        <td className="border px-6 py-4">
                          {data.data_dan_informasi.length > 1 ? (
                            <div className="flex flex-col">
                              {data.data_dan_informasi.map((info, idx) => (
                                <>
                                  <div key={idx}>{info.nama_data}</div>
                                  {idx < data.data_dan_informasi.length - 1 && <hr className="border-t my-2" />}
                                </>
                              ))}
                            </div>
                          ) : (
                            <ul>
                              {data.data_dan_informasi.map((info, idx) => (
                                <li key={idx}>{info.nama_data}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      ) : (
                        <td className="border px-6 py-4 bg-red-500">
                          <h1 className="text-white font-bold text-center">GAP</h1>
                        </td>
                      )}
                      {/* Aplikasi */}
                      {data.aplikasi.length > 0 && data.aplikasi.some(data => data.nama_aplikasi !== null) ? (
                        <td className="border px-6 py-4">
                          {data.aplikasi.length > 1 ? (
                            <div className="flex flex-col">
                              {data.aplikasi.map((info, idx) => (
                                <>
                                  <div key={idx}>{info.nama_aplikasi}</div>
                                  {idx < data.aplikasi.length - 1 && <hr className="border-t my-2" />}
                                </>
                              ))}
                            </div>
                          ) : (
                            <ul>
                              {data.aplikasi.map((info, idx) => (
                                <li key={idx}>{info.nama_aplikasi}.</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      ) : (
                        <td className="border px-6 py-4 bg-red-500">
                          <h1 className="text-white font-bold text-center">GAP</h1>
                        </td>
                      )}
                      {/* keterangan */}
                      {data.keterangan.length > 0 && data.keterangan.some(info => info.keterangan !== null) ? (
                        <td className="border px-6 py-4 text-center">
                          {data.keterangan.length > 1 ? (
                            <div className="flex flex-col">
                              {data.keterangan.map((info, idx) => (
                                <div key={info.id_keterangan}>
                                  <div className="flex justify-between items-center">
                                    <span>{info.keterangan}</span>
                                    <div className="flex flex-col">
                                      <button 
                                        className="bg-white text-sky-500 border border-sky-500 rounded-lg hover:text-white hover:bg-sky-500 ml-4 my-1 py-2 px-2 text-xs font-normal"
                                        onClick={() => {tambahketerangan(data.id)}}
                                      >
                                        Tambah
                                      </button>
                                      <button 
                                        className="bg-white text-emerald-500 border border-emerald-500 rounded-lg hover:text-white hover:bg-emerald-500 ml-4 my-1 py-2 px-2 text-xs font-normal"
                                        onClick={() => router.push(`GapArsitektur/EditKeterangan/${info.id_keterangan}`)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                  {idx < data.keterangan.length - 1 && <hr className="border-t my-2" />}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul>
                              {data.keterangan.map((info, idx) => (
                                <div key={info.id_keterangan} className="flex justify-between items-center">
                                  <li>{info.keterangan}.</li>
                                  <div className="flex flex-col">
                                    <button 
                                      className="bg-white text-sky-500 border border-sky-500 rounded-lg hover:text-white hover:bg-sky-500 ml-4 my-1 py-2 px-2 text-xs font-normal"
                                      onClick={() => {tambahketerangan(data.id)}}
                                    >
                                      Tambah
                                    </button>
                                    <button 
                                      className="bg-white text-emerald-500 border border-emerald-500 rounded-lg hover:text-white hover:bg-emerald-500 ml-4 my-1 py-2 px-2 text-xs font-normal"
                                      onClick={() => router.push(`GapArsitektur/EditKeterangan/${info.id_keterangan}`)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </ul>
                          )}
                        </td>
                      ) : (
                        <td className="border px-6 py-4 text-center">
                          <button className="bg-white text-sky-500 border border-sky-500 rounded-lg hover:text-white hover:bg-sky-500 ml-4 my-1 py-2 px-2 text-xs font-normal" onClick={() => {tambahketerangan(data.id)}}>Tambah Keterangan</button>
                        </td>
                      )}
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