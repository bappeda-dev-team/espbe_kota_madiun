"use client";

import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

interface typeProsesBisnis {
  id : number;
  nama_proses_bisnis : string;
  sasaran_kota : string;
  bidang_urusan : string;
  rad_level_1 : string;
  rad_level_2 : string;
  rad_level_3 : string;
  rad_level_4 : string;
  rad_level_5 : string;
  rad_level_6 : string;
}

function Table() {

  const [dataProsesBisnis, setDataProsesBisnis] = useState<typeProsesBisnis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchingData = async () => {
      try{
        const response = await fetch(`${API_URL}/prosesBisnis`)
        if (!response.ok){
          throw new Error("cant fetching data")
        }
        const data = await response.json();
        setDataProsesBisnis(data);
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
              <th className="px-6 py-3">RAD Level 1</th>
              <th className="px-6 py-3">RAD Level 2</th>
              <th className="px-6 py-3">RAD Level 3</th>
              <th className="px-6 py-3">RAD Level 4</th>
              <th className="px-6 py-3">RAD Level 5</th>
              <th className="px-6 py-3">RAD Level 6</th>
            </tr>
          </thead>
          <tbody>
          {dataProsesBisnis.map ((data, index) => (
            <tr key={data.id} className="border rounded-b-lg">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{data.nama_proses_bisnis}</td>
              <td className="px-6 py-4">{data.sasaran_kota}</td>
              <td className="px-6 py-4">{data.bidang_urusan}</td>
              <td className="px-6 py-4">{data.rad_level_1}</td>
              <td className="px-6 py-4">{data.rad_level_2}</td>
              <td className="px-6 py-4">{data.rad_level_3}</td>
              <td className="px-6 py-4">{data.rad_level_4}</td>
              <td className="px-6 py-4">{data.rad_level_5}</td>
              <td className="px-6 py-4">{data.rad_level_6}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
