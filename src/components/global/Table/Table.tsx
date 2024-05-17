'use client'

function Table () {
    return(
        <>
            <div className="flex flex-col w-screen aligns-center">
                <div className="mx-5 sm:-mx-6 lg:-mx-1 overflow-x-auto">
                    <div className="inline-block py-5 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md: rounded-lg">
                            <table className="divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th>Proses Bisnis</th>
                                        <th>Sasaran Kota</th>
                                        <th>Kode</th>
                                        <th>Bidang Urusan</th>
                                        <th>RAD Level 1</th>
                                        <th>RAD Level 2</th>
                                        <th>RAD Level 3</th>
                                        <th>RAD Level 4</th>
                                        <th>RAD Level 5</th>
                                        <th>RAD Level 6</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">KOTA MADIUN</td>
                                        <td className="border px-4 py-2">1029337</td>
                                        <td className="border px-4 py-2">5 - UNSUR PENUNJANG URUSAN PEMERINTAHAN</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                        <td className="border px-4 py-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quas</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table