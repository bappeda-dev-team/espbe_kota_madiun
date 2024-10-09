"use client"

import { useEffect, useState } from "react";
import Loading from "@/components/global/Loading/Loading";
import { getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import OpdNull from "@/components/common/Alert/OpdNull";

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

  const [sasaranKinerja, setSasaranKinerja] = useState<ReferensiArsitektur[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const [dataNull, setDataNull] = useState<boolean>(false);
  const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
  const token = getToken();
  const [tahun, setTahun] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);

  useEffect(() => {
    const data = getOpdTahun ();
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
  }, []);

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
          setSasaranKinerja([]);
          setDataNull(true);
        } else {
          setSasaranKinerja(data.data);
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
        fetchingData(`${API_URL}/v1/sasarankinerjapegawai?kode_opd=${SelectedOpd?.value}`);
        setOpdKosong(false);
      } else {
        fetchingData(`${API_URL}/v1/sasarankinerjapegawai?kode_opd=${SelectedOpd?.value}&tahun=${tahun?.value}`);
        setOpdKosong(false);
      }
    }
  }, [tahun, SelectedOpd, token]);

    const formatRupiah = (value: string | number) => {
      const number = parseFloat(value.toString()); // Ubah ke angka
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    if(error){
        return <h1>{error}</h1>
    } else if(loading){
        return <Loading />
    } else if(opdKosong){
      return <OpdNull />
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
                  sasaranKinerja.map((data: any, index: number) => (
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