import Table from "@/components/pages/DataMaster/PohonKinerja/Table";
import HeaderPohonKinerja from "@/components/pages/DataMaster/PohonKinerja/HeaderPohonKinerja";

const PohonKinerja  = () => {
    return(
        <>
            <div className="flex flex-col mb-4">
                <HeaderPohonKinerja />
            </div>
            <Table />
        </>
    );
};

export default PohonKinerja;