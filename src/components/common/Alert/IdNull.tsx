import { ButtonTr } from "../Button/Button";

interface IdNull {
    url: string;
}

const IdNull: React.FC<IdNull> = ({url}) => {
    return(
        <>
            <div className="flex flex-wrap items-center justify-between border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">ID Tidak Tersedia/Data Kosong</h1>
                <ButtonTr halaman_url={url}>Kembali</ButtonTr>
            </div>
        </>
    )
}

export default IdNull;