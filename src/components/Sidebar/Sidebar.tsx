'use client'

import Link from "next/link";

function Sidebar(){

    return(
        <div className="w-[250px] p-[20px] min-h-screen overflow-y-auto border-r border-stone-300">
            <div className="flex items-center">
                <div className="flex justify-center items-center bg-white rounded-full">
                  <img src="/avatar.png" alt="sidebar avatar" className="w-7 h-7 rounded-full" />
                </div>
                <h1 className="ml-3">Admin Kota</h1>
            </div>

            <div className="border my-2 border-stone-300"></div>
            <div className="flex flex-col items-center">
                <img src="/logo.png" alt="logo sidebar" className="w-16 h-16"/>
                <h1>E-SPBE-Kota Madiun</h1>
            </div>

            <div className="text-base">
                <div className="border my-2 border-stone-300"></div>
                <p className="text-slate-300 text-xs">Kota</p>
                <ul>
                  <li><Link href="/">Dashboard</Link></li>
                  <li><Link href="/User">User</Link></li>
                  <li><Link href="#">Data Master</Link></li>
                </ul>
            </div>
            <div className="text-base">
                <div className="border my-2 border-stone-300"></div>
                <p className="text-slate-300 text-xs">Arsitektur SPBE</p>
                <ul>
                  <li><Link href="/ProsesBisnis">Proses Bisnis</Link></li>
                  <li><Link href="/Layanan">Layanan</Link></li>
                  <li>Data dan Informasi</li>
                  <li>Aplikasi</li>
                  <li>Gap Arsitektur</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;