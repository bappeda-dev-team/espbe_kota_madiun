"use client";

import { useState, useEffect } from "react";
import Loading from "../../../global/Loading/Loading";
import Button from "@/components/common/Button/Button";

interface rabLevel1_3 {
  Id: number;
  kode_referensi: string;
  nama_referensi: string;
  level_referensi: number;
  jenis_referensi: string;
  tahun: number;
}

interface rabLevel4_6 {
  id: number;
  nama_pohon: string;
  jenis_pohon: string;
  level_pohon: number;
  kode_opd: string;
  tahun: number;
}

interface sasaran_kota {
  ID: number;
  Sasaran: string;
  TujuanKota: string;
  StrategiKota: string;
  Tahun: number;
}

interface typeProsesBisnis {
  id: number;
  nama_proses_bisnis: string;
  sasaran_kota?: sasaran_kota;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan: string;
  rab_level_1?: rabLevel1_3;
  rab_level_2?: rabLevel1_3;
  rab_level_3?: rabLevel1_3;
  rab_level_4?: rabLevel4_6;
  rab_level_5?: rabLevel4_6;
  rab_level_6?: rabLevel4_6;
  tahun: number;
}

function Table() {
  const [dataProsesBisnis, setDataProsesBisnis] = useState<typeProsesBisnis[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/prosesbisnis`);
        if (!response.ok) {
          throw new Error("cant fetching data");
        }
        const data = await response.json();
        if (data.data === null) {
          setDataProsesBisnis([]);
        } else {
          setDataProsesBisnis(data.data);
        }
      } catch (err) {
        setError(
          "Gagal memuat data, silakan cek koneksi internet atau database server",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  const hapusProsesBisnis = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/v1/deleteprosesbisnis/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("cant fetch data");
      }
      alert("berhasil menghapus data");
      setDataProsesBisnis(dataProsesBisnis.filter((item) => item.id !== id));
    } catch (err) {
      alert(
        "gagal menghapus data, silakan cek koneksi internet/database server",
      );
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase border">
            <tr>
              <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">
                No.
              </th>
              <th className="px-6 py-3 min-w-[200px]">Proses Bisnis</th>
              <th className="px-6 py-3 min-w-[200px]">Sasaran Kota</th>
              <th className="px-6 py-3 min-w-[200px]">Bidang Urusan</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 1</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 2</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 3</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 4</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 5</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 6</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataProsesBisnis.map((data, index) => (
              <tr
                key={data.id}
                className="border rounded-b-lg hover:bg-slate-50"
              >
                <td className="px-6 py-4 sticky bg-white left-[-2px]">
                  {index + 1}
                </td>
                <td className="px-6 py-4">{data.nama_proses_bisnis}</td>
                <td className="px-6 py-4">
                  {data.sasaran_kota ? `${data.sasaran_kota.Sasaran}` : "N/A"}
                </td>
                <td className="px-6 py-4">{data.bidang_urusan}</td>
                <td className="px-6 py-4">
                  {data.rab_level_1
                    ? `${data.rab_level_1.kode_referensi} ${data.rab_level_1.nama_referensi}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {data.rab_level_2
                    ? `${data.rab_level_2.kode_referensi} ${data.rab_level_2.nama_referensi}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {data.rab_level_3
                    ? `${data.rab_level_3.kode_referensi} ${data.rab_level_3.nama_referensi}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {data.rab_level_4
                    ? `${data.rab_level_4.jenis_pohon} - ${data.rab_level_4.nama_pohon}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {data.rab_level_5
                    ? `${data.rab_level_5.jenis_pohon} - ${data.rab_level_5.nama_pohon}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {data.rab_level_6
                    ? `${data.rab_level_6.jenis_pohon} - ${data.rab_level_6.nama_pohon}`
                    : "N/A"}
                </td>
                <td className="px-6 py-4 flex flex-col">
                  <Button
                    typee="button"
                    className="my-1"
                    halaman_url={`/ProsesBisnis/EditData/${data.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => hapusProsesBisnis(data.id)}
                    typee="button"
                    className="bg-red-500 my-1"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
