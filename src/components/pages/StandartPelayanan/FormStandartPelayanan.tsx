const FormStandartPelayanan = () => {
    return(
        <>
            <h1>Form Standart Pelayanan</h1>
            <form className="flex flex-col mx-5 py-5">
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Proses Bisnis</label>
                    <label className="text-xs font-light text-gray-300" htmlFor="nama_proses_bisnis">Data Diambil dari table proses bisnis</label>
                    <input 
                        className="border px-4 py-2" 
                        id="nama_proses_bisnis" 
                        type="text"
                        value="penyusunan pohon kinerja"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota">Jenis Pelayanan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="sasaran_kota"
                        type="text"
                        value="konsultasi perencanaan pembangunan jangka menengah"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="dasar_hukum">Dasar Hukum</label>
                    <input 
                        className="border px-4 py-2" 
                        id="dasar_hukum"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="persyaratan_pelayanan">Persyaratan Pelayanan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="persyaratan_pelayanan"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sistem_mekanisme_dan_prosedur">Sistem Mekanisme Dan Prosedur</label>
                    <input 
                        className="border px-4 py-2" 
                        id="sistem_mekanisme_dan_prosedur"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="jangka_waktu_penyelesaian">Jangka Waktu Penyelesaian</label>
                    <input 
                        className="border px-4 py-2" 
                        id="jangka_waktu_penyelesaian"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="biaya_tarif">Biaya / Tarif</label>
                    <input 
                        className="border px-4 py-2" 
                        id="biaya_tarif"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="produk_layanan">Produk Layanan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="produk_layanan"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sarana_prasarana_fasilitas">Sarana, Prasarana dan Fasilitas</label>
                    <input 
                        className="border px-4 py-2" 
                        id="sarana_prasarana_fasilitas"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kompetensi_pelaksana">Kompetensi Pelaksana</label>
                    <input 
                        className="border px-4 py-2" 
                        id="kompetensi_pelaksana"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="pengawasan_internal">Pengawasan Internal</label>
                    <input 
                        className="border px-4 py-2" 
                        id="pengawasan_internal"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="penanganan_pengaduan_saran_masukan">Penanganan, Pengaduan, Saran dan Masukan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="penanganan_pengaduan_saran_masukan"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="jumlah_pelaksana">Jumlah Pelaksana</label>
                    <input 
                        className="border px-4 py-2" 
                        id="jumlah_pelaksana"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="jaminan_pelayanan">Jaminan Pelayanan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="jaminan_pelayanan"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="jaminan_keamanan_keselamatan_pelayanan">Jaminan Keamanan dan Keselamatan Pelayanan</label>
                    <input 
                        className="border px-4 py-2" 
                        id="jaminan_keamanan_keselamatan_pelayanan"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="evaluasi_kinerja_pelaksana">Evaluasi Kinerja Pelaksana</label>
                    <input 
                        className="border px-4 py-2" 
                        id="evaluasi_kinerja_pelaksana"
                        type="text"
                    />
                </div>
            </form>
        </>
    );
}

export default FormStandartPelayanan;