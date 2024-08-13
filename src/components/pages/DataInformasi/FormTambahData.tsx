"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface OptionType {
  value: number;
  label: string;
}

interface OptionTypeString {
  value: string;
  label: string;
}

interface FormValues {
  nama_data : string,
  sifat_data : OptionTypeString | null,
  uraian_data : string,
  jenis_data : OptionTypeString | null,
  produsen_data : string,
  validitas_data : OptionTypeString | null,
  pj_data : string,
  kode_opd : string,
  informasi_terkait_input : string,
  informasi_terkait_output : string,
  interoprabilitas : OptionTypeString | null,
  keterangan : string | null,
  tahun : OptionType | null,
  rad_level_1_id : OptionType | null,
  rad_level_2_id : OptionType | null,
  rad_level_3_id : OptionType | null,
  rad_level_4_id : OptionType | null,
  strategic_id : OptionType | null,
  tactical_id : OptionType | null,
  operational_id : OptionType | null;
}

const FormTambahData = () => {
  const [rad_level_1_4_option, set_rad_level_1_4_option] = useState<
    OptionType[]
  >([]);
  const [rad_level_5_7_option, set_rad_level_5_7_option] = useState<
    OptionType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const tahun: OptionType[] = [
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
  ];

  const JenisData : OptionTypeString[] = [
    { value: "Data Statistik", label: "Data Statistik" },
    { value: "Data Geopasial", label: "Data Geopasial" },
    { value: "Data Keuangan", label: "Data Keuangan" },
    { value: "Data Lainya", label: "Data Lainya" }
  ]

  const SifatData : OptionTypeString[] = [
    { value: "Terbuka", label: "Terbuka" },
    { value: "Terbatas", label: "Terbatas" },
    { value: "Tertutup", label: "Tertutup" }
  ]
  const Interoprabilitas : OptionTypeString[] = [
    { value: "Ya", label: "Ya" },
    { value: "Tidak", label: "Tidak" }
  ]
  const ValiditasData : OptionTypeString[] = [
    { value: "RealTime", label: "RealTime" },
    { value: "Harian", label: "Harian" },
    { value: "Mingguan", label: "Mingguan" },
    { value: "Bulanan", label: "Bulanan" },
    { value: "Tiga Bulanan", label: "Tiga Bulanan" },
    { value: "Enam Bulanan", label: "Enam Bulanan" },
    { value: "Tahunan", label: "Tahunan" },
    { value: "Dua Tahunan", label: "Dua Tahunan" },
    { value: "Tiga Tahunan", label: "Tiga Tahunan" },
    { value: "Lima Tahunan", label: "Lima Tahunan" },
    { value: "Lainya", label: "Lainya" }
  ]

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
        nama_data : "",
        sifat_data : null,
        jenis_data : null,
        produsen_data : "",
        pj_data : "",
        kode_opd : "5.01.5.05.0.00.02.0000",
        informasi_terkait_input : "",
        informasi_terkait_output : "",
        interoprabilitas : null,
        keterangan : null,
        tahun : null,
        rad_level_1_id : null,
        rad_level_2_id : null,
        rad_level_3_id : null,
        rad_level_4_id : null,
        strategic_id :  null,
        tactical_id : null,
        operational_id : null
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchRadLevel1_4 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "DataDanInformasi",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
      }));
      set_rad_level_1_4_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAD Level 1 - 4");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRadLevel5_7 = async (jenis_pohon: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (pohon: any) => pohon.jenis_pohon === jenis_pohon,
      );
      const result = filteredData.map((pohon: any) => ({
        value: pohon.id,
        label: pohon.nama_pohon,
      }));
      set_rad_level_5_7_option(result);
    } catch (err) {
      console.log("gagal memuat data option RAD Level 5 - 7");
    } finally {
      setIsLoading(false);
    }
  };

  const interoprabilitasValue = watch("interoprabilitas");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
        nama_data : data.nama_data,
        uraian_data : data.uraian_data,
        sifat_data : data.sifat_data?.value,
        jenis_data : data.jenis_data?.value,
        produsen_data : data.produsen_data,
        validitas_data : data.validitas_data?.value,
        pj_data : data.pj_data,
        kode_opd : "5.01.5.05.0.00.02.0000",
        informasi_terkait_input : data.informasi_terkait_input,
        informasi_terkait_output : data.informasi_terkait_output,
        interoprabilitas : data.interoprabilitas?.value,
        keterangan : data.interoprabilitas?.value === "Ya" ? data.keterangan : null,
        tahun : data.tahun?.value,
        rad_level_1_id : data.rad_level_1_id?.value,
        rad_level_2_id : data.rad_level_2_id?.value,
        rad_level_3_id : data.rad_level_3_id?.value,
        rad_level_4_id : data.rad_level_4_id?.value,
        strategic_id :  data.strategic_id?.value,
        tactical_id : data.tactical_id?.value,
        operational_id : data.operational_id?.value,
    };
    try{
      const response = await fetch(`${API_URL}/v1/createdatainformasi`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        AlertNotification("Berhasil", "Data Informasi Berhasil Ditambahkan", "success", 1000);
        router.push("/DataInformasi");
      } else {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    } catch(err){
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form tambah Data Informasi SPBE</h1>
      <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_data">
            Nama Data Informasi :
          </label>
          <Controller
            name="nama_data"
            control={control}
            rules={{ required: "Nama Data Informasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="nama_data"
                  placeholder="masukkan nama data informasi"
                />
                {errors.nama_data ?
                  <h1 className="text-red-500">
                    {errors.nama_data.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Nama Data Informasi Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_data">
            Uraian Data :
          </label>
          <Controller
            name="uraian_data"
            control={control}
            rules={{ required: "Uraian Data Informasi Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="uraian_data"
                  placeholder="masukkan nama data informasi"
                />
                {errors.uraian_data ?
                  <h1 className="text-red-500">
                    {errors.uraian_data.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Uraian Data Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="produsen_data"
          >
            Produsen Data :
          </label>
          <Controller
            name="produsen_data"
            control={control}
            rules={{ required: "Produsen Data Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="produsen_data"
                  placeholder="masukkan Produsen Data"
                />
                {errors.produsen_data ?
                  <h1 className="text-red-500">
                    {errors.produsen_data.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Produsen Data Harus Terisi</h1>
                }
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="pj_data"
          >
            Penanggung Jawab Data :
          </label>
          <Controller
            name="pj_data"
            control={control}
            rules={{ required: "Pengngguan Jawab Data Harus Terisi" }}
            render={({ field }) => (
              <>
                <input
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="pj_data"
                  placeholder="masukkan Penanggung Jawab Data"
                />
                {errors.pj_data ?
                  <h1 className="text-red-500">
                    {errors.pj_data.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*Penanggung Jawab Data Harus Terisi</h1>
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
              htmlFor="sifat_data"
            >
              Sifat Data :
            </label>
            <Controller
                name="sifat_data"
                control={control}
                rules={{ required: "sifat data Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={SifatData}
                      isSearchable
                      isClearable
                      placeholder="Pilih sifat data"
                    />
                    {errors.sifat_data ?
                      <h1 className="text-red-500">
                        {errors.sifat_data.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*sifat data Harus Terisi</h1>
                    }
                  </>
                )}
              />
          </div>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="validitas_data"
            >
              Validitas Data :
            </label>
            <Controller
                name="validitas_data"
                control={control}
                rules={{ required: "Validitas data Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={ValiditasData}
                      isSearchable
                      isClearable
                      placeholder="Pilih validitas data"
                    />
                    {errors.validitas_data ?
                      <h1 className="text-red-500">
                        {errors.validitas_data.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Validitas data Harus Terisi</h1>
                    }
                  </>
                )}
              />
          </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="jenis_data"
              >
                Jenis Data :
              </label>
              <Controller
                name="jenis_data"
                control={control}
                rules={{ required: "Jenis Data Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={JenisData}
                      isSearchable
                      isClearable
                      placeholder="Pilih Jenis Data"
                    />
                    {errors.jenis_data ?
                  <h1 className="text-red-500">
                    {errors.jenis_data.message}
                  </h1>
                  :
                  <h1 className="text-slate-300 text-xs">*jenis_data Harus Terisi</h1>
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
                rules={{ required: "Interoprabilitas Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={Interoprabilitas}
                      isSearchable
                      isClearable
                      placeholder="Pilih Interoprabilitas"
                    />
                    {errors.interoprabilitas ?
                      <h1 className="text-red-500">
                        {errors.interoprabilitas.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Interoprabilitas Harus Terisi</h1>
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
                        className="border px-4 py-2 rounded"
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
              <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun:</label>
              <Controller
                name="tahun"
                control={control}
                rules={{ required: "Tahun Harus Terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={tahun}
                      isSearchable
                      isClearable
                      placeholder="Pilih Tahun"
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
                htmlFor="rad_level_1_id"
              >
                RAD Level 1:
              </label>
              <Controller
                name="rad_level_1_id"
                control={control}
                rules={{required : "RAD Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAD Level 1"
                      options={rad_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rad_level_1_4_option.length === 0) {
                          fetchRadLevel1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_1_4_option([]);
                      }}
                    />
                    {errors.rad_level_1_id ?
                      <h1 className="text-red-500">
                        {errors.rad_level_1_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAD Level 1 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_2_id"
              >
                RAD Level 2:
              </label>
              <Controller
                name="rad_level_2_id"
                control={control}
                rules={{required: "RAD Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAD Level 2"
                      options={rad_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rad_level_1_4_option.length === 0) {
                          fetchRadLevel1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_1_4_option([]);
                      }}
                    />
                    {errors.rad_level_2_id ?
                      <h1 className="text-red-500">
                        {errors.rad_level_2_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAD Level 2 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_3_id"
              >
                RAD Level 3:
              </label>
              <Controller
                name="rad_level_3_id"
                control={control}
                rules={{required: "RAD Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAD Level 3"
                      options={rad_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rad_level_1_4_option.length === 0) {
                          fetchRadLevel1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_1_4_option([]);
                      }}
                    />
                    {errors.rad_level_3_id ?
                      <h1 className="text-red-500">
                        {errors.rad_level_3_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAD Level 3 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_4_id"
              >
                RAD Level 4:
              </label>
              <Controller
                name="rad_level_4_id"
                control={control}
                rules={{required: "RAD Level 4 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAD Level 4"
                      options={rad_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rad_level_1_4_option.length === 0) {
                          fetchRadLevel1_4(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_1_4_option([]);
                      }}
                    />
                    {errors.rad_level_4_id ?
                      <h1 className="text-red-500">
                        {errors.rad_level_4_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAD Level 4 Harus Terisi</h1>
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
                      options={rad_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rad_level_5_7_option.length === 0) {
                          fetchRadLevel5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_5_7_option([]);
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
                      options={rad_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rad_level_5_7_option.length === 0) {
                          fetchRadLevel5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_5_7_option([]);
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
                      options={rad_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rad_level_5_7_option.length === 0) {
                          fetchRadLevel5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_level_5_7_option([]);
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
        <ButtonTr typee="button" className="mt-5" halaman_url="/DataInformasi">
          Batal
        </ButtonTr>
      </form>
    </div>
  );
};

export default FormTambahData;
