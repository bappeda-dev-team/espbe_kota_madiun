import Table from "@/components/pages/DataMaster/BidangUrusan/Table";
import HeaderBidangUrusan from "@/components/pages/DataMaster/BidangUrusan/HeaderBidangUrusan";

const BidangUrusan = () => {
    return(
        <>
            <div className="flex flex-col mb-4">
                <HeaderBidangUrusan />
            </div>
            <Table />
        </>
    )
}

export default BidangUrusan;