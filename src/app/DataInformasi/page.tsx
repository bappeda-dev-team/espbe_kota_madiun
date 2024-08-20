import Table from "@/components/pages/DataInformasi/Table/Table"
import HeaderDataInformasi from "@/components/pages/DataInformasi/HeaderDataInformasi"

const DataInformasi = () => {
    return(
        <>
            <div className="mb-3">
                <HeaderDataInformasi />
            </div>
            <Table />
        </>
    )
}

export default DataInformasi