import Table from "@/components/pages/Kebutuhan/Table";
import Button from "@/components/common/Button/Button";
import HeaderKebutuhan from "@/components/pages/Kebutuhan/HeaderKebutuhan";

const KebutuhanSPBE = () => {
    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderKebutuhan/>
                <Button halaman_url="/KebutuhanSPBE/TambahKebutuhan">Tambah Data</Button>
            </div>
            <Table />
        </>
    )
}

export default KebutuhanSPBE;