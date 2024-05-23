'use client'

import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


function Sidebar(){

    const url = usePathname();
    
    const [dahsboardActive, setDahsboardActive] = useState<boolean>(false);
    const [UserActive, setUserActive] = useState<boolean>(false);
    const [DataMasterActive, setDataMasterActive] = useState<boolean>(false);
    const [ProsesBisnisActive, setProsesBisnisActive] = useState<boolean>(false);
    const [LayananActive, setLayananActive] = useState<boolean>(false);
    const [DataInformasiActive, setDataInformasiActive] = useState<boolean>(false);
    const [AplikasiActive, setAplikasiActive] = useState<boolean>(false);
    const [GapArsiterturActive, setGapArsitekturActive] = useState<boolean>(false);

    useEffect(() => {
      if(url === "/"){
        setDahsboardActive(true),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/User") {
        setDahsboardActive(false),
        setUserActive(true),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/DataMaster") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(true),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/ProsesBisnis" || url === "/ProsesBisnis/TambahData") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(true),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/Layanan") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(true),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/DataInformasi") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(true),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      } else if (url === "/Aplikasi") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(true),
        setGapArsitekturActive(false)
      } else if (url === "/GapArsitektur") {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(true)
      } else {
        setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false)
      }
    },[url]);
    
    return(
      <div className="fixed min-w-[270px] border-r">
        <div className="p-5 border-b border-stone-300">
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
                  <Link className={dahsboardActive ? "text-white" : ""} href="/">
                    <li className={dahsboardActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" :"flex py-1 pl-2 rounded-lg hover:bg-gray-200 "}>
                      {dahsboardActive ? 
                        <Image className="pr-2"
                          src="/iconLight/ChartPieSlice.svg" 
                          alt="ChartPieSlice"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/ChartPieSlice.svg" 
                          alt="ChartPieSlice"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      Dashboard
                    </li>
                  </Link>
                  <Link className={UserActive ? "text-white" : ""}href="/User">
                    <li className={UserActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {UserActive ? 
                        <Image className="pr-2"
                          src="/iconLight/UsersThree.svg" 
                          alt="UsersThree"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/UsersThree.svg" 
                          alt="UsersThree"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      User
                    </li>
                  </Link>
                  <Link className={DataMasterActive ? "text-white" : ""} href="/DataMaster">
                    <li className={DataMasterActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {DataMasterActive ? 
                        <Image className="pr-2"
                          src="/iconLight/BookOpen.svg" 
                          alt="BookOpen"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/BookOpen.svg" 
                          alt="BookOpen"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
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
                  <Link className={ProsesBisnisActive ? "text-white" : ""} href="/ProsesBisnis">
                    <li className={ProsesBisnisActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {ProsesBisnisActive ? 
                        <Image className="pr-2"
                          src="/iconLight/ListChecks.svg" 
                          alt="ListChecks"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/ListChecks.svg" 
                          alt="ListChecks"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      Proses Bisnis
                    </li>
                  </Link>
                  <Link className={LayananActive ? "text-white" : ""} href="/Layanan">
                    <li className={LayananActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {LayananActive ? 
                        <Image className="pr-2"
                          src="/iconLight/ListDashes.svg" 
                          alt="ListDashes"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/ListDashes.svg" 
                          alt="ListDashes"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      Layanan
                    </li>
                  </Link>
                  <Link className={DataInformasiActive ? "text-white" : ""} href="/DataInformasi">
                    <li className={DataInformasiActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {DataInformasiActive ? 
                        <Image className="pr-2"
                          src="/iconLight/Notebook.svg" 
                          alt="Notebook"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/Notebook.svg" 
                          alt="Notebook"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      Data dan Informasi
                    </li>
                  </Link>
                  <Link className={AplikasiActive ? "text-white" : ""} href="/Aplikasi">
                    <li className={AplikasiActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                      {AplikasiActive ? 
                        <Image className="pr-2"
                          src="/iconLight/ChatsTeardrop.svg" 
                          alt="ChatsTeardrop"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/ChatsTeardrop.svg" 
                          alt="ChatsTeardrop"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
                      Aplikasi
                    </li>
                  </Link>
                  <Link className={GapArsiterturActive ? "text-white" : ""} href="/GapArsitektur">
                    <li className={GapArsiterturActive ? "bg-emerald-300 flex py-1 pl-2 rounded-lg" : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"}>
                     {GapArsiterturActive ? 
                        <Image className="pr-2"
                          src="/iconLight/ChatsTearDrop.svg" 
                          alt="ChatsTearDrop"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      : 
                        <Image className="pr-2"
                          src="/iconDark/ChatsTearDrop.svg" 
                          alt="ChatsTearDrop"
                          layout="fixed"
                          width={30}
                          height={30}
                        />
                      }
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