"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
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

interface formValue {
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan_id: OptionType | null;
  sasaran_kota_id: OptionType | null;
  tahun: OptionType | null;
  rab_level_1_id: OptionType | null;
  rab_level_2_id: OptionType | null;
  rab_level_3_id: OptionType | null;
  rab_level_4_id: OptionType | null;
  rab_level_5_id: OptionType | null;
  rab_level_6_id: OptionType | null;
}

const FormEditData = () => {
  const { id } = useParams();
  const router = useRouter();
  const token = getToken();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);

  //state untuk fetch data option
  const [sasaran_kota_option, set_sasaran_kota_option] = useState<OptionType[]>([],);
  const [bidang_urusan_option, set_bidang_urusan_option] = useState<OptionType[]>([]);
  const [rab_1_3, set_rab_1_3] = useState<OptionType[]>([]);
  const [rab_4, set_rab_4] = useState<OptionType[]>([]);
  const [rab_5_6, set_rab_5_6] = useState<OptionType[]>([]);

  //state untuk fetch default value data by id
  const [selectedSasaranKota, setSelectedSasaranKota] = useState<OptionType | null>(null);
  const [selectedBidangUrusan, setSelectedBidangUrusan] = useState<OptionType | null>(null);
  const [selectedRab1, setSelectedRab1] = useState<OptionType | null>(null);
  const [selectedRab2, setSelectedRab2] = useState<OptionType | null>(null);
  const [selectedRab3, setSelectedRab3] = useState<OptionType | null>(null);
  const [selectedRab4, setSelectedRab4] = useState<OptionType | null>(null);
  const [selectedRab5, setSelectedRab5] = useState<OptionType | null>(null);
  const [selectedRab6, setSelectedRab6] = useState<OptionType | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<OptionType | null>(null);

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  }, [])

  const tahun_option: OptionType[] = [
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
  ];

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

        if (result.sasaran_kota) {
          const sasaranKotaOption = {
            value: result.sasaran_kota.ID,
            label: result.sasaran_kota.Sasaran,
          };
          setSelectedSasaranKota(sasaranKotaOption);
          reset((prev) => ({ ...prev, sasaran_kota_id: sasaranKotaOption }));
        }
        if (result.bidang_urusan_id) {
          const bidangUrusanOption = {
            value: result.bidang_urusan_id.id,
            label: `${result.bidang_urusan_id.id} - ${result.bidang_urusan_id.bidang_urusan}`,
          };
          setSelectedBidangUrusan(bidangUrusanOption);
          reset((prev) => ({ ...prev, bidang_urusan_id: bidangUrusanOption }));
        }
        if (result.rab_level_1) {
          const rabLevel1Option = {
            value: result.rab_level_1.Id,
            label: `${result.rab_level_1.kode_referensi} ${result.rab_level_1.nama_referensi}`,
            kode: result.rab_level_1.kode_referensi,
          };
          setSelectedRab1(rabLevel1Option);
          reset((prev) => ({ ...prev, rab_level_1_id: rabLevel1Option }));
        }
        if (result.rab_level_2) {
          const rabLevel2Option = {
            value: result.rab_level_2.Id,
            label: `${result.rab_level_2.kode_referensi} ${result.rab_level_2.nama_referensi}`,
            kode: result.rab_level_2.kode_referensi,
          };
          setSelectedRab2(rabLevel2Option);
          reset((prev) => ({ ...prev, rab_level_2_id: rabLevel2Option }));
        }
        if (result.rab_level_3) {
          const rabLevel3Option = {
            value: result.rab_level_3.Id,
            label: `${result.rab_level_3.kode_referensi} ${result.rab_level_3.nama_referensi}`,
            kode: result.rab_level_3.kode_referensi,
          };
          setSelectedRab3(rabLevel3Option);
          reset((prev) => ({ ...prev, rab_level_3_id: rabLevel3Option }));
        }
        if (result.rab_level_4) {
          const rabLevel4Option = {
            value: result.rab_level_4.id,
            label: result.rab_level_4.nama_pohon,
          };
          setSelectedRab4(rabLevel4Option);
          reset((prev) => ({ ...prev, rab_level_4_id: rabLevel4Option }));
        }
        if (result.rab_level_5) {
          const rabLevel5Option = {
            value: result.rab_level_5.id,
            label: result.rab_level_5.nama_pohon,
          };
          setSelectedRab5(rabLevel5Option);
          reset((prev) => ({ ...prev, rab_level_5_id: rabLevel5Option }));
        }
        if (result.rab_level_6) {
          const rabLevel6Option = {
            value: result.rab_level_6.id,
            label: result.rab_level_6.nama_pohon,
          };
          setSelectedRab6(rabLevel6Option);
          reset((prev) => ({ ...prev, rab_level_6_id: rabLevel6Option }));
        }
        if (result.tahun) {
          const selectedTahun = {
            value: result.tahun,
            label: result.tahun,
          };
          setSelectedTahun(selectedTahun);
          reset((prev) => ({ ...prev, tahun: selectedTahun }));
        }
      } catch (err) {
        console.log("Gagal fetching data by id");
      }
    };
    fetchingDataId();
    setIsClient(true);
  }, [reset, id, token]);

  const fetchSasaranKota = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/sasarankota`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.ID,
        label: item.Sasaran,
      }));
      set_sasaran_kota_option(result);
    } catch (err) {
      console.log("Gagal memuat data Option Sasaran Kota", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBidangUrusan = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/bidangurusanopd?kode_opd=${SelectedOpd}`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.id,
        label: `${item.kode_bidang_urusan} - ${item.bidang_urusan}`,
      }));
      set_bidang_urusan_option(result);
    } catch (err) {
      console.log("Gagal memuat data Option Bidang Urusan", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRab_1_3 = async (level: number, value?: string) => {
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
        (item: any) => item.level_referensi === level && item.jenis_referensi === "ProsesBisnis",
      );
      const result = filteredData.map((item: any) => ({
        value: item.Id,
        label: `${item.kode_referensi} ${item.nama_referensi}`,
        kode: item.kode_referensi,
      }));
      set_rab_1_3(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAB Level 1 - 3", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRab_4 = async () => {
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
        (pohon: any) => pohon.level_pohon === 4,
      );
      const result = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama_pohon,
      }));
      set_rab_4(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAB Level 4", err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRab_5_6 = async (jenis: string, value: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerjahirarki/${value}`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const result = data.data[jenis].map((item: any) => ({
        value: item.id,
        label: item.nama_pohon,
      }));
      set_rab_5_6(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAB Level 5 - 6", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<formValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      kode_opd: user?.roles == 'admin_kota' ? SelectedOpd : user?.kode_opd,
      sasaran_kota_id: data.sasaran_kota_id?.value,
      bidang_urusan_id: data.bidang_urusan_id?.value,
      rab_level_1_id: data.rab_level_1_id?.value,
      rab_level_2_id: data.rab_level_2_id?.value,
      rab_level_3_id: data.rab_level_3_id?.value,
      rab_level_4_id: data.rab_level_4_id?.value,
      rab_level_5_id: data.rab_level_5_id?.value,
      rab_level_6_id: data.rab_level_6_id?.value,
      tahun: data.tahun?.value,
    };
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd == "" || SelectedOpd == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
      } else {
        // console.log(formData);
        try {
          const response = await fetch(`${API_URL}/v1/updateprosesbisnis/${id}`, {
            method: "PUT",
            headers: {
              'Authorization': `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            AlertNotification("Berhasil", "Data Proses Bisnis Berhasil Di Edit", "success", 1000);
            router.push("/ProsesBisnis");
          } else {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error");
          }
        } catch (error) {
          alert("Data Proses Bisnis gagal diperbarui");
        }
      }
    } else {
      // console.log(formData);
      try {
        const response = await fetch(`${API_URL}/v1/updateprosesbisnis/${id}`, {
          method: "PUT",
          headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          AlertNotification("Berhasil", "Data Proses Bisnis Berhasil Di Edit", "success", 1000);
          router.push("/ProsesBisnis");
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error");
        }
      } catch (error) {
        alert("Data Proses Bisnis gagal diperbarui");
      }
    }
  };

  return (
    <div className="border p-5 rounded-xl shadow-xl">
      <h1 className="uppercase font-bold">Form Edit Data Proses Bisnis:</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isClient && (
          <>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="tahun"
              >
                Tahun:
              </label>
              <Controller
                name="tahun"
                control={control}
                rules={{ required: "Tahun harus terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tahun"
                      value={selectedTahun}
                      options={tahun_option}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedTahun(option);
                      }}
                      isClearable={true}
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
                      id="sasaran_kota_id"
                      isLoading={isLoading}
                      value={selectedSasaranKota || null}
                      placeholder="Pilih Sasaran kota"
                      options={sasaran_kota_option}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedSasaranKota(option);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (sasaran_kota_option.length === 0) {
                          fetchSasaranKota();
                        }
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                htmlFor="bidang_urusan_id"
              >
                Bidang Urusan:
              </label>
              <Controller
                name="bidang_urusan_id"
                control={control}
                rules= {{required: "Bidang Urusan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="bidang_urusan_id"
                      isLoading={isLoading}
                      value={selectedBidangUrusan || null}
                      placeholder="Pilih Bidang Urusan"
                      options={bidang_urusan_option}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedBidangUrusan(option);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (bidang_urusan_option.length === 0) {
                          fetchBidangUrusan();
                        }
                      }}
                      onMenuClose={() => set_bidang_urusan_option([])}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                htmlFor="rab_level_1_id"
              >
                RAB Level 1:
              </label>
              <Controller
                name="rab_level_1_id"
                control={control}
                rules={{required: "RAB Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_1_id"
                      value={selectedRab1 || null}
                      placeholder="Pilih RAB Level 1"
                      isLoading={isLoading}
                      options={rab_1_3}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab1(option);
                        setSelectedRab2(null);
                        setSelectedRab3(null);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rab_1_3.length === 0) {
                          fetchRab_1_3(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_1_3([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                rules={{required: "RAB Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_2_id"
                      value={selectedRab2 || null}
                      placeholder="Pilih RAB Level 2"
                      isLoading={isLoading}
                      options={rab_1_3}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab2(option);
                        setSelectedRab3(null);
                      }}
                      isClearable={true}
                      isDisabled={!selectedRab1}
                      onMenuOpen={() => {
                        if (selectedRab1?.kode) {
                          fetchRab_1_3(2, selectedRab1.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_1_3([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                rules={{required: "RAB Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_3_id"
                      value={selectedRab3 || null}
                      placeholder="Pilih RAB Level 3"
                      isLoading={isLoading}
                      options={rab_1_3}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab3(option);
                      }}
                      isClearable={true}
                      isDisabled={!selectedRab2}
                      onMenuOpen={() => {
                        if (selectedRab2?.kode) {
                          fetchRab_1_3(3, selectedRab2.kode);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_1_3([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                rules={{required: "Strategic Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_4_id"
                      value={selectedRab4 || null}
                      placeholder="Pilih Strategic"
                      isLoading={isLoading}
                      options={rab_4}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab4(option);
                        setSelectedRab5(null);
                        setSelectedRab6(null);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rab_4.length === 0) {
                          fetchRab_4();
                        }
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                rules={{required: "Tactical Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_5_id"
                      value={selectedRab5 || null}
                      placeholder="Pilih Tactical"
                      isLoading={isLoading}
                      options={rab_5_6}
                      isDisabled={!selectedRab4}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab5(option);
                        setSelectedRab6(null);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (selectedRab4?.value) {
                          fetchRab_5_6("tactical", selectedRab4.value);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_5_6([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
                rules={{required: "Operational Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rab_level_6_id"
                      value={selectedRab6 || null}
                      placeholder="Pilih Operational"
                      isLoading={isLoading}
                      options={rab_5_6}
                      isDisabled={!selectedRab5}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab6(option);
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (selectedRab5?.value) {
                          fetchRab_5_6("operational", selectedRab5.value);
                        }
                      }}
                      onMenuClose={() => {
                        set_rab_5_6([]);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        })
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
        <ButtonSc typee="submit" className="mt-5">Simpan</ButtonSc>
        <ButtonTr typee="button" className="mt-5" halaman_url="/ProsesBisnis">Batal</ButtonTr>
      </form>
    </div>
  );
};

export default FormEditData;
