"use client"

import Perbaikan from "@/components/maintenance/perbaikan";

const PetaRencana = () => {

  return(
    <>
      <div className="overflow-auto shadow-xl rounded-xl">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-amber-500">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] text-center sticky bg-amber-500 left-[-1px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kelompok</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">kode kelompok</th>
                        <tr>
                            <th className="px-6 py-3 border-r max-w-[100px] text-center">absen anggota kelompok</th>
                            <th className="px-6 py-3 max-w-[300px] text-center">nama anggota kelompok</th>
                        </tr>
                        <th className="px-6 py-3 border min-w-[200px]">tugas per anggota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border text-center sticky bg-white left-[-2px]">1</td>
                        <td className="px-6 py-4 border">kelompok 1</td>
                        <td className="px-6 py-4 border">001</td>
                        <tr>
                            <td className="py-4 border-r min-w-[100px] text-center">
                                12
                            </td>
                            <td className="w-full px-6 py-4 border-r">
                                budi
                            </td>
                        </tr>
                        <td className="px-6 py-4 border">membawa buku</td>
                    </tr>
                </tbody>
                </table>
            </div>
    </>
  )
}

export default PetaRencana;
