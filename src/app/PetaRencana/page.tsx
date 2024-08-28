// "use client"

// import { useState } from 'react';
// import Select from 'react-select';

// interface FormData {
//   nama: string;
//   umur: number;
//   indikator_pj?: string;
//   opd?: { value: string; label: string };
// }

// const dummyData: FormData[] = [
//   { nama: 'John Doe', umur: 30, indikator_pj: 'tidak' },
//   { nama: 'Jane Smith', umur: 25, indikator_pj: 'ada', opd: { value: 'opd1', label: 'OPD 1' } },
//   { nama: 'Jane Smith', umur: 25, indikator_pj: ''},
// ];

// const options = [
//   { value: 'opd1', label: 'OPD 1' },
//   { value: 'opd2', label: 'OPD 2' },
//   { value: 'opd3', label: 'OPD 3' },
//   { value: 'opd4', label: 'OPD 4' },
// ];

// const FormTable = () => {
//   const [data, setData] = useState<FormData[]>(dummyData);

//   const handleIndikatorPjChange = (index: number, value: string) => {
//     const newData = [...data];
//     newData[index].indikator_pj = value;
//     if (value === 'tidak') {
//       newData[index].opd = undefined; // Set opd to undefined if "tidak"
//     }
//     setData(newData);
//   };

//   const handleOpdChange = (index: number, selectedOption: any) => {
//     const newData = [...data];
//     newData[index].opd = selectedOption;
//     setData(newData);
//   };

//   const handleSave = async (index: number) => {
//     const { indikator_pj, opd } = data[index];
//     const payload = {
//       indikator_pj,
//       opd: opd ? opd.value : '', // Ensure opd is always a string
//     };
//     console.log(payload);
//     // try {
//     //   const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
//     //     method: 'PUT',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(payload),
//     //   });

//     //   if (!response.ok) {
//     //     throw new Error('Network response was not ok');
//     //   }

//     //   const responseData = await response.json();
//     //   alert('Data berhasil disimpan: ' + JSON.stringify(responseData));
//     // } catch (error) {
//     //   console.error('Error saving data:', error);
//     //   alert('Terjadi kesalahan saat menyimpan data');
//     // }
//   };

//   return (
//     <form>
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Nama</th>
//             <th className="border px-4 py-2">Umur</th>
//             <th className="border px-4 py-2">Indikator PJ</th>
//             <th className="border px-4 py-2">OPD</th>
//             <th className="border px-4 py-2">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">{row.nama}</td>
//               <td className="border px-4 py-2">{row.umur}</td>
//               <td className="border px-4 py-2">
//                 <select
//                   value={row.indikator_pj || ""}
//                   onChange={(e) => handleIndikatorPjChange(index, e.target.value)}
//                   className="border rounded px-2 py-1"
//                 >
//                   <option value="">Pilih</option>
//                   <option value="ada">Ada</option>
//                   <option value="tidak">Tidak</option>
//                 </select>
//               </td>
//               <td className="border px-4 py-2">
//                 {row.indikator_pj === 'ada' && (
//                   <Select
//                     value={row.opd}
//                     onChange={(selectedOption) => handleOpdChange(index, selectedOption)}
//                     options={options}
//                     placeholder="Pilih OPD"
//                     isClearable
//                   />
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 <button
//                   type="button"
//                   onClick={() => handleSave(index)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Simpan
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </form>
//   );
// };

// export default FormTable;
