"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@/components/common/Button/Button";
import Select from "react-select";
import { useRouter } from "next/navigation";
import PopUp from "@/components/common/PopUp/PopUp";

interface OptionType {
  value: number;
  label: string;
}

interface OptionTypeString {
  value: string;
  label: string;
}

interface FormValues {
  nama_aplikasi : string,
  fungsi_aplikasi : string,
  jenis_aplikasi : OptionTypeString | null,
  produsen_aplikasi : string,
  pj_aplikasi : string,
  kode_opd : string,
  informasi_terkait_input : string,
  informasi_terkait_output : string,
  interoprabilitas : OptionTypeString | null,
  tahun : OptionType | null,
  raa_level_1_id : OptionType | null,
  raa_level_2_id : OptionType | null,
  raa_level_3_id : OptionType | null,
  strategic_id : OptionType | null,
  tactical_id : OptionType | null,
  operational_id : OptionType | null;
}

const FormTambahData = () => {
  const [raa_level_1_4_option, set_raa_level_1_4_option] = useState<
    OptionType[]
  >([]);
  const [raa_level_5_7_option, set_raa_level_5_7_option] = useState<
    OptionType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [popup, setPopup] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const tahun: OptionType[] = [
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
        nama_aplikasi : "",
        fungsi_aplikasi : "",
        jenis_aplikasi : null,
        produsen_aplikasi : "",
        pj_aplikasi : "",
        kode_opd : "5.01.5.05.0.00.02.0000",
        informasi_terkait_input : "",
        informasi_terkait_output : "",
        interoprabilitas : null,
        tahun : null,
        raa_level_1_id : null,
        raa_level_2_id : null,
        raa_level_3_id : null,
        strategic_id :  null,
        tactical_id : null,
        operational_id : null
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchRaaLevel1_4 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "Aplikasi",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
      }));
      set_raa_level_1_4_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAA Level 1 - 4");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRaaLevel5_7 = async (jenis_pohon: string) => {
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
      set_raa_level_5_7_option(result);
    } catch (err) {
      console.log("gagal memuat data option RAD Level 5 - 7");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
        nama_aplikasi : data.nama_aplikasi,
        fungsi_aplikasi : data.fungsi_aplikasi,
        jenis_aplikasi : data.jenis_aplikasi,
        produsen_aplikasi : data.produsen_aplikasi,
        pj_aplikasi : data.pj_aplikasi,
        kode_opd : "5.01.5.05.0.00.02.0000",
        informasi_terkait_input : data.informasi_terkait_input,
        informasi_terkait_output : data.informasi_terkait_output,
        interoprabilitas : data.interoprabilitas,
        tahun : data.tahun?.value,
        raa_level_1_id : data.raa_level_1_id?.value,
        raa_level_2_id : data.raa_level_2_id?.value,
        raa_level_3_id : data.raa_level_3_id?.value,
        strategic_id :  data.strategic_id?.value,
        tactical_id : data.tactical_id?.value,
        operational_id : data.operational_id?.value,
    };
    try{
      const response = await fetch(`${API_URL}/v1/createaplikasi`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        setPopup(true);
        setIsAdded(true);
      } else {
        setPopup(true);
        setIsAdded(false);
      }
    } catch(err){
        setPopup(true);
        setIsAdded(false);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form tambah Data Aplikasi</h1>
      <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
                      options={raa_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (raa_level_1_4_option.length === 0) {
                          fetchRaaLevel1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_1_4_option([]);
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
                      options={raa_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (raa_level_1_4_option.length === 0) {
                          fetchRaaLevel1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_1_4_option([]);
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
                      options={raa_level_1_4_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (raa_level_1_4_option.length === 0) {
                          fetchRaaLevel1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_1_4_option([]);
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
                      options={raa_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (raa_level_5_7_option.length === 0) {
                          fetchRaaLevel5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_5_7_option([]);
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
                      options={raa_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (raa_level_5_7_option.length === 0) {
                          fetchRaaLevel5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_5_7_option([]);
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
                      options={raa_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (raa_level_5_7_option.length === 0) {
                          fetchRaaLevel5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_level_5_7_option([]);
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
        <Button typee="submit" className="mt-5">
          Simpan
        </Button>
        <Button typee="button" className="mt-5 bg-red-500" halaman_url="/Aplikasi">
          Batal
        </Button>
      </form>
      <PopUp isOpen={popup} onClose={() => {setPopup(false); setIsAdded(false);}}>
        <div className="flex flex-col justify-center">
          {isAdded ? 
            <h1>Berhasil menambahkan Aplikasi</h1>
            :
            <h1>Gagal menambahkan Aplikasi, silakan cek koneksi internet atau database server</h1>
          }
          <Button
            className="mt-5"
            onClick={() => {
              setPopup(false);
              setIsAdded(false);
              router.push("/Aplikasi");
            }}
          >
            Tutup
          </Button>
        </div>
      </PopUp>
    </div>
  );
};

export default FormTambahData;
