import Table from "@/components/pages/DataInformasi/Table/Table"
import HeaderDataInformasi from "@/components/pages/DataInformasi/HeaderDataInformasi"
import Button from "@/components/common/Button/Button"

const DataInformasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderDataInformasi />
                <Button halaman_url="/DataInformasi/TambahData">Tambah Data</Button>
            </div>
            <Table />
        </>
    )
}

export default DataInformasi