import Table from "@/components/pages/DataInformasi/Table/Table"
import HeaderDataInformasi from "@/components/pages/DataInformasi/HeaderDataInformasi"
import {ButtonSc} from "@/components/common/Button/Button"

const DataInformasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderDataInformasi />
                <ButtonSc halaman_url="/DataInformasi/TambahData">Tambah Data</ButtonSc>
            </div>
            <Table />
        </>
    )
}

export default DataInformasi