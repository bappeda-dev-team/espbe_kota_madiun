import Table from "@/components/pages/Aplikasi/Table/Table"
import HeaderAplikasi from "@/components/pages/Aplikasi/HeaderAplikasi"

const Aplikasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderAplikasi />
            </div>
            <Table />
        </>
    )
}

export default Aplikasi