import Button from "@/components/common/Button/Button";

const FormDataInformasi = () => {
    return(
        <>
            <div className="border p-5">
            <h1 className="uppercase font-bold">Form tambah data Aplikasi</h1>
            <form action="#" className="flex flex-col mx-5 py-5">
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Nama data">Nama Aplikasi</label>
                    <input className="border px-4 py-2" id="Nama Aplikasi" name="Nama Aplikasi" type="text" placeholder="Tuliskan Lengkap Akronimnya" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Nama data">Fungsi Aplikasi</label>
                    <input className="border px-4 py-2" id="Fungsi Aplikasi" name="Fungsi Aplikasi" type="text" placeholder="Masukkan Fungsi Aplikasi" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Jenis Data">Jenis Data</label>
                    <select className="border px-4 py-2" name="Jenis Data" id="Jenis Data" defaultValue={1}>
                        <option hidden value="1">Pilih Jenis Data</option>
                        <option value="option 1">Statistik</option>
                        <option value="option 2">Geospasial</option>
                        <option value="option 3">Keuangan</option>
                        <option value="option 3">Lainnya</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Produsen Data">Produsen Data</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Produsen Data" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Penanggung Jawab Data">Penanggung Jawab Data</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Penanggung Jawab Data" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Informasi Terkait Input">Informasi Terkait Input</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Informasi Terkait Input" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Informasi Terkait Output">Informasi Terkait Output</label>
                    <input className="border px-4 py-2" id="1" name="1" type="text" placeholder="Masukkan Informasi Terkait Output" /> 
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="Interoperabilitas">Interoperabilitas</label>
                    <select className="border px-4 py-2" name="Interoperabilitas" id="Interoperabilitas" defaultValue={2}>
                        <option hidden value="2">Pilih Interoperabilitas</option>
                        <option value="option 1">Ya</option>
                        <option value="option 2">Tidak</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 1">RAD Level 1</label>
                    <select className="border px-4 py-2" name="RAD Level 1" id="RAD Level 1" defaultValue={3}>
                        <option hidden value="3">Pilih RAD Level 1</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 2">RAD Level 2</label>
                    <select className="border px-4 py-2" name="RAD Level 2" id="RAD Level 2" defaultValue={4}>
                        <option hidden value="4">Pilih RAD Level 2</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 3">RAD Level 3</label>
                    <select className="border px-4 py-2" name="RAD Level 3" id="RAD Level 3" defaultValue={5}>
                        <option hidden value="5">Pilih RAD Level 3</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="RAD Level 4">RAD Level 4</label>
                    <select className="border px-4 py-2" name="RAD Level 4" id="RAD Level 4" defaultValue={6}>
                        <option hidden value="6">Pilih RAD Level 4</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </select>
                </div>
                <div className="pt-5">
                    <Button className="w-full" typee="button" halaman_url="/Aplikasi">Simpan</Button>
                </div>
            </form>
        </div>
        </>
    );
}

export default FormDataInformasi;