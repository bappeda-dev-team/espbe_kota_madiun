import Button from "@/components/common/Button/Button";

const Table = () => {
    return(
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3">No.</th>
                        <th className="px-6 py-3">Nama Data</th>
                        <th className="px-6 py-3">Sifat Data</th>
                        <th className="px-6 py-3">Jenis Data</th>
                        <th className="px-6 py-3">Produsen Data</th>
                        <th className="px-6 py-3">Penanggung Jawab Data</th>
                        <th className="px-6 py-3">Informasi Terkait Input</th>
                        <th className="px-6 py-3">Informasi Terkait Output</th>
                        <th className="px-6 py-3">Interoperabilitas</th>
                        <th className="px-6 py-3">RAD Level 1</th>
                        <th className="px-6 py-3">RAD Level 2</th>
                        <th className="px-6 py-3">RAD Level 3</th>
                        <th className="px-6 py-3">RAD Level 4</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border rounded-b-lg">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">data perencanaan kinerja dan anggaran</td>
                        <td className="px-6 py-4">Terbatas</td>
                        <td className="px-6 py-4">Keuangan</td>
                        <td className="px-6 py-4">Produsen Data</td>
                        <td className="px-6 py-4">Badan Perencanaan, penelitian dan pengembangan daerah</td>
                        <td className="px-6 py-4">informasi terkait input</td>
                        <td className="px-6 py-4">informasi terkait output</td>
                        <td className="px-6 py-4">Interoperabilitas</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4 flex flex-col">
                            <Button typee="button" className="my-1">Edit</Button>
                            <Button typee="button" className="bg-red-500 my-1">Hapus</Button>
                        </td>
                    </tr>
                    <tr className="border rounded-b-lg">
                        <td className="px-6 py-4">2</td>
                        <td className="px-6 py-4">Nama Data</td>
                        <td className="px-6 py-4">Terbatas</td>
                        <td className="px-6 py-4">Keuangan</td>
                        <td className="px-6 py-4">Produsen Data</td>
                        <td className="px-6 py-4">Penanggung jawab data</td>
                        <td className="px-6 py-4">informasi terkait input</td>
                        <td className="px-6 py-4">informasi terkait output</td>
                        <td className="px-6 py-4">Interoperabilitas</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4 flex flex-col">
                            <Button typee="button" className="my-1">Edit</Button>
                            <Button typee="button" className="bg-red-500 my-1">Hapus</Button>
                        </td>
                    </tr>
                    <tr className="border rounded-b-lg">
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4">Nama Data</td>
                        <td className="px-6 py-4">Terbatas</td>
                        <td className="px-6 py-4">Keuangan</td>
                        <td className="px-6 py-4">Produsen Data</td>
                        <td className="px-6 py-4">Penanggung jawab data</td>
                        <td className="px-6 py-4">informasi terkait input</td>
                        <td className="px-6 py-4">informasi terkait output</td>
                        <td className="px-6 py-4">Interoperabilitas</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
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