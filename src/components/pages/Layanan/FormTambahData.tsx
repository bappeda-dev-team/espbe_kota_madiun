"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";

interface OptionType {
  value: number;
  label: string;
  kode?: string;
}
interface OptionTypeString {
  value: string;
  label: string;
}

interface FormValues {
  nama_layanan: string;
  tujuan_layanan_id: OptionType | null;
  fungsi_layanan: string;
  tahun: OptionType | null;
  kode_opd: string;
  kementrian_terkait: string;
  metode_layanan: OptionTypeString | null;
  ral_level_1_id: OptionType | null;
  ral_level_2_id: OptionType | null;
  ral_level_3_id: OptionType | null;
  ral_level_4_id: OptionType | null;
  strategic_id: OptionType | null;
  tactical_id: OptionType | null;
  operational_id: OptionType | null;
}

const FormTambahData = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const token = getToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedTujuanLayanan, setSelectedTujuanLayanan] = useState<OptionType | null>(null);
  const [selectedRaL1, setSelectedRal1] = useState<OptionType | null>(null);
  const [selectedRaL2, setSelectedRal2] = useState<OptionType | null>(null);
  const [selectedRaL3, setSelectedRal3] = useState<OptionType | null>(null);
  const [selectedRaL4, setSelectedRal4] = useState<OptionType | null>(null);
  const [selectedRaLStrategic, setSelectedRalStrategic] = useState<OptionType | null>(null);
  const [selectedRaLTactical, setSelectedRalTactical] = useState<OptionType | null>(null);
  const [selectedRaLOperational, setSelectedRalOperational] = useState<OptionType | null>(null);

  const [ral_level_1_4_option, set_ral_level_1_4_option] = useState<OptionType[]>([]);
  const [pokin_option, set_Pokin_option] = useState<OptionType[]>([]);
  const [ral_level_6_7_option, set_ral_level_6_7_option] = useState<OptionType[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
    const data = getOpdTahun ();
    if(data.opd){
      const dataOpd = {
        value: data.opd.value,
        label: data.opd.label
      }
      setSelectedOpd(dataOpd);
    }
  }, []);

  const tahunOption: OptionType[] = [
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
  ];

  const MetodeLayanan: OptionTypeString[] = [
    {value: "Elektronik", label: "Elektronik"},
    {value: "Non Elektronik", label: "Non Elektronik"}
  ]

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nama_layanan: "",
      tujuan_layanan_id: null,
      fungsi_layanan: "",
      tahun: null,
      kode_opd: user?.roles == 'admin_kota' ? SelectedOpd?.value : user?.kode_opd,
      kementrian_terkait: "",
      metode_layanan: null,
      ral_level_1_id: null,
      ral_level_2_id: null,
      ral_level_3_id: null,
      ral_level_4_id: null,
      strategic_id: null,
      tactical_id: null,
      operational_id: null,
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchRalLevel1_4 = async (level: number, value?: string) => {
    setIsLoading(true);
    try {
      const url = value ? `${API_URL}/v1/referensiarsitektur/${value}` : `${API_URL}/v1/referensiarsitektur`
      const response = await fetch(url, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const filteredData = data.data.filter(
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "Layanan",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
        kode: referensi.kode_referensi,
      }));
      set_ral_level_1_4_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAL Level 1 - 4");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokinDefault = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja?kode_opd=${SelectedOpd?.value}`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const filteredData = data.data.filter(
        (pohon: any) => pohon.level_pohon === level,
      );
      const result = filteredData.map((pohon: any) => ({
        value: pohon.id,
        label: pohon.nama_pohon,
      }));
      set_Pokin_option(result);
    } catch (err) {
      console.log("gagal memuat data option Strategic");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRalLevel6_7 = async (jenis: string, value: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerjahirarki/${value}`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const result = data.data[jenis].map((pohon: any) => ({
        value: pohon.id,
        label: pohon.nama_pohon,
      }));
      set_ral_level_6_7_option(result);
    } catch (err) {
      console.log("gagal memuat data option RAL Level 6 - 7");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
      nama_layanan: data.nama_layanan,
      tujuan_layanan_id: data.tactical_id?.value,
      fungsi_layanan: data.fungsi_layanan,
      tahun: data.tahun?.value,
      kode_opd: user?.roles == 'admin_kota' ? SelectedOpd?.value : user?.kode_opd,
      kementrian_terkait: data.kementrian_terkait,
      metode_layanan: data.metode_layanan?.value,
      ral_level_1_id: data.ral_level_1_id?.value,
      ral_level_2_id: data.ral_level_2_id?.value,
      ral_level_3_id: data.ral_level_3_id?.value,
      ral_level_4_id: data.ral_level_4_id?.value,
      strategic_id: data.strategic_id?.value,
      tactical_id: data.tactical_id?.value,
      operational_id: data.operational_id?.value,
    };
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd?.value == (undefined || null) || SelectedOpd?.value == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
      } else {
        // console.log(formData);
        try{
          const response = await fetch(`${API_URL}/v1/createlayananspbe`, {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
          });
          if(response.ok){
            AlertNotification("Berhasil", "Berhasil menambahkan data layanan", "success", 1000);
            router.push("/Layanan/LayananSPBE")
          } else {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
          }
        } catch(err){
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      }
    } else {
      // console.log(formData);
      try{
        const response = await fetch(`${API_URL}/v1/createlayananspbe`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
        });
        if(response.ok){
          AlertNotification("Berhasil", "Berhasil menambahkan data layanan", "success", 1000);
          router.push("/Layanan/LayananSPBE")
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } catch(err){
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    }
  };

  return (
    <div className="border p-5 rounded-xl shadow-xl">
      <h1 className="uppercase font-bold">Form tambah data Layanan SPBE</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="nama_layanan"
          >
            Nama Layanan:
          </label>
          <Controller
            name="nama_layanan"
            control={control}
            rules={{ required: "Nama Layanan Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="nama_layanan"
                  placeholder="masukkan nama Layanan"
                />
                {errors.nama_layanan ? 
                  <h1 className="text-red-500">
                    {errors.nama_layanan.message}
                  </h1>
                :
                  <h1 className="text-slate-300 text-xs">*Nama Layanan Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="fungsi_layanan"
          >
            Fungsi Layanan:
          </label>
          <Controller
            name="fungsi_layanan"
            control={control}
            rules={{required: "Fungsi Layanan harus tersisi"}}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="fungsi_layanan"
                  placeholder="masukkan Fungsi Layanan"
                  />
                  {errors.fungsi_layanan ?
                    <h1 className="text-red-500">
                      {errors.fungsi_layanan.message}
                    </h1>
                    :
                    <h1 className="text-slate-300 text-xs">*Fungsi Layanan Harus Terisi</h1>
                  }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="kementrian_terkait"
          >
            Kementrian Terkait:
          </label>
          <Controller
            name="kementrian_terkait"
            control={control}
            rules={{required : "Kementrian Terkait Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="kementrian_terkait"
                  placeholder="masukkan Kementrian Terkait"
                />
                {errors.kementrian_terkait ?
                  <h1 className="text-red-500">
                    {errors.kementrian_terkait.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Kementrian Terkait Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>

        {isClient && (
          <>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="metode_layanan"
              >
                Metode Layanan:
              </label>
              <Controller
                name="metode_layanan"
                control={control}
                rules={{required: "Metode Layanan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Pilih Metode Layanan"
                      options={MetodeLayanan}
                      isSearchable
                      isClearable
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.metode_layanan ?
                      <h1 className="text-red-500">
                        {errors.metode_layanan.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Metode Layanan Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tujuan_layanan_id">Tujuan Layanan:</label>
              <Controller
                name="tujuan_layanan_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Tujuan Layanan sama dengan Tactical"
                      options={pokin_option}
                      value={selectedTujuanLayanan}
                      isDisabled
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun:</label>
              <Controller
                name="tahun"
                control={control}
                rules={{ required: "Tahun Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={tahunOption}
                      isSearchable
                      isClearable
                      placeholder="Pilih Tahun"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.tahun ?
                      <h1 className="text-red-500">
                        {errors.tahun.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Tahun Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="ral_level_1_id"
              >
                RAL Level 1:
              </label>
              <Controller
                name="ral_level_1_id"
                control={control}
                rules={{required: "RAL Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 1"
                      value={selectedRaL1}
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (ral_level_1_4_option.length === 0) {
                          fetchRalLevel1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRal1(option);
                        setSelectedRal2(null);
                        setSelectedRal3(null);
                        setSelectedRal4(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.ral_level_1_id ?
                      <h1 className="text-red-500">
                        {errors.ral_level_1_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAL Level 1 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="ral_level_2_id"
              >
                RAL Level 2:
              </label>
              <Controller
                name="ral_level_2_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 2"
                      value={selectedRaL2}
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      isDisabled={!selectedRaL1}
                      onMenuOpen={() => {
                        if (selectedRaL1?.kode) {
                          fetchRalLevel1_4(2, selectedRaL1.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRal2(option);
                        setSelectedRal3(null);
                        setSelectedRal4(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="ral_level_3_id"
              >
                RAL Level 3:
              </label>
              <Controller
                name="ral_level_3_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 3"
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      value={selectedRaL3}
                      isSearchable
                      isClearable
                      isDisabled={!selectedRaL2}
                      onMenuOpen={() => {
                        if (selectedRaL2?.kode) {
                          fetchRalLevel1_4(3, selectedRaL2.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRal3(option);
                        setSelectedRal4(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="ral_level_4_id"
              >
                RAL Level 4:
              </label>
              <Controller
                name="ral_level_4_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 4"
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      value={selectedRaL4}
                      isSearchable
                      isClearable
                      isDisabled={!selectedRaL3}
                      onMenuOpen={() => {
                        if (selectedRaL3?.kode) {
                          fetchRalLevel1_4(4, selectedRaL3.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRal4(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="strategic_id"
              >
                Strategic:
              </label>
              <Controller
                name="strategic_id"
                control={control}
                rules={{required: "Strategic Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Strategic"
                      value={selectedRaLStrategic}
                      options={pokin_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (pokin_option.length === 0) {
                          fetchPokinDefault(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_Pokin_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRalStrategic(option);
                        setSelectedRalTactical(null);
                        setSelectedRalOperational(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.strategic_id ?
                      <h1 className="text-red-500">
                        {errors.strategic_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Strategic Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="tactical_id"
              >
                Tactical:
              </label>
              <Controller
                name="tactical_id"
                control={control}
                rules={{required: "Tactical Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Tactical"
                      value={selectedRaLTactical}
                      options={ral_level_6_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      isDisabled={!selectedRaLStrategic}
                      onMenuOpen={() => {
                        if (selectedRaLStrategic?.value) {
                          fetchRalLevel6_7("tactical", selectedRaLStrategic.value);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_6_7_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRalTactical(option);
                        setSelectedRalOperational(null);
                        setSelectedTujuanLayanan(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.tactical_id ?
                      <h1 className="text-red-500">
                        {errors.tactical_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Tactical Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="operational_id"
              >
                Operational:
              </label>
              <Controller
                name="operational_id"
                control={control}
                rules={{required: "Operational Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Operational"
                      value={selectedRaLOperational}
                      options={ral_level_6_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      isDisabled={!selectedRaLTactical}
                      onMenuOpen={() => {
                        if (selectedRaLTactical?.value) {
                          fetchRalLevel6_7("operational", selectedRaLTactical.value);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_6_7_option([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRalOperational(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.operational_id ?
                      <h1 className="text-red-500">
                        {errors.operational_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Operational Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
          </>
        )}
        <ButtonSc typee="submit" className="mt-5">
          Simpan
        </ButtonSc>
        <ButtonTr typee="button" className="mt-5" halaman_url="/Layanan/LayananSPBE">
          Batal
        </ButtonTr>
      </form>
    </div>
  );
};

export default FormTambahData;
