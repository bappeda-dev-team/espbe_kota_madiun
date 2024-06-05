import Table from "@/components/pages/Layanan/Table/Table";
import HeaderLayanan from "@/components/pages/Layanan/HeaderLayanan";
import Button from "@/components/common/Button/Button";

const LayananSPBE = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderLayanan />
                <Button halaman_url="/Layanan/LayananSPBE/TambahData" typee="button">Tambah Data</Button>
            </div>
            <Table/>
        </>
    );
}

export default LayananSPBE;