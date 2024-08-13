import Table from "@/components/pages/DataInformasi/Table/Table"
import HeaderDataInformasi from "@/components/pages/DataInformasi/HeaderDataInformasi"

const DataInformasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderDataInformasi />
            </div>
            <Table />
        </>
    )
}

export default DataInformasi