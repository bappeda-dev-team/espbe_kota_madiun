'use client'

import Link from "next/link";
import { useState } from "react";


function Sidebar(){
    
    const [menuActive, setMenuActive] = useState();
    
    const handlerMenuActive = (opsi: any) => {
        setMenuActive(opsi);
    }

    return(
      <div className="w-[250px] min-h-screen border-r">
        <div className="p-5 overflow-y-auto border-b border-stone-300">
            <div className="flex items-center pb-2">
                <div className="flex justify-center items-center bg-white rounded-full">
                  <img src="/avatar.png" alt="sidebar avatar" className="w-7 h-7 rounded-full" />
                </div>
                <h1 className="ml-3">Admin Kota</h1>
            </div>
        </div>

        <div className="p-5 overflow-y-auto border-b border-stone-300">
            <div className="flex flex-col items-center text-center">
                <img src="/logo.png" alt="logo sidebar" className="w-16 h-16"/>
                <h1>E-SPBE-Kota Madiun</h1>
            </div>
        </div>

        <div className="p-5 overflow-y-auto border-b border-stone-300">
            <div className="text-base">
                <p className="text-slate-300 text-xs">Kota</p>
                <ul>
                  <Link onClick={() => handlerMenuActive("Dashboard")} className={menuActive === "Dashboard" ? "text-emerald-300" : ""} href="/">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Dashboard
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("User")} className={menuActive === "User" ? "text-emerald-300" : ""}href="/User">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      User
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("Data Master")} className={menuActive === "Data Master" ? "text-emerald-300" : ""} href="/DataMaster">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Data Master
                    </li>
                  </Link>
                </ul>
            </div>
        </div>

        <div className="p-5 overflow-y-auto border-b border-stone-300">
            <div className="text-base">
                <p className="text-slate-300 text-xs">Arsitektur SPBE</p>
                <ul>
                  <Link onClick={() => handlerMenuActive("Proses Bisnis")} className={menuActive === "Proses Bisnis" ? "text-emerald-300" : ""} href="/ProsesBisnis">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Proses Bisnis
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("Layanan")} className={menuActive === "Layanan" ? "text-emerald-300" : ""} href="/Layanan">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Layanan
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("Data dan Informasi")} className={menuActive === "Data dan Informasi" ? "text-emerald-300" : ""} href="/DataInformasi">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Data dan Informasi
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("Aplikasi")} className={menuActive === "Aplikasi" ? "text-emerald-300" : ""} href="/Aplikasi">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Aplikasi
                    </li>
                  </Link>
                  <Link onClick={() => handlerMenuActive("GapArsitektur")} className={menuActive === "GapArsitektur" ? "text-emerald-300" : ""} href="/GapArsitektur">
                    <li className="py-1 pl-2 rounded-lg hover:text-white hover:bg-emerald-300 ">
                      Gap Arsitektur
                    </li>
                  </Link>
                </ul>
            </div>
        </div>
      </div>
    );
}

export default Sidebar;