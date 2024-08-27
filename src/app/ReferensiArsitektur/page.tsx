import Table from "@/components/pages/DataMaster/ReferensiArsitektur/Table";
import HeaderReferensiArsitektur from "@/components/pages/DataMaster/ReferensiArsitektur/HeaderReferensiArsitektur";

const ReferensiArsitektur = () => {
    return(
        <>
            <div className="flex flex-col mb-4">
                <HeaderReferensiArsitektur />
            </div>
            <Table />
        </>
    )
}

export default ReferensiArsitektur;