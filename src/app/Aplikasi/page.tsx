import Table from "@/components/pages/Aplikasi/Table/Table"
import {ButtonSc} from "@/components/common/Button/Button"
import HeaderAplikasi from "@/components/pages/Aplikasi/HeaderAplikasi"

const Aplikasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderAplikasi />
                <ButtonSc halaman_url="/Aplikasi/TambahData">Tambah Data</ButtonSc>
            </div>
            <Table />
        </>
    )
}

export default Aplikasi