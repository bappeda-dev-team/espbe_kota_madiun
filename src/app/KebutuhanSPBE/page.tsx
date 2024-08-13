import Table from "@/components/pages/Kebutuhan/Table";
import HeaderKebutuhan from "@/components/pages/Kebutuhan/HeaderKebutuhan";

const KebutuhanSPBE = () => {
    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <HeaderKebutuhan/>
            </div>
            <Table />
        </>
    )
}

export default KebutuhanSPBE;