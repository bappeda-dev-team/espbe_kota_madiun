"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import Select from "react-select";
import { useParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface OptionType {
  value: number;
  label: string;
  kode?: string;
}

interface OptionTypeString {
  value: string;
  label: string;
}

interface formValue {
    nama_aplikasi : string,
    fungsi_aplikasi : string,
    jenis_aplikasi : OptionTypeString | null,
    produsen_aplikasi : string,
    pj_aplikasi : string,
    kode_opd : string,
    informasi_terkait_input : string,
    informasi_terkait_output : string,
    interoprabilitas : OptionTypeString | null,
    keterangan : string | null,
    tahun : OptionType | null,
    raa_level_1_id : OptionType | null,
    raa_level_2_id : OptionType | null,
    raa_level_3_id : OptionType | null,
    strategic_id : OptionType | null,
    tactical_id : OptionType | null,
    operational_id : OptionType | null;
}

const FormFixGapAplikasi = () => {

  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
  const { id } = useParams();
  const router = useRouter();
  const token = getToken();
  const [user, setUser] = useState<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<formValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const [raa_1_4, set_raa_1_4] = useState<OptionType[]>([]);
  const [raa_5_7, set_raa_5_7] = useState<OptionType[]>([]);

  const [selectedRaa1, setSelectedRaa1] = useState<OptionType | null>(null);
  const [selectedRaa2, setSelectedRaa2] = useState<OptionType | null>(null);
  const [selectedRaa3, setSelectedRaa3] = useState<OptionType | null>(null);
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
  const interoprabilitas: OptionTypeString[] = [
    { value: "Ya", label: "Ya"},
    { value: "Tidak", label: "Tidak"}
  ]
  const JenisAplikasi: OptionTypeString[] = [
    { value: "Statistik", label: "Statistik"},
    { value: "Geospasial", label: "Geospasial"},
    { value: "Keuangan", label: "Keuangan"},
    { value: "Lainnya", label: "Lainnya"}
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

  const fetchRaaLevel1_4 = async (level: number, value?: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "Aplikasi",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
        kode: referensi.kode_referensi,
      }));
      set_raa_1_4(result);
    } catch (error) {
      console.error("gagal memuat data option RAA Level 1 - 4");
    } finally {
      setIsLoading(false);
    }
  };
  //fetching data RAL 5 - 7
  const fetchRaa_5_7 = async (pohon_kinerja: any) => {
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
      set_raa_5_7(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAA Level 5 - 7", err);
    } finally {
      setIsLoading(false);
    }
  };

  const interoprabilitasValue = watch("interoprabilitas");

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
      nama_aplikasi: data.nama_aplikasi,
      fungsi_aplikasi: data.fungsi_aplikasi,
      jenis_aplikasi: data.jenis_aplikasi?.value,
      produsen_aplikasi: data.produsen_aplikasi,
      pj_aplikasi: data.pj_aplikasi,
      kode_opd: user?.roles == 'admin_kota' ? SelectedOpd : user?.kode_opd,
      informasi_terkait_input: data.informasi_terkait_input,
      informasi_terkait_output: data.informasi_terkait_output,
      interoprabilitas: data.interoprabilitas?.value,
      keterangan : data.interoprabilitas?.value === "Ya" ? data.keterangan : null,
      tahun: data.tahun?.value,
      raa_level_1_id: data.raa_level_1_id?.value,
      raa_level_2_id: data.raa_level_2_id?.value,
      raa_level_3_id: data.raa_level_3_id?.value,
      strategic_id: data.strategic_id?.value,
      tactical_id: data.tactical_id?.value,
      operational_id: data.operational_id?.value,
    };
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd == "" || SelectedOpd == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus terpilih di header", "warning", 2000);
      } else {
        // console.log(formData);
        try {
          const response = await fetch(`${API_URL}/v1/createaplikasi`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
            AlertNotification("Berhasil", "Berhasil tambah aplikasi sesuai GAP", "success", 1000);
            router.push("/GapArsitektur");
            reset();
          } else {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
          }
        } catch (error) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      }
    } else {
      // console.log(formData);
      try {
        const response = await fetch(`${API_URL}/v1/createaplikasi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          AlertNotification("Berhasil", "Berhasil tambah aplikasi sesuai GAP", "success", 1000);
          router.push("/GapArsitektur");
          reset();
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } catch (error) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    }
  };
  
  return (
    <>
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bold">Form Fix GAP Data Aplikasi :</h1>
        <form
          className="flex flex-col mx-5 py-5"
          onSubmit={handleSubmit(onSubmit)}
        >
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_aplikasi">
            Nama Aplikasi :
          </label>
          <Controller
            name="nama_aplikasi"
            control={control}
            rules={{ required: "Nama Aplikasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="nama_aplikasi"
                  placeholder="masukkan nama aplikasi beserta akronimnya"
                />
                {errors.nama_aplikasi ?
                  <h1 className="text-red-500">
                    {errors.nama_aplikasi.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Nama Aplikasi Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="fungsi_aplikasi"
          >
            Fungsi Aplikasi :
          </label>
          <Controller
            name="fungsi_aplikasi"
            control={control}
            rules={{ required: "Fungsi Aplikasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="fungsi_aplikasi"
                  placeholder="masukkan Fungsi Aplikasi"
                />
                {errors.fungsi_aplikasi ?
                  <h1 className="text-red-500">
                    {errors.fungsi_aplikasi.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Fungsi Aplikasi Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="produsen_aplikasi"
          >
            Produsen Aplikasi :
          </label>
          <Controller
            name="produsen_aplikasi"
            control={control}
            rules={{ required: "Produsen Aplikasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="produsen_aplikasi"
                  placeholder="masukkan Produsen Aplikasi"
                />
                {errors.produsen_aplikasi ?
                  <h1 className="text-red-500">
                    {errors.produsen_aplikasi.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Produsen Aplikasi Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="pj_aplikasi"
          >
            Penanggung Jawab Aplikasi :
          </label>
          <Controller
            name="pj_aplikasi"
            control={control}
            rules={{ required: "Pengngguan Jawab Aplikasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="pj_aplikasi"
                  placeholder="masukkan Penanggung Jawab Aplikasi"
                />
                {errors.pj_aplikasi ?
                  <h1 className="text-red-500">
                    {errors.pj_aplikasi.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Penanggung Jawab Aplikasi Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="informasi_terkait_input"
          >
            Informasi Terkait Input :
          </label>
          <Controller
            name="informasi_terkait_input"
            control={control}
            rules={{ required: "Informasi Terkait Input Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="informasi_terkait_input"
                  placeholder="masukkan Informasi Terkait Input"
                />
                {errors.informasi_terkait_input ?
                  <h1 className="text-red-500">
                    {errors.informasi_terkait_input.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Informasi Terkait Input Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="informasi_terkait_output"
          >
            Informasi Terkait Output :
          </label>
          <Controller
            name="informasi_terkait_output"
            control={control}
            rules={{ required: "Informasi Terkait Output Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded-lg"
                  {...field}
                  type="text"
                  id="informasi_terkait_output"
                  placeholder="masukkan Informasi Terkait Output"
                />
                {errors.informasi_terkait_output ?
                  <h1 className="text-red-500">
                    {errors.informasi_terkait_output.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Informasi Terkait Output Harus Terisi</h1>
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
                htmlFor="jenis_aplikasi"
              >
                Jenis Aplikasi :
              </label>
              <Controller
                name="jenis_aplikasi"
                control={control}
                rules={{ required: "jenis aplikasi Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={JenisAplikasi}
                      isSearchable
                      isClearable
                      placeholder="Pilih Jenis Aplikasi"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.jenis_aplikasi ?
                      <h1 className="text-red-500">
                        {errors.jenis_aplikasi.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Jenis Aplikasi Harus Terisi</h1>
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
                htmlFor="interoprabilitas"
              >
                Interoprabilitas :
              </label>
              <Controller
                name="interoprabilitas"
                control={control}
                rules={{ required: "interoprabilitas Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={interoprabilitas}
                      isSearchable
                      isClearable
                      placeholder="Pilih interoprabilitas"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.interoprabilitas ?
                      <h1 className="text-red-500">
                        {errors.interoprabilitas.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*interoprabilitas Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            {interoprabilitasValue?.value === "Ya" && (
              <div className="flex flex-col py-3">
                <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="keterangan">
                  Keterangan :
                </label>
                <Controller
                  name="keterangan"
                  control={control}
                  render={({ field }) => (
                      <input
                        className="border px-4 py-2 rounded-lg"
                        {...field}
                        value={field.value || ""}
                        type="text"
                        id="keterangan"
                        placeholder="Masukkan Keterangan"
                      />
                  )}
                />
              </div>
            )}
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="raa_level_1_id"
              >
                RAA Level 1:
              </label>
              <Controller
                name="raa_level_1_id"
                control={control}
                rules={{required : "RAA Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAA Level 1"
                      value={selectedRaa1}
                      options={raa_1_4}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (raa_1_4.length === 0) {
                          fetchRaaLevel1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRaa1(option);
                        setSelectedRaa2(null);
                        setSelectedRaa3(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.raa_level_1_id ?
                      <h1 className="text-red-500">
                        {errors.raa_level_1_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAA Level 1 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="raa_level_2_id"
              >
                RAA Level 2:
              </label>
              <Controller
                name="raa_level_2_id"
                control={control}
                rules={{required: "RAA Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAA Level 2"
                      value={selectedRaa2}
                      options={raa_1_4}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      isDisabled={!selectedRaa1}
                      onMenuOpen={() => {
                        if (selectedRaa1?.kode) {
                          fetchRaaLevel1_4(2, selectedRaa1.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRaa2(option);
                        setSelectedRaa3(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.raa_level_2_id ?
                      <h1 className="text-red-500">
                        {errors.raa_level_2_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAA Level 2 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="raa_level_3_id"
              >
                RAA Level 3:
              </label>
              <Controller
                name="raa_level_3_id"
                control={control}
                rules={{required: "RAA Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAD Level 3"
                      value={selectedRaa3}
                      options={raa_1_4}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      isDisabled={!selectedRaa2}
                      onMenuOpen={() => {
                        if (selectedRaa2?.kode) {
                          fetchRaaLevel1_4(3, selectedRaa2.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
                      }}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRaa3(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
                      }}
                    />
                    {errors.raa_level_3_id ?
                      <h1 className="text-red-500">
                        {errors.raa_level_3_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAA Level 3 Harus Terisi</h1>
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
                      options={raa_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "strategic_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_5_7.length === 0) {
                          fetchRaa_5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_5_7([]);
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
                      options={raa_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "tactical_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_5_7.length === 0) {
                          fetchRaa_5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_5_7([]);
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
                      options={raa_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "operational_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_5_7.length === 0) {
                          fetchRaa_5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_5_7([]);
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
          <ButtonTr typee="button" className="mt-5" halaman_url="/GapArsitektur">
            Batal
          </ButtonTr>
        </form>
      </div>
    </>
  );
};

export default FormFixGapAplikasi;
