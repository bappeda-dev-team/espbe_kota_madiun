"use client";

import { useState, useEffect } from "react";
import Loading from "../../../global/Loading/Loading";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AlertNotification, AlertQuestion } from "@/components/common/Alert/Alert";

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
}

interface bidang_urusan {
  id: number;
  bidang_urusan: string;
}

interface typeProsesBisnis {
  id: number;
  nama_proses_bisnis: string;
  sasaran_kota?: sasaran_kota;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan_id: bidang_urusan;
  rab_level_1?: rabLevel1_3;
  rab_level_2?: rabLevel1_3;
  rab_level_3?: rabLevel1_3;
  rab_level_4?: rabLevel4_6;
  rab_level_5?: rabLevel4_6;
  rab_level_6?: rabLevel4_6;
  tahun: number;
}

function Table() {
  //state fetch data proses bisnis
  const tahun = useSelector((state: RootState) => state.tahunProsesBisnis.tahun) //tahunProsesBisnis diambil dari store.ts, tahun diambil dari ProsesBisnisSlicer.ts -> interface TahunState{ tahun: number }
  const [dataProsesBisnis, setDataProsesBisnis] = useState<typeProsesBisnis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataNull, setDataNull] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  //fetch data proses bisnis
  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if(tahun !== 0){
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/prosesbisnisbytahun/${tahun}`);
          if (!response.ok) {
            throw new Error("cant fetching data");
          }
          const data = await response.json();
          if (data.data === null) {
            setDataProsesBisnis([]);
            setDataNull(true);
          } else {
            setDataProsesBisnis(data.data);
            setDataNull(false);
          }
        } catch (err) {
          setError(
            "Gagal memuat data, silakan cek koneksi internet atau database server",
          );
        }
      };
      fetchingData();
    } else if(tahun == 0){
      const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/prosesbisnis`);
          if (!response.ok) {
            throw new Error("cant fetching data");
          }
          const data = await response.json();
          if (data.data === null) {
            setDataProsesBisnis([]);
            setDataNull(true);
          } else {
            setDataProsesBisnis(data.data);
            setDataNull(false);
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
    }
  }, [tahun]);

  //hapus data
  const hapusProsesBisnis = async (id: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_URL}/v1/deleteprosesbisnis/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("cant fetch data");
      }
      setDataProsesBisnis(dataProsesBisnis.filter((item) => item.id !== id));
      AlertNotification("Berhasil", "Berhasil hapus data proses bisnis", "success", 1000);
    } catch (err) {
      AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
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
              <th className="px-6 py-3 min-w-[200px]">Kode Proses Bisnis</th>
              <th className="px-6 py-3 min-w-[200px]">Kode OPD</th>
              <th className="px-6 py-3 min-w-[200px]">Bidang Urusan</th>
              <th className="px-6 py-3 min-w-[200px]">Sasaran Kota</th>
              <th className="px-6 py-3 min-w-[200px]">Tahun</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 1</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 2</th>
              <th className="px-6 py-3 min-w-[200px]">RAB Level 3</th>
              <th className="px-6 py-3 min-w-[200px]">Strategic</th>
              <th className="px-6 py-3 min-w-[200px]">Tactical</th>
              <th className="px-6 py-3 min-w-[200px]">Operational</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataNull ? (
              <tr>
                <td className="px-6 py-3" colSpan={13}>
                  Data Kosong / Belum Ditambahkan
                </td>
              </tr>
            ) : (
              dataProsesBisnis.map((data, index) => (
                <tr
                  key={data.id}
                  className="border rounded-b-lg hover:bg-slate-50"
                >
                  <td className="px-6 py-4 sticky bg-white left-[-2px]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{data.nama_proses_bisnis}</td>
                  <td className="px-6 py-4">{data.kode_proses_bisnis}</td>
                  <td className="px-6 py-4">{data.kode_opd}</td>
                  <td className="px-6 py-4">
                    {data.bidang_urusan_id
                      ? `${data.bidang_urusan_id.bidang_urusan}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {data.sasaran_kota ? `${data.sasaran_kota.Sasaran}` : "N/A"}
                  </td>
                  <td className="px-6 py-4">{data.tahun}</td>
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
                      ? `${data.rab_level_4.nama_pohon}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {data.rab_level_5
                      ? `${data.rab_level_5.nama_pohon}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {data.rab_level_6
                      ? `${data.rab_level_6.nama_pohon}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 flex flex-col">
                    <ButtonSc
                      typee="button"
                      className="my-1"
                      halaman_url={`/ProsesBisnis/EditData/${data.id}`}
                    >
                      Edit
                    </ButtonSc>
                    <ButtonTr
                      typee="button"
                      className="my-1"
                      onClick={() => {
                        AlertQuestion("Hapus?", "hapus proses bisnis yang dipilih?", "question", "Hapus", "Batal").then((result) => {
                          if(result.isConfirmed){
                              hapusProsesBisnis(data.id);
                          }
                        })
                      }}
                    >
                      Hapus
                    </ButtonTr>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
