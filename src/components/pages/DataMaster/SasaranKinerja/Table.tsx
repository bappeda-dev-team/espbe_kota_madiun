"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { event } from "jquery";

interface ReferensiArsitektur {
    id: number;
    kode_opd: string;
    kode_sasaran: string;
    tahun_sasaran: string;
    sasaran_kinerja: string;
    anggaran_sasaran: string;
    pelaksana_sasaran: string;
    kode_subkegiatan_sasaran: string;
    subkegiatan_sasaran: string;
}

const Table = () => {

  const tahun = useSelector((state: RootState) => state.Tahun.tahun);
  const [sasaranKinerja, setSasaranKinerja] = useState<ReferensiArsitektur[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const [dataNull, setDataNull] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      if(tahun !== 0){
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/sasarankinerjapegawai?tahun=${tahun}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            setSasaranKinerja(data.data);
          } catch (err) {
            setError("gagal mendapatkan data referensi arsitektur, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      } else {
        const fetchingData = async () => {
          try {
            const response = await fetch(`${API_URL}/v1/sasarankinerjapegawai`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error("cant fetching data");
            }
            const data = await response.json();
            setSasaranKinerja(data.data);
          } catch (err) {
            setError("gagal mendapatkan data referensi arsitektur, cek koneksi internet atau database server");
          } finally {
            setLoading(false);
          }
        };
        fetchingData();
      }
    }, [tahun, token]);

    const formatRupiah = (value: string | number) => {
      const number = parseFloat(value.toString()); // Ubah ke angka
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    }

    return(
        <>
          <div className="overflow-auto rounded-xl shadow-xl">
              <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-amber-500">
                  <tr>
                      <th className="px-6 py-3 border max-w-[20px] text-center sticky bg-amber-500 left-[-1px]">No.</th>
                      <th className="px-6 py-3 border min-w-[200px]">Kode OPD</th>
                      <th className="px-6 py-3 border min-w-[100px]">Kode Sasaran</th>
                      <th className="px-6 py-3 border min-w-[100px]">Tahun Sasaran</th>
                      <th className="px-6 py-3 border min-w-[300px]">Sasaran Kinerja</th>
                      <th className="px-6 py-3 border min-w-[100px] text-center">Anggaran Sasaran</th>
                      <th className="px-6 py-3 border min-w-[100px] text-center">Pelaksana Sasaran</th>
                      <th className="px-6 py-3 border min-w-[100px] text-center">Kode Sub Kegiatan Sasaran</th>
                      <th className="px-6 py-3 border min-w-[100px] text-center">Subkegiatan Sasaran</th>
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
                  sasaranKinerja.map((data, index) => (
                  <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                      <td className="px-6 py-4 border sticky bg-white text-center left-[-2px]">{index +1}</td>
                      <td className="px-6 py-4 border">{data.kode_opd}</td>
                      <td className="px-6 py-4 border">{data.kode_sasaran}</td>
                      <td className="px-6 py-4 border text-center">{data.tahun_sasaran}</td>
                      <td className="px-6 py-4 border">{data.sasaran_kinerja}</td>
                      <td className="px-6 py-4 border text-center">{formatRupiah(data.anggaran_sasaran)}</td>
                      <td className="px-6 py-4 border text-center">{data.pelaksana_sasaran}</td>
                      <td className="px-6 py-4 border text-center">{data.kode_subkegiatan_sasaran}</td>
                      <td className="px-6 py-4 border text-center">{data.subkegiatan_sasaran}</td>
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