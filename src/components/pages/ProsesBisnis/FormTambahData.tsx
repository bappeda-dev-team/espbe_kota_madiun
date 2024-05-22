"use client";

function FormTambahData() {
    return(
        <>
        <div className="border p-5">
            <h1 className="uppercase font-bold">Form tambah data proses bisnis</h1>
            <form action="#" className="flex flex-col mx-5 py-5">
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Proses Bisnis</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Proses Bisnis" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Sasaran Kota</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Sasaran Kota" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="1">Bidang Urusan</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Bidang Urusan" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 1">RAD Level 1</label>
                    <select className="border px-4 py-2" name="RAD Level 1" id="RAD Level 1">
                        <option disabled hidden selected className="text-stone-300" value=" ">Pilih RAD Level 1</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 2">RAD Level 2</label>
                    <select className="border px-4 py-2" name="RAD Level 2" id="RAD Level 2">
                        <option disabled hidden selected className="text-stone-300" value=" ">Pilih RAD Level 2</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 3">RAD Level 3</label>
                    <select className="border px-4 py-2" name="RAD Level 3" id="RAD Level 3">
                        <option disabled hidden selected className="text-stone-300" value=" ">Pilih RAD Level 3</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <button className="my-3 py-2 bg-emerald-300 text-white">SIMPAN</button>
            </form>
        </div>
        </>
    )
}

export default FormTambahData;