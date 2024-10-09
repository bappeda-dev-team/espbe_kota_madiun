"use client";

import { usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOpd } from "@/store/OpdSlicer";
import { getToken, getUser, getOpdTahun } from "@/app/Login/Auth/Auth";
import Select from "react-select"
import { ButtonHeader } from "@/components/common/Button/Button";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface OptionTypeString {
  value: string;
  label: string;
}
interface OptionType {
  value: number;
  label: string;
}
// Fungsi untuk menyimpan nilai ke cookies
const setCookie = (name: string, value: any) => {
  document.cookie = `${name}=${value}; path=/;`;
};

function Header() {
  const { id, Id } = useParams();
  const [textPath, setTextPath] = useState<string>();
  const url = usePathname();
  const [valueTahun, setValueTahun] = useState<OptionType | null>(null);
  const [valueOpd, setValueOpd] = useState<OptionTypeString | null>(null);
  const [selectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);
  const [opdOption, setOpdOption] = useState<OptionTypeString[]>([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = getToken();

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
    const data = getOpdTahun();
    if(data){
      if(data.tahun){
        const tahun_value = {
          value: data.tahun.value,
          label: data.tahun.label
        }
        setValueTahun(tahun_value);
      }
      if(data.opd){
        const opd_value = {
          value: data.opd.value,
          label: data.opd.label
        }
        setValueOpd(opd_value);
      }
    }
  }, []);

  const TahunOptions = [
    { value: 0, label: 'Semua Tahun' },
    { value: 2020, label: 'Tahun 2020' },
    { value: 2021, label: 'Tahun 2021' },
    { value: 2022, label: 'Tahun 2022' },
    { value: 2023, label: 'Tahun 2023' },
    { value: 2024, label: 'Tahun 2024' },
    { value: 2025, label: 'Tahun 2025' },
    { value: 2026, label: 'Tahun 2026' },
    { value: 2027, label: 'Tahun 2027' },
    { value: 2028, label: 'Tahun 2028' },
    { value: 2029, label: 'Tahun 2029' },
    { value: 2030, label: 'Tahun 2030' },
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
      url === `/Layanan/LayananSPBE/FixGapLayananSPBE/${id}` ||
      url === "/DataInformasi" ||
      url === "/DataInformasi/TambahData" ||
      url === `/DataInformasi/EditData/${Id}` ||
      url === `/DataInformasi/FixGapDataInformasi/${id}` ||
      url === "/Aplikasi" ||
      url === "/Aplikasi/TambahData" ||
      url === `/Aplikasi/EditData/${Id}` ||
      url === `/Aplikasi/FixGapAplikasi/${id}` ||
      url === "/GapArsitektur" ||
      url === `/GapArsitektur/TambahKeterangan/${id}` ||
      url === `/GapArsitektur/EditKeterangan/${id}` ||
      url === `/GapArsitektur/EditKeteranganGap/${id}` ||
      url === `/GapArsitektur/TambahKeteranganGap/${id}` ||
      url === "/Arsitektur" ||
      url === "/KebutuhanSPBE" ||
      url === "/KebutuhanSPBE/TambahKebutuhan" ||
      url === `/KebutuhanSPBE/EditKebutuhan/${id}` ||
      url === "/PemenuhanKebutuhan" ||
      url === `/PemenuhanKebutuhan/EditPemenuhan/${id}` ||
      url === `/PemenuhanKebutuhan/TambahPemenuhan/${id}` ||
      url === "/SdmInfrastruktur" ||
      url === "/PetaRencana"
    ) {
      setTextPath("Arsitekur SPBE");
    } else {
      setTextPath("-");
    }
  }, [url, id, Id]);

  // Fungsi untuk menangani perubahan dropdown
  const handleYearChange = (selectedOption: { value: number, label: string } | null) => {
    if (selectedOption) {
      const year = {label : selectedOption.label, value: selectedOption.value};
      setCookie('tahun', JSON.stringify(year)); // Simpan value dan label ke cookies
      AlertNotification("Tahun Berhasil Diubah", "", "success", 1000, false);
      setTimeout(() => {
        window.location.reload();
      }, 1000); //reload halaman dengan delay 1 detik
    }
  };
  const handleSelectedOpd = (selectedOption: { value: string, label: string } | null) => {
    if (selectedOption) {
      const Opd = {label : selectedOption.label, value: selectedOption.value};
      setCookie('SelectedOpd', JSON.stringify(Opd)); // Simpan value dan label ke cookies
      AlertNotification("Opd Berhasil Diubah", "", "success", 1000, false);
      setTimeout(() => {
        window.location.reload();
      }, 1000); //reload halaman dengan delay 1 detik
    }
  };

  const handlerOpd = (selectedOption: OptionTypeString | null) => {
    setSelectedOpd(selectedOption);
    if (selectedOption) {
      dispatch(setOpd({ value: selectedOption.value, label: selectedOption.label }));
    } else {
      dispatch(setOpd({ value: "", label: "" }));
    }
  };

  return (
    <>
      <div className="flex items-center border-b  border-stone-300 top-0 z-10">
        <div className="flex gap-2 justify-between items-center flex-row w-screen p-5">
          <div className="text-page flex flex-row">
            <h1 className="text-stone-300">{textPath}</h1>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {user?.roles == "admin_kota" && 
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '8px',
                    marginLeft: '4px',
                    marginRight: '4px',
                    minWidth: '157.562px',
                    maxWidth: '200px',
                  })
                }}
                placeholder="Pilih OPD"
                value={valueOpd}
                options={opdOption}
                onChange={(selectedOption) => handleSelectedOpd(selectedOption)}
                isLoading={isLoading}
                // defaultValue={semuaOPD}
                isSearchable
                onMenuOpen={() => {fetchOPD()}}
                onMenuClose={() => {setOpdOption([])}}
              />
            }
            <Select
              id="tahun"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: '8px',
                  marginLeft: '4px',
                  marginRight: '4px',
                  minWidth: '157.562px',
                  maxWidth: '200px'
                })
              }}
              options={TahunOptions}
              onChange={(option) => handleYearChange(option)}
              value={valueTahun}
              placeholder="Pilih Tahun"
              classNamePrefix="select"
            />
            <ButtonHeader className="rounded-lg px-3 py-2 border ml-1 border-emerald-500 text-emerald-500 font-bold text-sm hover:bg-emerald-500 hover:text-white">
              {/* ambil di local storage ketika sudah login */}
              {user?.roles == "admin_kota" && <p>Admin Kota</p>}
              {user?.roles == "admin_opd" && <p>Admin OPD</p>}
              {user?.roles == "asn" && <p>ASN</p>}
              {user?.roles == undefined && <p>Loading</p>}
            </ButtonHeader>
          </div>
          {/* <input type="text" className="bg-stone-300 rounded-lg px-5" placeholder="Search"/> */}
        </div>
      </div>
    </>
  );
}

export default Header;
