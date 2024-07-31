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
  const [ral_level_1_4_option, set_ral_level_1_4_option] = useState<
    OptionType[]
  >([]);
  const [ral_level_5_7_option, set_ral_level_5_7_option] = useState<
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

  const MetodeLayanan: OptionTypeString[] = [
    {value: "Elektronik", label: "Elektronik"},
    {value: "Non Elektronik", label: "Non Elektronik"}
  ]

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nama_layanan: "",
      tujuan_layanan_id: null,
      fungsi_layanan: "",
      tahun: null,
      kode_opd: "5.01.5.05.0.00.02.0000",
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

  const fetchRalLevel1_4 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
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

  const fetchRalLevel5_7 = async (jenis_pohon: string) => {
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
      set_ral_level_5_7_option(result);
    } catch (err) {
      console.log("gagal memuat data option RAL Level 5 - 7");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
      nama_layanan: data.nama_layanan,
      tujuan_layanan_id: data.tujuan_layanan_id?.value,
      fungsi_layanan: data.fungsi_layanan,
      tahun: data.tahun?.value,
      kode_opd: "5.01.5.05.0.00.02.0000",
      kementrian_terkait: data.kementrian_terkait,
      metode_layanan: data.metode_layanan,
      ral_level_1_id: data.ral_level_1_id?.value,
      ral_level_2_id: data.ral_level_2_id?.value,
      ral_level_3_id: data.ral_level_3_id?.value,
      ral_level_4_id: data.ral_level_4_id?.value,
      strategic_id: data.strategic_id?.value,
      tactical_id: data.tactical_id?.value,
      operational_id: data.operational_id?.value,
    };
    try{
      const response = await fetch(`${API_URL}/v1/createlayananspbe`, {
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
                  className="border px-4 py-2 rounded"
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
              <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tujuan Layanan:</label>
              <Controller
                name="tujuan_layanan_id"
                control={control}
                rules={{required: "Tujuan Layanan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Pilih Tujuan Layanan"
                      options={ral_level_5_7_option}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if(ral_level_5_7_option.length === 0){
                          fetchRalLevel5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_5_7_option([]);
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
                      options={ral_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (ral_level_5_7_option.length === 0) {
                          fetchRalLevel5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_5_7_option([]);
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
                      options={ral_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (ral_level_5_7_option.length === 0) {
                          fetchRalLevel5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_5_7_option([]);
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
                      options={ral_level_5_7_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (ral_level_5_7_option.length === 0) {
                          fetchRalLevel5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_level_5_7_option([]);
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
        <Button typee="button" className="mt-5 bg-red-500" halaman_url="/Layanan/LayananSPBE">
          Batal
        </Button>
      </form>
      <PopUp isOpen={popup} onClose={() => {setPopup(false); setIsAdded(false);}}>
        <div className="flex flex-col justify-center">
          {isAdded ? 
            <h1>Berhasil menambahkan data Layanan SPBE</h1>
            :
            <h1>Gagal menambahkan data Layanan SPBE, silakan cek koneksi internet atau database server</h1>
          }
          <Button
            className="mt-5"
            onClick={() => {
              setPopup(false);
              setIsAdded(false);
              router.push("/Layanan/LayananSPBE");
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
