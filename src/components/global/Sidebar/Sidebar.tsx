"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { logout } from "@/app/Login/Auth/Auth";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ButtonTr, ButtonSc } from "@/components/common/Button/Button";
import "@/app/globals.css";
import { getUser } from "@/app/Login/Auth/Auth";

interface SidebarProps {
  isCollapse: boolean;
  toggleCollapse: () => void;
}

function Sidebar({ isCollapse, toggleCollapse }: SidebarProps) {
  const url = usePathname();
  const { id, Id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dahsboardActive, setDahsboardActive] = useState<boolean>(false);
  const [UserActive, setUserActive] = useState<boolean>(false);
  const [DataMasterActive, setDataMasterActive] = useState<boolean>(false);
  const [pohonKinerjaActive, setPohonKinerjaActive] = useState<boolean>(false);
  const [referensiArsitekturActive, setReferensiArsitekturActive] = useState<boolean>(false);
  const [sasaranKotaActive, setSasaranKotaActive] = useState<boolean>(false);
  const [bidangUrusanActive, setBidangUrusanActive] = useState<boolean>(false);

  const [ProsesBisnisActive, setProsesBisnisActive] = useState<boolean>(false);
  const [LayananActive, setLayananActive] = useState<boolean>(false);
  const [standartPelayananActive, setStandartPelayananActive] = useState<boolean>(false);
  const [formLayananActive, setFormLayananActive] = useState<boolean>(false);
  const [DataInformasiActive, setDataInformasiActive] = useState<boolean>(false);
  const [AplikasiActive, setAplikasiActive] = useState<boolean>(false);
  const [GapArsiterturActive, setGapArsitekturActive] = useState<boolean>(false);
  const [KebutuhanSPBEActive, setKebutuhanSPBEActive] = useState<boolean>(false);
  const [PemenuhanKebutuhanActive, setPemenuhanKebutuhanActive] = useState<boolean>(false);
  const [SdmInfrastrukturActive, setSdmInfrastrukturActive] = useState<boolean>(false);
  const [petaRencanaActive, setPetaRencanaActive] = useState<boolean>(false);

  const breakDataMaster = () => {
    if(DataMasterActive === false){
      setDataMasterActive(true);
    } else {
      setDataMasterActive(false);
    }
  }

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  }, []);
  
  const breakLayanan = () => {
    if (LayananActive === false) {
      setLayananActive(true);
    } else {
      setLayananActive(false);
    }
  };

  useEffect(() => {
    if (url === "/") {
      setDahsboardActive(true),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setKebutuhanSPBEActive(false);
        setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/User") {
      setDahsboardActive(false),
        setUserActive(true),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setSdmInfrastrukturActive(false);
        setKebutuhanSPBEActive(false);
        setPemenuhanKebutuhanActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/PohonKinerja") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(true),
        setPohonKinerjaActive(true),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/ReferensiArsitektur") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(true),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(true),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/SasaranKota") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(true),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(true),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/BidangUrusan") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(true),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(true),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/ProsesBisnis" ||
      url === "/ProsesBisnis/TambahData" ||
      url === `/ProsesBisnis/EditData/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(true),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/Layanan/LayananSPBE" ||
      url === "/Layanan/LayananSPBE/TambahData" ||
      url === `/Layanan/LayananSPBE/EditData/${Id}` ||
      url === `/Layanan/LayananSPBE/FixGapLayananSPBE/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(true),
        setStandartPelayananActive(false),
        setFormLayananActive(true),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/Layanan/StandartPelayanan") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(true),
        setStandartPelayananActive(true),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/DataInformasi" ||
      url === "/DataInformasi/TambahData" ||
      url === `/DataInformasi/EditData/${Id}` ||
      url === `/DataInformasi/FixGapDataInformasi/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(true),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/Aplikasi" || 
      url === "/Aplikasi/TambahData" ||
      url === `/Aplikasi/EditData/${Id}` ||
      url === `/Aplikasi/FixGapAplikasi/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(true),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/GapArsitektur" ||
      url === `/GapArsitektur/TambahKeterangan/${id}` ||
      url === `/GapArsitektur/EditKeterangan/${id}` 
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(true);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/KebutuhanSPBE" ||
      url === "/KebutuhanSPBE/TambahKebutuhan" ||
      url === `/KebutuhanSPBE/EditKebutuhan/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setKebutuhanSPBEActive(true);
        setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/PemenuhanKebutuhan" ||
      url === `/PemenuhanKebutuhan/EditPemenuhan/${id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setKebutuhanSPBEActive(false);
        setPemenuhanKebutuhanActive(true);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/SdmInfrastruktur") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(true);
      setPetaRencanaActive(false);
    } else if (url === "/PetaRencana") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(true);
    } else {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false),
        setReferensiArsitekturActive(false),
        setSasaranKotaActive(false),
        setBidangUrusanActive(false),
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
         setKebutuhanSPBEActive(false);
         setPemenuhanKebutuhanActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    }
  }, [url, id, Id]);

  return (
    <div className={`fixed custom-scrollbar items-center border-r overflow-y-auto flex-col h-screen transition-all duration-300 ${isCollapse ? 'min-w-20' : 'min-w-[270px]'}`}>
      <div className={`flex items-center mt-2 transition-all duration-300 ease-in-out text-center ${isCollapse ? 'justify-center mr-1' : 'absolute ml-[200px]'}`}>
          <ButtonSc 
            onClick={() => toggleCollapse()} 
            className="'py-3 m-1 rounded-lg">
            <Image
            className="mr-1"
              src="/iconLight/menu.svg"
              alt="ChartPieSlice"
              width={15}
              height={15}
            />
          </ButtonSc>
      </div>

       
        <div className="p-5 border-b border-stone-300">
          <div className="flex flex-col items-center text-center">
            <Image
              className="pr-2 transition-all duration-300 ease-in-out"
              src="/logo.png"
              alt="Logo"
              width={!isCollapse ? 80 : 40}
              height={!isCollapse ? 80 : 40}
            />
            {!isCollapse ? <h1>E-SPBE-Kota Madiun</h1> : <></>}
          </div>
        </div>

      <div className="p-5 border-b border-stone-300">
        <div className="text-base">
          {isCollapse ?  <></> : <p className="text-slate-300 text-xs">Kota</p>}
          <ul>
            <Link className={dahsboardActive ? "text-white" : ""} href="/">
              <li
                className={
                  dahsboardActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200 "
                }
              >
                {dahsboardActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/ChartPieSlice.svg"
                    alt="ChartPieSlice"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/ChartPieSlice.svg"
                    alt="ChartPieSlice"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Dashboard"}
              </li>
            </Link>
            <Link className={UserActive ? "text-white" : ""} href="/User">
              <li
                className={
                  UserActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {UserActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/UsersThree.svg"
                    alt="UsersThree"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/UsersThree.svg"
                    alt="UsersThree"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "User"}
              </li>
            </Link>
            {user?.roles != "asn" &&
            <>
              <li
                onClick={breakDataMaster}
                className={`flex py-1 pl-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                  DataMasterActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
              >
                <Image
                  className="pr-2"
                  src="/iconDark/BookOpen.svg"
                  alt="ChatsTeardrop"
                  width={30}
                  height={30}
                />
                {isCollapse ? "" : "Data Master"}
              </li>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  DataMasterActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className={`${isCollapse ? 'bg-slate-100' : 'bg-slate-50 pl-3'} py-1`}>
                  <Link href="/PohonKinerja">
                    <li
                      className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                        pohonKinerjaActive
                          ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                          : "hover:bg-gray-200 font-light"
                      }`}
                    >
                      <Image
                        className="pr-2"
                        src={pohonKinerjaActive ? "/iconLight/data.svg" : "/iconDark/data.svg"}
                        alt="Data"
                        width={30}
                        height={30}
                      />
                      {isCollapse ? "" : "Pohon Kinerja"}
                    </li>
                  </Link>
                  <Link href="/ReferensiArsitektur">
                    <li
                      className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                        referensiArsitekturActive
                          ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                          : "hover:bg-gray-200 font-light"
                      }`}
                    >
                      <Image
                        className="pr-2"
                        src={
                          referensiArsitekturActive
                            ? "/iconLight/wallet.svg"
                            : "/iconDark/wallet.svg"
                        }
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                      {isCollapse ? "" : "Referensi Arsitektur"}
                    </li>
                  </Link>
                  <Link href="/SasaranKota">
                    <li
                      className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                        sasaranKotaActive
                          ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                          : "hover:bg-gray-200 font-light"
                      }`}
                    >
                      <Image
                        className="pr-2"
                        src={
                          sasaranKotaActive
                            ? "/iconLight/lifebuoy.svg"
                            : "/iconDark/lifebuoy.svg"
                        }
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                      {isCollapse ? "" : "Sasaran Kota"}
                    </li>
                  </Link>
                  <Link href="/BidangUrusan">
                    <li
                      className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                        bidangUrusanActive
                          ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                          : "hover:bg-gray-200 font-light"
                      }`}
                    >
                      <Image
                        className="pr-2"
                        src={
                          bidangUrusanActive ? "/iconLight/book.svg" : "/iconDark/book.svg"
                        }
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                      {isCollapse ? "" : "Bidang Urusan"}
                    </li>
                  </Link>
                </div>
              </div>
            </>
            }
          </ul>
        </div>
      </div>

      <div className="p-5 border-b border-stone-300">
        <div className="text-base">
          {isCollapse ?  <></> : <p className="text-slate-300 text-xs">Arsitektur SPBE</p>}
          <ul>
            <Link
              className={ProsesBisnisActive ? "text-white" : ""}
              href="/ProsesBisnis"
            >
              <li
                className={
                  ProsesBisnisActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {ProsesBisnisActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/layer.svg"
                    alt="layer"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/layer.svg"
                    alt="layer"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Proses Bisnis"}
              </li>
            </Link>

            <li
              onClick={breakLayanan}
              className={`flex py-1 pl-2 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                LayananActive ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              <Image
                className="pr-2"
                src="/iconDark/ChatsTeardrop.svg"
                alt="ChatsTeardrop"
                width={30}
                height={30}
              />
              {isCollapse ? "" : "Layanan"}
            </li>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                LayananActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-1 pl-3 bg-slate-50">
                <Link href="/Layanan/StandartPelayanan">
                  <li
                    className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                      standartPelayananActive
                        ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                        : "hover:bg-gray-200 font-light"
                    }`}
                  >
                    <Image
                      className="pr-2"
                      src={
                        standartPelayananActive ? "/iconLight/Dot2.svg" : "/iconDark/Dot2.svg"
                      }
                      alt="ListDashes"
                      width={30}
                      height={30}
                    />
                    {isCollapse ? "" : "Standart Pelayanan"}
                  </li>
                </Link>
                <Link href="/Layanan/LayananSPBE">
                  <li
                    className={`flex py-1 pl-2 rounded-lg transition-all duration-300 ease-in-out ${
                      formLayananActive
                        ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] text-white"
                        : "hover:bg-gray-200 font-light"
                    }`}
                  >
                    <Image
                      className="pr-2"
                      src={formLayananActive ? "/iconLight/Dot2.svg" : "/iconDark/Dot2.svg"}
                      alt="ListDashes"
                      width={30}
                      height={30}
                    />
                    {isCollapse ? "" : "Layanan SPBE"}
                  </li>
                </Link>
              </div>
            </div>

            <Link
              className={DataInformasiActive ? "text-white" : ""}
              href="/DataInformasi"
            >
              <li
                className={
                  DataInformasiActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {DataInformasiActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/Notebook.svg"
                    alt="Notebook"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/Notebook.svg"
                    alt="Notebook"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Data dan Informasi"}
              </li>
            </Link>
            <Link
              className={AplikasiActive ? "text-white" : ""}
              href="/Aplikasi"
            >
              <li
                className={
                  AplikasiActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {AplikasiActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/monitor-mobbile.svg"
                    alt="monitor-mobbile"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/monitor-mobbile.svg"
                    alt="monitor-mobbile"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Aplikasi"}
              </li>
            </Link>
            <Link
              className={GapArsiterturActive ? "text-white" : ""}
              href="/GapArsitektur"
            >
              <li
                className={
                  GapArsiterturActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {GapArsiterturActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/ListDashes.svg"
                    alt="ListDashes"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/ListDashes.svg"
                    alt="ListDashes"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Gap Arsitektur"}
              </li>
            </Link>
            <Link
              className={KebutuhanSPBEActive ? "text-white" : ""}
              href="/KebutuhanSPBE"
            >
              <li
                className={
                  KebutuhanSPBEActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {KebutuhanSPBEActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/clipboard-text.svg"
                    alt="clipboard-text"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/clipboard-text.svg"
                    alt="clipboard-text"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Kebutuhan SPBE"}
              </li>
            </Link>
            <Link
              className={PemenuhanKebutuhanActive ? "text-white" : ""}
              href="/PemenuhanKebutuhan"
            >
              <li
                className={
                  PemenuhanKebutuhanActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {PemenuhanKebutuhanActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/clipboard-tick.svg"
                    alt="clipboard-tick"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/clipboard-tick.svg"
                    alt="clipboard-tick"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Pemenuhan Kebutuhan"}
              </li>
            </Link>
            {/* <Link
              className={SdmInfrastrukturActive ? "text-white" : ""}
              href="/SdmInfrastruktur"
            >
              <li
                className={
                  SdmInfrastrukturActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {SdmInfrastrukturActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/tag-user.svg"
                    alt="Calendar"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/tag-user.svg"
                    alt="Calendar"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "SDM Infrastruktur"}
              </li>
            </Link> */}
            <Link
              className={petaRencanaActive ? "text-white" : ""}
              href="/PetaRencana"
            >
              <li
                className={
                  petaRencanaActive
                    ? "bg-gradient-to-r from-[#007F73] to-[#40DA97] flex py-1 pl-2 rounded-lg transition-all duration-300"
                    : "flex py-1 pl-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
                }
              >
                {petaRencanaActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/Calendar.svg"
                    alt="Calendar"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/Calendar.svg"
                    alt="Calendar"
                    width={30}
                    height={30}
                  />
                )}
                {isCollapse ? "" : "Peta Rencana"}
              </li>
            </Link>
          </ul>
        </div>
      </div>
     <div className="p-5">
      <ButtonTr 
          className="w-full"
          onClick={() => logout()}
        >
          {isCollapse ? "" : "Logout"}
        </ButtonTr>
     </div>
    </div>
  );
}

export default Sidebar;
