const Table = () => {
    return(
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3">No.</th>
                        <th className="px-6 py-3">Nama Layanan</th>
                        <th className="px-6 py-3">Target Layanan</th>
                        <th className="px-6 py-3">Metode Layanan</th>
                        <th className="px-6 py-3">RAL Level 1</th>
                        <th className="px-6 py-3">RAL Level 2</th>
                        <th className="px-6 py-3">RAL Level 3</th>
                        <th className="px-6 py-3">RAL Level 4</th>
                        <th className="px-6 py-3">RAL Level 5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border rounded-b-lg">
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">Konsultasi Perencanaan Pembangunan Jangka Menengah</td>
                        <td className="px-6 py-4">Tersusunnya Seluruh Dokumen Renstra Perangkat Daerah</td>
                        <td className="px-6 py-4">Elektronik</td>
                        <td className="px-6 py-4">RAL.02 Layanan Administrasi Pemerintahan</td>
                        <td className="px-6 py-4">RAL.02.03 Perencanaan Pembangunan Nasional</td>
                        <td className="px-6 py-4">RAL.02.03.02 Perencanaan Pembangunan Jangka Menengah</td>
                        <td className="px-6 py-4">RAL.2.03.02.01 Perencanaan Pembangunan jangka Menengah</td>
                        <td className="px-6 py-4">N/A</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;