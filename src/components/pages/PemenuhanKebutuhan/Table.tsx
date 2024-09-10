"use client";

import { useState, useEffect } from "react";
import {ButtonSc} from "@/components/common/Button/Button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUser, getToken } from "@/app/Login/Auth/Auth";

const Table = () => {
    const tahun = useSelector((state: RootState) => state.Tahun.tahun);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [user, setUser] = useState<any>(null);
    const token = getToken();

    const [Internal, setInternal] = useState<boolean>(true);
    const [Eksternal, setEksternal] = useState<boolean>(false);

    useEffect(() => {
      const fetchUser = getUser();
      setUser(fetchUser);
    },[])


    return (
        <>
          <div className="flex justify-between mb-3">
              <div className="flex">
                {Internal ? 
                  <button className="rounded-lg mx-1 py-1 min-w-[100px] bg-sky-600 text-white">Internal</button>
                :
                  <button 
                    className="border rounded-lg mx-1 py-1 min-w-[100px] border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                    onClick={() => {
                      setInternal(true);
                      setEksternal(false);
                    }}
                    >
                    Internal
                  </button>
                }
                {Eksternal ? 
                  <button className="rounded-lg mx-1 py-1 min-w-[100px] text-white bg-green-600">Eksternal</button>
                  :
                  <button 
                  className="border rounded-lg mx-1 py-1 min-w-[100px] border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => {  
                    setInternal(false);
                    setEksternal(true);
                  }}
                  >
                    Eksternal
                  </button>
                }
              </div>
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
                  <thead className={`text-xs rounded-t-xl text-white ${Internal ? "bg-sky-600" : "bg-green-600"} uppercase`}>
                      <tr>
                          <th rowSpan={2} className={`border px-6 py-3 max-w-[20px] sticky ${Internal ? "bg-sky-600" : "bg-green-600"} left-[-1px]`}>No.</th>
                          <th colSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Sasaran Kinerja Operational</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[150px]">Nama Domain</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px]">Kebutuhan</th>
                          <th colSpan={5} className="border px-6 py-3 min-w-[200px] text-center">Kondisi Awal</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Indikator PJ</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Penanggung Jawab</th>
                          <th rowSpan={2} className="border px-6 py-3 min-w-[200px] text-center">Aksi</th>
                      </tr>
                      <tr>
                          <th className="border px-6 py-3 min-w-[200px] text-center">Kode</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">Nama Sasaran</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2025</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2026</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2027</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2028</th>
                          <th className="border px-6 py-3 min-w-[200px] text-center">2029</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border rounded-b-lg hover:bg-slate-50">
                          <td className="border px-6 py-4 sticky bg-white left-[-2px]">1</td>
                          <td className="border px-6 py-4">kode</td>
                          <td className="border px-6 py-4">Nama Sasaran Kota</td>
                          <td className="border px-6 py-4">Nama Domain</td>
                          <td className="border px-6 py-4">Kebutuhan</td>
                          <td className="border px-6 py-4">Kondisi awal 2025</td>
                          <td className="border px-6 py-4">Kondisi awal 2026</td>
                          <td className="border px-6 py-4">Kondisi awal 2027</td>
                          <td className="border px-6 py-4">Kondisi awal 2028</td>
                          <td className="border px-6 py-4">Kondisi awal 2029</td>
                          <td className="border px-6 py-4">Indikator PJ</td>
                          <td className="border px-6 py-4">Penanggung Jawab</td>
                          <td className="border px-6 py-4 flex flex-col gap-2">
                            <ButtonSc className="my-1">
                              <div className="flex items-center justify-center w-full">
                                  <Image
                                      className="mr-1"
                                      src="/iconLight/edit.svg"
                                      alt="edit"
                                      width={15}
                                      height={15}
                                  />
                                  Edit
                              </div>
                            </ButtonSc>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </>
    );
};

export default Table;
