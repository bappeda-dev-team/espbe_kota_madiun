"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";

function Sidebar() {
  const url = usePathname();
  const { id, Id } = useParams();
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
  const [ArsiterturActive, setArsitekturActive] = useState<boolean>(false);
  const [GapArsiterturActive, setGapArsitekturActive] = useState<boolean>(false);
  const [KebutuhanSPBEActive, setKebutuhanSPBEActive] = useState<boolean>(false);
  const [SdmInfrastrukturActive, setSdmInfrastrukturActive] = useState<boolean>(false);
  const [petaRencanaActive, setPetaRencanaActive] = useState<boolean>(false);

  const breakDataMaster = () => {
    if(DataMasterActive === false){
      setDataMasterActive(true);
    } else {
      setDataMasterActive(false);
    }
  }
  
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
        setArsitekturActive(false);
        setKebutuhanSPBEActive(false);
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
        setArsitekturActive(false);
        setSdmInfrastrukturActive(false);
        setKebutuhanSPBEActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/PohonKinerja") {
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
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
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
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
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
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
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
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
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
        setPohonKinerjaActive(false);
        setProsesBisnisActive(true),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/Layanan/LayananSPBE" ||
      url === "/Layanan/LayananSPBE/TambahData" ||
      url === `/Layanan/LayananSPBE/EditData/${Id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(true),
        setStandartPelayananActive(false),
        setFormLayananActive(true),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/Layanan/StandartPelayanan") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(true),
        setStandartPelayananActive(true),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/DataInformasi" ||
      url === "/DataInformasi/TambahData" ||
      url === `/DataInformasi/EditData/${Id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(true),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (
      url === "/Aplikasi" || 
      url === "/Aplikasi/TambahData" ||
      url === `/Aplikasi/EditData/${Id}`
    ) {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(true),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/GapArsitektur") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(true);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/Arsitektur") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(true);
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
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
        setKebutuhanSPBEActive(true);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    } else if (url === "/SdmInfrastruktur") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(true);
      setPetaRencanaActive(false);
    } else if (url === "/PetaRencana") {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(true);
    } else {
      setDahsboardActive(false),
        setUserActive(false),
        setDataMasterActive(false),
        setPohonKinerjaActive(false);
        setProsesBisnisActive(false),
        setLayananActive(false),
        setStandartPelayananActive(false),
        setFormLayananActive(false),
        setDataInformasiActive(false),
        setAplikasiActive(false),
        setGapArsitekturActive(false);
        setArsitekturActive(false);
         setKebutuhanSPBEActive(false);
        setSdmInfrastrukturActive(false);
      setPetaRencanaActive(false);
    }
  }, [url, id]);

  return (
    <div className="fixed min-w-[270px] border-r h-screen overflow-scroll">
      <div className="p-5 border-b border-stone-300">
        <div className="flex items-center pb-2">
          <div className="flex justify-center items-center bg-white rounded-full">
            <Image
              className="w-7 h-7 rounded-full"
              src="/avatar.png"
              alt="avatar"
              width={30}
              height={30}
            />
          </div>
          <h1 className="ml-3">BAPPEDA</h1>
        </div>
      </div>

      <div className="p-5 overflow-y-auto border-b border-stone-300">
        <div className="flex flex-col items-center text-center">
          <Image
            className="pr-2"
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
          <h1>E-SPBE-Kota Madiun</h1>
        </div>
      </div>

      <div className="p-5 overflow-y-auto border-b border-stone-300">
        <div className="text-base">
          <p className="text-slate-300 text-xs">Kota</p>
          <ul>
            <Link className={dahsboardActive ? "text-white" : ""} href="/">
              <li
                className={
                  dahsboardActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 "
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
                Dashboard
              </li>
            </Link>
            <Link className={UserActive ? "text-white" : ""} href="/User">
              <li
                className={
                  UserActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                User
              </li>
            </Link>
            <li
              onClick={breakDataMaster}
              className={
                DataMasterActive
                  ? "flex py-1 pl-2 cursor-pointer rounded-lg bg-gray-200"
                  : "flex py-1 pl-2 cursor-pointer rounded-lg hover:bg-gray-200"
              }
            >
              <Image
                className="pr-2"
                src="/iconDark/BookOpen.svg"
                alt="ChatsTeardrop"
                width={30}
                height={30}
              />
              Data Master
            </li>
            {DataMasterActive ? (
              <div className="py-1 pl-3 bg-slate-50">
                <Link href="/PohonKinerja">
                  <li
                    className={
                      pohonKinerjaActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {pohonKinerjaActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/data.svg"
                        alt="Data"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/data.svg"
                        alt="Data"
                        width={30}
                        height={30}
                      />
                    )}
                    Pohon Kinerja
                  </li>
                </Link>
                <Link href="/ReferensiArsitektur">
                  <li
                    className={
                      referensiArsitekturActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {referensiArsitekturActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/wallet.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/wallet.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    )}
                    Referensi Arsitektur
                  </li>
                </Link>
                <Link href="SasaranKota">
                  <li
                    className={
                      sasaranKotaActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {sasaranKotaActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/lifebuoy.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/lifebuoy.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    )}
                    Sasaran Kota
                  </li>
                </Link>
                <Link href="/BidangUrusan">
                  <li
                    className={
                      bidangUrusanActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {bidangUrusanActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/book.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/book.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    )}
                    Bidang Urusan
                  </li>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>

      <div className="p-5 overflow-y-auto border-b border-stone-300">
        <div className="text-base">
          <p className="text-slate-300 text-xs">Arsitektur SPBE</p>
          <ul>
            <Link
              className={ProsesBisnisActive ? "text-white" : ""}
              href="/ProsesBisnis"
            >
              <li
                className={
                  ProsesBisnisActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Proses Bisnis
              </li>
            </Link>

            <li
              onClick={breakLayanan}
              className={
                LayananActive
                  ? "flex py-1 pl-2 cursor-pointer rounded-lg bg-gray-200"
                  : "flex py-1 pl-2 cursor-pointer rounded-lg hover:bg-gray-200"
              }
            >
              <Image
                className="pr-2"
                src="/iconDark/ChatsTeardrop.svg"
                alt="ChatsTeardrop"
                width={30}
                height={30}
              />
              Layanan
            </li>

            {LayananActive ? (
              <div className="py-1 pl-3 bg-slate-50">
                <Link href="/Layanan/StandartPelayanan">
                  <li
                    className={
                      standartPelayananActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {standartPelayananActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/Dot2.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/Dot2.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    )}
                    Standart Pelayanan
                  </li>
                </Link>
                <Link href="/Layanan/LayananSPBE">
                  <li
                    className={
                      formLayananActive
                        ? "flex bg-emerald-300 text-white flex py-1 pl-2 rounded-lg"
                        : "flex py-1 pl-2 rounded-lg hover:bg-gray-200 font-light"
                    }
                  >
                    {formLayananActive ? (
                      <Image
                        className="pr-2"
                        src="/iconLight/Dot2.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <Image
                        className="pr-2"
                        src="/iconDark/Dot2.svg"
                        alt="ListDashes"
                        width={30}
                        height={30}
                      />
                    )}
                    Layanan SPBE
                  </li>
                </Link>
              </div>
            ) : (
              <></>
            )}

            <Link
              className={DataInformasiActive ? "text-white" : ""}
              href="/DataInformasi"
            >
              <li
                className={
                  DataInformasiActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Data dan Informasi
              </li>
            </Link>
            <Link
              className={AplikasiActive ? "text-white" : ""}
              href="/Aplikasi"
            >
              <li
                className={
                  AplikasiActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Aplikasi
              </li>
            </Link>
            <Link
              className={ArsiterturActive ? "text-white" : ""}
              href="/Arsitektur"
            >
              <li
                className={
                  ArsiterturActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
                }
              >
                {ArsiterturActive ? (
                  <Image
                    className="pr-2"
                    src="/iconLight/ListChecks.svg"
                    alt="ListChecks"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    className="pr-2"
                    src="/iconDark/ListChecks.svg"
                    alt="ListChecks"
                    width={30}
                    height={30}
                  />
                )}
                Arsitektur
              </li>
            </Link>
            <Link
              className={GapArsiterturActive ? "text-white" : ""}
              href="/GapArsitektur"
            >
              <li
                className={
                  GapArsiterturActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Gap Arsitektur
              </li>
            </Link>
            <Link
              className={KebutuhanSPBEActive ? "text-white" : ""}
              href="/KebutuhanSPBE"
            >
              <li
                className={
                  KebutuhanSPBEActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Kebutuhan SPBE
              </li>
            </Link>
            <Link
              className={SdmInfrastrukturActive ? "text-white" : ""}
              href="/SdmInfrastruktur"
            >
              <li
                className={
                  SdmInfrastrukturActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                SDM Infrastruktur
              </li>
            </Link>
            <Link
              className={petaRencanaActive ? "text-white" : ""}
              href="/PetaRencana"
            >
              <li
                className={
                  petaRencanaActive
                    ? "bg-emerald-300 flex py-1 pl-2 rounded-lg"
                    : "flex py-1 pl-2 rounded-lg hover:bg-gray-200"
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
                Peta Rencana
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
