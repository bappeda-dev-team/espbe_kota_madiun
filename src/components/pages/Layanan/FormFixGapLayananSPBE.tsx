"use client"

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface OptionType {
  value: number;
  label: string;
}
interface OptionTypeString {
  value: string;
  label: string;
}

interface formValue {
  nama_layanan: string;
  tujuan_layanan_id: OptionType | null;
  fungsi_layanan: string;
  tahun: OptionType | null;
  kode_opd: string;
  kementrian_terkait: string;
  metode_layanan: OptionTypeString;
  ral_level_1_id: OptionType | null;
  ral_level_2_id: OptionType | null;
  ral_level_3_id: OptionType | null;
  ral_level_4_id: OptionType | null;
  strategic_id: OptionType | null;
  tactical_id: OptionType | null;
  operational_id: OptionType | null;
}

const FormFixGapLayananSPBE = () => {

  const { id } = useParams();
  const token = getToken();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValue>();
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const [ral_level_1_4_option, set_ral_level_1_4_option] = useState<OptionType[]>([]);
  const [ral_5_7, set_ral_5_7] = useState<OptionType[]>([]);

  //state untuk fetch default value data by id
  const [kode_opd, set_kode_opd] = useState<string>("");

  const [selectedStrategic, setSelectedStrategic] = useState<OptionType | null>(null);
  const [selectedTactical, setSelectedTactical] = useState<OptionType | null>(null);
  const [selectedOperational, setSelectedOperational] = useState<OptionType | null>(null);

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  },[])

  const tahun_option: OptionType[] = [
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

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchingDataId = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/prosesbisnisbyid/${id}`, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        const data = await response.json();
        const result = data.data;
        
        if (result.rab_level_4) {
          const strategicOption = {
            value: result.rab_level_4.id,
            label: result.rab_level_4.nama_pohon,
          };
          setSelectedStrategic(strategicOption);
          reset((prev) => ({ ...prev, strategic_id: strategicOption }));
        }
        if (result.rab_level_5) {
          const tacticalOption = {
            value: result.rab_level_5.id,
            label: result.rab_level_5.nama_pohon,
          };
          setSelectedTactical(tacticalOption);
          reset((prev) => ({ ...prev, tactical_id: tacticalOption }));
        }
        if (result.rab_level_6) {
          const operationalOption = {
            value: result.rab_level_6.id,
            label: result.rab_level_6.nama_pohon,
          };
          setSelectedOperational(operationalOption);
          reset((prev) => ({ ...prev, operational_id: operationalOption }));
        }

      } catch (err) {
        console.log("Gagal fetching data by id");
      }
    };
    fetchingDataId();
    setIsClient(true);
  }, [reset, id, token]);

  //fetching data RAL 1 - 4
  const fetchRalLevel1_4 = async (level: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`, {
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
      }));
      set_ral_level_1_4_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAL Level 1 - 4");
    } finally {
      setIsLoading(false);
    }
  };

  //fetching data RAL 5 - 7
  const fetchRal_5_7 = async (pohon_kinerja: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const filteredData = data.data.filter(
        (pohon: any) => pohon.jenis_pohon === pohon_kinerja,
      );
      const result = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama_pohon,
      }));
      set_ral_5_7(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAL Level 5 - 7", err);
    } finally {
      setIsLoading(false);
    }
  };

  //
  const handleChange = (option: any, actionMeta: any) => {
    if (actionMeta.name === "strategic_id") {
      setSelectedStrategic(option);
    } else if (actionMeta.name === "tactical_id") {
      setSelectedTactical(option);
    } else if (actionMeta.name === "operational_id") {
      setSelectedOperational(option);
    } 
  };

  //aski form di submit
  const onSubmit: SubmitHandler<formValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      nama_layanan: data.nama_layanan,
      tujuan_layanan_id: data.tujuan_layanan_id?.value,
      fungsi_layanan: data.fungsi_layanan,
      tahun: data.tahun?.value,
      kode_opd: user?.roles == 'admin_kota'? SelectedOpd : user?.kode_opd,
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
    try {
      const response = await fetch(`${API_URL}/v1/createlayananspbe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        AlertNotification("Berhasil", "Berhasil tambah data layanan sesuai GAP", "success", 1000);
        router.push("/GapArsitektur")
      } else {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    } catch (error) {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
    }
  };

  return (
    <div className="border p-5 rounded-xl shadow-xl">
      <h1 className="uppercase font-bold">Form Fix GAP Data Layanan SPBE:</h1>
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
            rules={{ required: "Fungsi Layanan Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="fungsi_layanan"
                  placeholder="masukkan Fungsi Layanan"
                />
                {errors.fungsi_layanan? 
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
                rules={{required: "Tujuan Layanan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Pilih Tujuan Layanan"
                      options={ral_5_7}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if(ral_5_7.length === 0){
                          fetchRal_5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_5_7([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.tujuan_layanan_id ?
                      <h1 className="text-red-500">
                        {errors.tujuan_layanan_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Tujuan Layanan Harus Terisi</h1>
                    }
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
                      options={tahun_option}
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
                rules={{required: "RAL Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 2"
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (ral_level_1_4_option.length === 0) {
                          fetchRalLevel1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.ral_level_2_id ?
                      <h1 className="text-red-500">
                        {errors.ral_level_2_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAL Level 2 Harus Terisi</h1>
                    }
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
                rules={{required: "RAL Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 3"
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (ral_level_1_4_option.length === 0) {
                          fetchRalLevel1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.ral_level_3_id ?
                      <h1 className="text-red-500">
                        {errors.ral_level_3_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAL Level 3 Harus Terisi</h1>
                    }
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
                rules={{required: "RAL Level 4 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAL Level 4"
                      options={ral_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (ral_level_1_4_option.length === 0) {
                          fetchRalLevel1_4(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_1_4_option([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.ral_level_4_id ?
                      <h1 className="text-red-500">
                        {errors.ral_level_4_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAL Level 4 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="strategic_id"
              >
                Strategic :
              </label>
              <Controller
                name="strategic_id"
                control={control}
                rules={{required:"Stategic Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="strategic_id"
                      value={selectedStrategic || null}
                      placeholder="Pilih Strategic"
                      isLoading={isLoading}
                      options={ral_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "strategic_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_5_7.length === 0) {
                          fetchRal_5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_5_7([]);
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
                Tactical :
              </label>
              <Controller
                name="tactical_id"
                control={control}
                rules={{required:"Tactical Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tactical_id"
                      value={selectedTactical || null}
                      placeholder="Pilih RAB Level 5"
                      isLoading={isLoading}
                      options={ral_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "tactical_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_5_7.length === 0) {
                          fetchRal_5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_5_7([]);
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
                Operational :
              </label>
              <Controller
                name="operational_id"
                control={control}
                rules={{required:"Operational Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="operational_id"
                      value={selectedOperational || null}
                      placeholder="Pilih Operational"
                      isLoading={isLoading}
                      options={ral_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "operational_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_5_7.length === 0) {
                          fetchRal_5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_5_7([]);
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
        <ButtonSc typee="submit">Simpan</ButtonSc>
        <ButtonTr typee="button" className="mt-5" halaman_url="/Layanan/LayananSPBE">
          Batal
        </ButtonTr>
      </form>
    </div>
    )
}

export default FormFixGapLayananSPBE;