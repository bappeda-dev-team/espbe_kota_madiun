import Table from "@/components/pages/PemenuhanKebutuhan/Table";
import HeaderPemenuhanKebutuhan from "@/components/pages/PemenuhanKebutuhan/HeaderPemenuhanKebutuhan";

const PemenuhanKebutuhan = () => {
    return(
        <>
            <div className="mb-3">
                <HeaderPemenuhanKebutuhan/>
            </div>
            <Table />
        </>
    );
};

export default PemenuhanKebutuhan;