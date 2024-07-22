"use client"

import { useEffect, useState } from 'react';

interface ProsesBisnis {
  id: number;
  kode_opd: string;
  tahun: number;
  nama_proses_bisnis: string;
  kode_proses_bisnis: string;
  layanans: layanans[];
  data_dan_informasi: data_dan_informaasi[];
  aplikasi: aplikasi[];
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

const Table = () => {

  const [gap, setGap] = useState<ProsesBisnis[]>([]);
  const [dataNull, setDataNull] = useState<boolean>(false);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/GapSPBE`);
        const result = await response.json();
        if (result.data === null) {
          setGap([]);
          setDataNull(true);
        } else {
          setGap(result.data);
          setDataNull(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-auto">
          <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase border">
              <tr>
                  <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                  <th className="px-6 py-3 min-w-[200px]">Nama Proses Bisnis</th>
                  <th className="px-6 py-3 min-w-[200px]">Layanan</th>
                  <th className="px-6 py-3 min-w-[200px]">Data dan Informasi</th>
                  <th className="px-6 py-3 min-w-[200px]">Aplikasi</th>
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

                      {data.layanans.length > 0 && data.layanans.some(data => data.nama_layanan !== null) ? (
                        <td className="border px-6 py-4">
                          <ul>
                          {data.layanans.map((info, idx) => (
                              <li key={idx}>{info.nama_layanan}.</li>
                            ))}
                          </ul>
                        </td>
                      ) : (
                        <td className="border px-6 py-4 bg-red-500">
                          <h1 className="text-white font-bold">GAP</h1>
                        </td>
                      )}
                      {data.data_dan_informasi.length > 0 && data.data_dan_informasi.some(data => data.nama_data !== null) ? (
                        <td className="border px-6 py-4">
                          <ul>
                          {data.data_dan_informasi.map((info, idx) => (
                              <li key={idx}>{info.nama_data}.</li>
                            ))}
                          </ul>
                        </td>
                      ) : (
                        <td className="border px-6 -y-4 bg-red-500">
                          <h1 className="text-white font-bold">GAP</h1>
                        </td>
                      )}
                      {data.aplikasi.length > 0 && data.aplikasi.some(aplikasi => aplikasi.nama_aplikasi !== null) ? (
                        <td className="border px-6 -y-4">
                          <ul>
                          {data.aplikasi.map((info, idx) => (
                              <li key={idx}>{info.nama_aplikasi}.</li>
                            ))}
                          </ul>
                        </td>
                      ) : (
                        <td className="border px-6 -y-4 bg-red-500">
                          <h1 className="text-white font-bold">GAP</h1>
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