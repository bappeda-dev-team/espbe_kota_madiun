import Table from "@/components/pages/DataMaster/SasaranKota/Table";
import HeaderSasaranKota from "@/components/pages/DataMaster/SasaranKota/HeaderSasaranKota";

const SasaranKota = () => {
    return(
        <>
            <div className="flex flex-col mb-4">
                <HeaderSasaranKota />
            </div>
            <Table />
        </>
    )
}

export default SasaranKota;