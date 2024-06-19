import Button from "@/components/common/Button/Button";

const Table = () => {
    return(
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 min-w-[200px]">Nama Layanan</th>
                        <th className="px-6 py-3 min-w-[200px]">Tujuan Layanan</th>
                        <th className="px-6 py-3 min-w-[200px]">Target Layanan</th>
                        <th className="px-6 py-3 min-w-[200px]">Metode Layanan</th>
                        <th className="px-6 py-3 min-w-[200px]">Kementrian/Lembaga Terkait</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 1</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 2</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 3</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 4</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 5</th>
                        <th className="px-6 py-3 min-w-[200px]">RAL Level 6</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 sticky bg-white left-[-2px]">1</td>
                        <td className="px-6 py-4">Konsultasi Perencanaan Pembangunan Jangka Menengah</td>
                        <td className="px-6 py-4">N/A</td>
                        <td className="px-6 py-4">Tersusunnya Seluruh Dokumen Renstra Perangkat Daerah</td>
                        <td className="px-6 py-4">Elektronik</td>
                        <td className="px-6 py-4">N/A</td>
                        <td className="px-6 py-4">RAL.02 Layanan Administrasi Pemerintahan</td>
                        <td className="px-6 py-4">RAL.02.03 Perencanaan Pembangunan Nasional</td>
                        <td className="px-6 py-4">RAL.02.03.02 Perencanaan Pembangunan Jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">N/A</td>
                        <td className="px-6 py-4">N/A</td>
                        <td className="px-6 py-4 flex flex-col">
                            <Button typee="button" className="my-1">Edit</Button>
                            <Button typee="button" className="bg-red-500 my-1">Hapus</Button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;