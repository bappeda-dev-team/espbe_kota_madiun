"use client";

import { usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTahun } from "@/store/TahunSlicer";
import { setOpd } from "@/store/OpdSlicer";
import { getToken, getUser } from "@/app/Login/Auth/Auth";
import Select from "react-select"

interface OptionTypeString {
  value: string;
  label: string;
}

function Header() {
  const { id, Id } = useParams();
  const [textPath, setTextPath] = useState<string>();
  const url = usePathname();
  const [valueTahun, setValueTahun] = useState<number | string>("");
  const [selectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);
  const [opdOption, setOpdOption] = useState<OptionTypeString[]>([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  }, []);

  const TahunOptions = [
    { value: 0, label: 'Semua Tahun' },
    { value: 2019, label: 'tahun 2019' },
    { value: 2020, label: 'tahun 2020' },
    { value: 2021, label: 'tahun 2021' },
    { value: 2022, label: 'tahun 2022' },
    { value: 2023, label: 'tahun 2023' },
    { value: 2024, label: 'tahun 2024' },
    { value: 2025, label: 'tahun 2025' },
    { value: 2026, label: 'tahun 2026' },
    { value: 2027, label: 'tahun 2027' },
    { value: 2028, label: 'tahun 2028' },
    { value: 2029, label: 'tahun 2029' },
    { value: 2030, label: 'tahun 2030' },
  ];

  const semuaOPD = { value: 'all_opd', label: 'Semua OPD' };

  const fetchOPD = async() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try{ 
      const response = await fetch(`${API_URL}/v1/opd`,{
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok){
        throw new Error('cant fetch data opd');
      }
      const data = await response.json();
      const opd = data.data.map((item: any) => ({
        value : item.kode_opd,
        label : item.nama_opd,
      }));
      setOpdOption([semuaOPD, ...opd]);
    } catch (err){
      console.log('gagal mendapatkan data opd dengan admin kota');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (
        url === "/" || 
        url === "/User" || 
        url === "/DataMaster" ||
        url === "/PohonKinerja" ||
        url === "/ReferensiArsitektur" ||
        url === "/SasaranKota" ||
        url === "/BidangUrusan" 
      ) {
      setTextPath("Kota");
    } else if (
      url === "/ProsesBisnis" ||
      url === "/ProsesBisnis/TambahData" ||
      url === `/ProsesBisnis/EditData/${id}` ||
      url === "/Layanan/StandartPelayanan" ||
      url === "/Layanan/LayananSPBE" ||
      url === "/Layanan/LayananSPBE/TambahData" ||
      url === `/Layanan/LayananSPBE/EditData/${Id}` ||
      url === "/DataInformasi" ||
      url === "/DataInformasi/TambahData" ||
      url === `/DataInformasi/EditData/${Id}` ||
      url === "/Aplikasi" ||
      url === "/Aplikasi/TambahData" ||
      url === `/Aplikasi/EditData/${Id}` ||
      url === "/GapArsitektur" ||
      url === "/Arsitektur" ||
      url === "/KebutuhanSPBE" ||
      url === "/KebutuhanSPBE/TambahKebutuhan" ||
      url === `/KebutuhanSPBE/EditKebutuhan/${id}` ||
      url === "/PemenuhanKebutuhan" ||
      url === "/SdmInfrastruktur" ||
      url === "/PetaRencana"
    ) {
      setTextPath("Arsitekur SPBE");
    } else {
      setTextPath("-");
    }
  }, [url, id, Id]);

  const handlerTahun = (selectedOption: { value: number | string }) => {
    const tahun = selectedOption.value === "" ? "" : Number(selectedOption.value);
    setValueTahun(tahun);
    if (tahun !== "") {
      dispatch(setTahun(tahun));
    }
  };

  const handlerOpd = (selectedOption: OptionTypeString | null) => {
    setSelectedOpd(selectedOption);
    if (selectedOption) {
      dispatch(setOpd({ value: selectedOption.value, label: selectedOption.label }));
    }
  };

  return (
    <>
      <div className="flex items-center border-b h-[77px] border-stone-300 top-0 z-10">
        <div className="flex justify-between items-center flex-row w-screen p-5">
          <div className="text-page flex flex-row">
            <h1 className="text-stone-300">{textPath}</h1>
            <h1 className="text-stone-300 ml-1">{url}</h1>
          </div>
          <div className="flex">
            {user?.roles == "admin_kota" && 
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'rgb(255 255 255' : 'rgb(255 255 255',
                    textColor: 'rgb(255 255 255'
                  }),
                }}
                placeholder="Semua OPD"
                options={opdOption}
                onChange={(selectedOption) => handlerOpd(selectedOption)}
                isLoading={isLoading}
                defaultValue={semuaOPD}
                isSearchable
                onMenuOpen={() => {fetchOPD()}}
                onMenuClose={() => {setOpdOption([])}}
              />
            }
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'rgb(255 255 255' : 'rgb(255 255 255',
                  textColor: 'rgb(255 255 255'
                }),
              }}
              options={TahunOptions}
              onChange={(selectedOption) => handlerTahun(selectedOption as { value: number | string })}
              defaultValue={TahunOptions[0]}
              classNamePrefix="select"
            />
            <button className="rounded-lg p-3 border border-emerald-500 text-emerald-500 font-bold text-sm hover:bg-emerald-500 hover:text-white">
              {/* ambil di local storage ketika sudah login */}
              {user?.roles == "admin_kota" && <p>Admin Kota</p>}
              {user?.roles == "admin_opd" && <p>Admin OPD</p>}
              {user?.roles == "asn" && <p>ASN</p>}
            </button>
          </div>
          {/* <input type="text" className="bg-stone-300 rounded-lg px-5" placeholder="Search"/> */}
        </div>
      </div>
    </>
  );
}

export default Header;
