"use client"

import Button from "@/components/common/Button/Button";

const FormLayanan = () => {

    return(
        <>
            <div className="border p-5">
            <h1 className="uppercase font-bold">Form Layanan SPBE</h1>
            <form className="flex flex-col mx-5 py-5">
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Nama Layanan</label>
                    <input className="border px-4 py-2" id="Nama Layanan" name="Nama Layanan" type="text" placeholder="Masukkan Nama Layanan" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Tujuan Layanan</label>
                    <select className="border px-4 py-2" name="Tujuan Layanan" id="Tujuan Layanan" defaultValue={2}>
                        <option hidden value="2">Pilih Tujuan Layanan</option>
                        <option value="option 1">RAD.01.01</option>
                        <option value="option 2">RAD.02.01</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Target Layanan</label>
                    <input className="border px-4 py-2" id="Target layanan" name="Target Layanan" type="text" placeholder="Masukkan Target Lanyanan" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Metode Layanan</label>
                    <select className="border px-4 py-2" name="Metode Layanan" id="Metode Layanan" defaultValue={3}>
                        <option hidden value="3">Pilih Metode Layanan</option>
                        <option value="option 1">Elektronik</option>
                        <option value="option 2">NON Elektronik</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAL Level 1">RAL Level 1</label>
                    <select className="border px-4 py-2" name="RAL Level 1" id="RAL Level 1" defaultValue={1}>
                        <option hidden value="1">Pilih RAL Level 1</option>
                        <option value="option 1">RAL.01 name</option>
                        <option value="option 2">RAL.02 name</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAL Level 2">RAL Level 2</label>
                    <select className="border px-4 py-2" name="RAL Level 2" id="RAL Level 2" defaultValue={2}>
                        <option hidden value="2">Pilih RAL Level 2</option>
                        <option value="option 1">RAL.01.01</option>
                        <option value="option 2">RAL.02.01</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAL Level 3">RAL Level 3</label>
                    <select className="border px-4 py-2" name="RAL Level 3" id="RAL Level 3" defaultValue={3}>
                        <option hidden value="3">Pilih RAL Level 3</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAL Level 4">RAL Level 4</label>
                    <select className="border px-4 py-2" name="RAL Level 4" id="RAL Level 4" defaultValue={4}>
                        <option hidden value="4">Pilih RAL Level 4</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAL Level 5">RAL Level 5</label>
                    <select className="border px-4 py-2" name="RAL Level 5" id="RAL Level 5" defaultValue={5}>
                        <option hidden value="5">Pilih RAL Level 5</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="pt-5">
                    <Button className="w-full" typee="button" halaman_url="/Layanan/StandartPelayanan">Simpan</Button>
                </div>
            </form>
        </div>
        </>
    );
}

export default FormLayanan;