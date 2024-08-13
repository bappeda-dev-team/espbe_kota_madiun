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

interface FormValues {
  kode_opd: string;
  bidang_urusan_id: OptionType | null;
  tahun: OptionType | null;
  sasaran_kota_id: OptionType | null;
  rab_level_1_id: OptionType | null;
  rab_level_2_id: OptionType | null;
  rab_level_3_id: OptionType | null;
  rab_level_4_id: OptionType | null;
  rab_level_5_id: OptionType | null;
  rab_level_6_id: OptionType | null;
}

const FormTambahData = () => {
  const [rab_level_1_3_option, set_rab_level_1_3_option] = useState<
    OptionType[]
  >([]);
  const [rab_level_4_6_option, set_rab_level_4_6_option] = useState<
    OptionType[]
  >([]);
  const [sasaran_kota_option, set_sasaran_kota_option] = useState<OptionType[]>(
    [],
  );
  const [bidang_urusan_option, set_bidang_urusan_option] = useState<
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      kode_opd: "5.01.5.05.0.00.02.0000",
      bidang_urusan_id: null,
      tahun: null,
      sasaran_kota_id: null,
      rab_level_1_id: null,
      rab_level_2_id: null,
      rab_level_3_id: null,
      rab_level_4_id: null,
      rab_level_5_id: null,
      rab_level_6_id: null,
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchRabLevel1_3 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "ProsesBisnis",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
      }));
      set_rab_level_1_3_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAB Level 1 - 3");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRabLevel4_6 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (pohon: any) => pohon.level_pohon === level,
      );
      const result = filteredData.map((pohon: any) => ({
        value: pohon.id,
        label: pohon.nama_pohon,
      }));
      set_rab_level_4_6_option(result);
    } catch (err) {
      console.log("gagal memuat data option RAB Level 4 - 6");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSasaranKota = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/sasarankota`);
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.ID,
        label: item.Sasaran,
      }));
      set_sasaran_kota_option(result);
    } catch (err) {
      console.log("gagal memuat data option sasaran kota");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBidangUrusan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/bidangurusan`);
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.id,
        label: `${item.id}. ${item.kode_bidang_urusan} - ${item.bidang_urusan}`,
      }));
      set_bidang_urusan_option(result);
    } catch (err) {
      console.log("gagal memuat data option bidang urusan");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
      kode_opd: "5.01.5.05.0.00.02.0000",
      bidang_urusan_id: data.bidang_urusan_id?.value,
      tahun: data.tahun?.value,
      sasaran_kota_id: data.sasaran_kota_id?.value,
      rab_level_1_id: data.rab_level_1_id?.value,
      rab_level_2_id: data.rab_level_2_id?.value,
      rab_level_3_id: data.rab_level_3_id?.value,
      rab_level_4_id: data.rab_level_4_id?.value,
      rab_level_5_id: data.rab_level_5_id?.value,
      rab_level_6_id: data.rab_level_6_id?.value,
    };
    try{
      const response = await fetch(`${API_URL}/v1/createprosesbisnis`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        AlertNotification("Berhasil", "Berhasil menambahkan data proses bisnis", "success", 1000);
        router.push("/ProsesBisnis")
      } else {
        AlertNotification("Gagal", "cek koneksi interet atau database server", "error", 2000);
      }
    } catch(err){
        AlertNotification("Gagal", "cek koneksi interet atau database server", "error", 2000);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form tambah data Proses Bisnis</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >

        {isClient && (
          <>
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
                htmlFor="bidang_urusan_id"
              >
                Bidang Urusan:
              </label>
              <Controller
                name="bidang_urusan_id"
                control={control}
                rules={{required: "Bidang Urusan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={bidang_urusan_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      placeholder="Pilih Bidang Urusan"
                      id="bidang_urusan_id"
                      onMenuOpen={() => {
                        if (bidang_urusan_option.length === 0) {
                          fetchBidangUrusan();
                        }
                      }}
                    />
                    {errors.bidang_urusan_id ?
                      <h1 className="text-red-500">
                        {errors.bidang_urusan_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Bidang Urusan Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="sasaran_kota_id"
              >
                Sasaran Kota:
              </label>
              <Controller
                name="sasaran_kota_id"
                control={control}
                rules= {{required: "Sasaran Kota Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Pilih Sasaran Kota"
                      options={sasaran_kota_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (sasaran_kota_option.length === 0) {
                          fetchSasaranKota();
                        }
                      }}
                    />
                    {errors.sasaran_kota_id ?
                      <h1 className="text-red-500">
                        {errors.sasaran_kota_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Sasaran Kota Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_1_id"
              >
                RAB Level 1:
              </label>
              <Controller
                name="rab_level_1_id"
                control={control}
                rules={{required : "RAB Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAB Level 1"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rab_level_1_3_option.length === 0) {
                          fetchRabLevel1_3(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_1_3_option([]);
                      }}
                    />
                    {errors.rab_level_1_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_1_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAB Level 1 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_2_id"
              >
                RAB Level 2:
              </label>
              <Controller
                name="rab_level_2_id"
                control={control}
                rules={{required : "RAB Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAB Level 2"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rab_level_1_3_option.length === 0) {
                          fetchRabLevel1_3(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_1_3_option([]);
                      }}
                    />
                    {errors.rab_level_2_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_2_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAB Level 2 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_3_id"
              >
                RAB Level 3:
              </label>
              <Controller
                name="rab_level_3_id"
                control={control}
                rules={{required : "RAB Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAB Level 3"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (rab_level_1_3_option.length === 0) {
                          fetchRabLevel1_3(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_1_3_option([]);
                      }}
                    />
                    {errors.rab_level_3_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_3_id.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*RAB Level 3 Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_4_id"
              >
                Strategic :
              </label>
              <Controller
                name="rab_level_4_id"
                control={control}
                rules={{required : "Strategic Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Strategic"
                      options={rab_level_4_6_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rab_level_4_6_option.length === 0) {
                          fetchRabLevel4_6(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_4_6_option([]);
                      }}
                    />
                    {errors.rab_level_4_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_4_id.message}
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
                htmlFor="rab_level_5_id"
              >
                Tactical :
              </label>
              <Controller
                name="rab_level_5_id"
                control={control}
                rules={{required : "Tactical Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Tactical"
                      options={rab_level_4_6_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rab_level_4_6_option.length === 0) {
                          fetchRabLevel4_6(5);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_4_6_option([]);
                      }}
                    />
                    {errors.rab_level_5_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_5_id.message}
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
                htmlFor="rab_level_6_id"
              >
                Operational :
              </label>
              <Controller
                name="rab_level_6_id"
                control={control}
                rules={{required : "Operational Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan Operational"
                      options={rab_level_4_6_option}
                      isLoading={isLoading}
                      isClearable
                      isSearchable
                      onMenuOpen={() => {
                        if (rab_level_4_6_option.length === 0) {
                          fetchRabLevel4_6(6);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_level_4_6_option([]);
                      }}
                    />
                    {errors.rab_level_6_id ?
                      <h1 className="text-red-500">
                        {errors.rab_level_6_id.message}
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
        <ButtonTr typee="button" halaman_url="/ProsesBisnis" className="mt-5">
          Batal
        </ButtonTr>
      </form>
    </div>
  );
};

export default FormTambahData;
