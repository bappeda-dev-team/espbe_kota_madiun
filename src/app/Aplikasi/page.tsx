import Table from "@/components/pages/Aplikasi/Table/Table"
import Button from "@/components/common/Button/Button"
import HeaderAplikasi from "@/components/pages/Aplikasi/HeaderAplikasi"

const Aplikasi = () => {
    return(
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderAplikasi />
                <Button halaman_url="/Aplikasi/TambahData">Tambah Data</Button>
            </div>
            <Table />
        </>
    )
}

export default Aplikasi