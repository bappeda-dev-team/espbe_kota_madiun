import Table from "@/components/pages/Arsitektur/Table";
import HeaderArsitektur from "@/components/pages/Arsitektur/HeaderArsitektur";

const Arsitektur = () => {
    return(
        <>
            <div className="mb-3 mt-2">
                <HeaderArsitektur />
            </div>
            <Table />
        </>
    );
};

export default Arsitektur;