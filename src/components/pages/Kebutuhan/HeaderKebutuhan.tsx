"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const HeaderKebutuhan = () => {
    const tahun = useSelector((state: RootState) => state.Tahun.tahun)
    return (
        <>
            <div className="flex flex-wrap">
                <h1 className="uppercase font-bold">
                    Kebutuhan SPBE Badan Perencanaan, Penelitian dan Pengembangan Daerah {tahun === 0 ? "Semua Tahun" : tahun}
                </h1>
            </div>
        </>
    )
}

export default HeaderKebutuhan;