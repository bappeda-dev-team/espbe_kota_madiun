"use client";

import { useState, useEffect } from "react";
import Loading from "../../../global/Loading/Loading";

interface radLevel {
  Id: number,
  kode_referensi : string,
  nama_referensi : string,
  level_referensi : number,
  jenis_referensi : string,
  tahun : number;
}

interface typeProsesBisnis {
  id : number;
  nama_proses_bisnis : string;
  sasaran_kota : string;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan : string;
  rab_level_1? : radLevel;
  rab_level_2? : radLevel;
  rab_level_3? : radLevel;
  rab_level_4? : radLevel;
  rab_level_5? : radLevel;
  rab_level_6? : radLevel;
  tahun: number;
}

function Table() {

  const [dataProsesBisnis, setDataProsesBisnis] = useState<typeProsesBisnis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchingData = async () => {
      try{
        const response = await fetch(`${API_URL}/v1/prosesbisnisall`)
        if (!response.ok){
          throw new Error("cant fetching data")
        }
        const data = await response.json();
        setDataProsesBisnis(data.data);
      } catch(err){
        setError("Gagal memuat data, silakan cek koneksi internet atau database server")
      } finally{
        setLoading(false);
      }
    }

    fetchingData();
  }, []);

  if (loading) {
    return(
      <Loading />
    );
  } else if (error) {
    return(
      <h1>{error}</h1>
    );
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase border">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">Proses Bisnis</th>
              <th className="px-6 py-3">Sasaran Kota</th>
              <th className="px-6 py-3">Bidang Urusan</th>
              <th className="px-6 py-3">RAB Level 1</th>
              <th className="px-6 py-3">RAB Level 2</th>
              <th className="px-6 py-3">RAB Level 3</th>
              <th className="px-6 py-3">RAB Level 4</th>
              <th className="px-6 py-3">RAB Level 5</th>
              <th className="px-6 py-3">RAB Level 6</th>
            </tr>
          </thead>
          <tbody>
          {dataProsesBisnis.map ((data, index) => (
            <tr key={data.id} className="border rounded-b-lg">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{data.nama_proses_bisnis}</td>
              <td className="px-6 py-4">{data.sasaran_kota}</td>
              <td className="px-6 py-4">{data.bidang_urusan}</td>
              <td className="px-6 py-4">{data.rab_level_1 ? `${data.rab_level_1.kode_referensi} ${data.rab_level_1.nama_referensi}` : "N/A"}</td>
              <td className="px-6 py-4">{data.rab_level_2 ? `${data.rab_level_2.kode_referensi} ${data.rab_level_2.nama_referensi}` : "N/A"}</td>
              <td className="px-6 py-4">{data.rab_level_3 ? `${data.rab_level_3.kode_referensi} ${data.rab_level_3.nama_referensi}` : "N/A"}</td>
              <td className="px-6 py-4">{data.rab_level_4 ? `${data.rab_level_4.kode_referensi} ${data.rab_level_4.nama_referensi}` : "N/A"}</td>
              <td className="px-6 py-4">{data.rab_level_5 ? `${data.rab_level_5.kode_referensi} ${data.rab_level_5.nama_referensi}` : "N/A"}</td>
              <td className="px-6 py-4">{data.rab_level_6 ? `${data.rab_level_6.kode_referensi} ${data.rab_level_6.nama_referensi}` : "N/A"}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
