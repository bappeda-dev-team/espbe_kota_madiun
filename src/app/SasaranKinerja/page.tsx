import Table from "@/components/pages/DataMaster/SasaranKinerja/Table";
import HeaderSasaranKinerja from "@/components/pages/DataMaster/SasaranKinerja/HeaderSasaranKinerja";

const SasaranKinerja = () => {
    return(
        <>
            <div className="flex flex-col mb-4">
                <HeaderSasaranKinerja />
            </div>
            <Table />
        </>
    )
}

export default SasaranKinerja;