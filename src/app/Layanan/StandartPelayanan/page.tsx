import Table from "@/components/pages/Layanan/Table/Table"
import HeaderLayanan from "@/components/pages/Layanan/HeaderLayanan"

const Layanan = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderLayanan />
            </div>
            <Table />
        </>
    )
} 

export default Layanan