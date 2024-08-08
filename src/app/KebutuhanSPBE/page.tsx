import Table from "@/components/pages/Kebutuhan/Table";
import {ButtonSc} from "@/components/common/Button/Button";
import HeaderKebutuhan from "@/components/pages/Kebutuhan/HeaderKebutuhan";

const KebutuhanSPBE = () => {
    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderKebutuhan/>
                <ButtonSc halaman_url="/KebutuhanSPBE/TambahKebutuhan">Tambah Data</ButtonSc>
            </div>
            <Table />
        </>
    )
}

export default KebutuhanSPBE;