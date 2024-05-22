"use client";

function Table() {
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
            <tr className="border rounded-b-lg">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">Penyusunan Pohon Kinerja</td>
              <td className="px-6 py-4">Meningkatnya Akuntabilitas Kinerja</td>
              <td className="px-6 py-4">
                5 - UNSUR PENUNJANG URUSAN PEMERINTAHAN
              </td>
              <td className="px-6 py-4">RAB.09 PEMERINTAHAN UMUM</td>
              <td className="px-6 py-4">
                RAB.09.05 PERENCANAAN PEMBANGUNAN NASIONAL
              </td>
              <td className="px-6 py-4">
                RAB.09.05.06 PENGAWASAN, PEMANTAUAN, DAN PENGENDALIAN
                PEMBANGUNAN NASIONAL
              </td>
              <td className="px-6 py-4">
                Meningkatnya Kualitas Perencanaan Tematik Pembangunan
              </td>
              <td className="px-6 py-4">
                Peningkatan Kualitas Pohon kinerja perangkat daerah
              </td>
              <td className="px-6 py-4">
                penyusunan pohon kinerja Kota Madiun
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
