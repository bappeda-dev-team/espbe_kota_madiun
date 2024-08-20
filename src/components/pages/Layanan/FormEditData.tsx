"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getUser, getToken } from "@/app/Login/Auth/Auth";

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

const FormEditData = () => {
  const { Id } = useParams();
  const token = getToken();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const [ral_1_4, set_ral_1_4] = useState<OptionType[]>([]);
  const [ral_5_7, set_ral_5_7] = useState<OptionType[]>([]);

  //state untuk fetch default value data by id
  const [namaLayanan, setNamaLayanan] = useState<string>("");
  const [selectedFungsiLayanan, setSelectedFungsiLayanan] = useState<string>("");
  const [kode_opd, set_kode_opd] = useState<string>("");
  const [selectedKementrianTerkait, setSelectedKementrianTerkait] = useState<string>("");
  
  const [selectedMetodeLayanan, setSelectedMetodeLayanan] = useState<OptionTypeString | null>(null);
  const [selectedTujuanLayanan, setSelectedTujuanLayanan] = useState<OptionType | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<OptionType | null>(null);
  const [selectedRal1, setSelectedRal1] = useState<OptionType | null>(null);
  const [selectedRal2, setSelectedRal2] = useState<OptionType | null>(null);
  const [selectedRal3, setSelectedRal3] = useState<OptionType | null>(null);
  const [selectedRal4, setSelectedRal4] = useState<OptionType | null>(null);
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
        const response = await fetch(`${API_URL}/v1/layananspbebyid/${Id}`, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        const data = await response.json();
        const result = data.data;
        
        if (result.NamaLayanan) {
          setNamaLayanan(result.NamaLayanan);
          reset((prev) => ({...prev, nama_layanan: result.NamaLayanan,}));
        }
        if (result.FungsiLayanan) {
          setSelectedFungsiLayanan(result.FungsiLayanan);
          reset((prev) => ({...prev, fungsi_layanan: result.FungsiLayanan,}));
        }
        if (result.KodeOPD) {
          set_kode_opd(result.KodeOPD);
          reset((prev) => ({...prev, kode_opd: result.KodeOPD,}));
        }
        if (result.KementrianTerkait) {
          setSelectedKementrianTerkait(result.KementrianTerkait);
          reset((prev) => ({ ...prev, kementrian_terkait: result.KementrianTerkait }));
        }
        
        if (result.MetodeLayanan) {
          const MetodeLayananOption = {
            value: result.MetodeLayanan,
            label: result.MetodeLayanan,
          };
          setSelectedMetodeLayanan(MetodeLayananOption);
          reset((prev) => ({ ...prev, metode_layanan: result.MetodeLayanan }));
        }
        if (result.TujuanLayananId) {
          const tujuanLayananOption = {
            value: result.TujuanLayananId.id,
            label: result.TujuanLayananId.nama_pohon,
          };
          setSelectedTujuanLayanan(tujuanLayananOption);
          reset((prev) => ({ ...prev, tujuan_layanan_id: tujuanLayananOption }));
        }
        if (result.Tahun) {
          const selectedTahun = {
            value: result.Tahun,
            label: result.Tahun,
          };
          setSelectedTahun(selectedTahun);
          reset((prev) => ({ ...prev, tahun: selectedTahun }));
        }
        if (result.RalLevel1id) {
          const ralLevel1Option = {
            value: result.RalLevel1id.Id,
            label: `${result.RalLevel1id.kode_referensi} ${result.RalLevel1id.nama_referensi}`,
          };
          setSelectedRal1(ralLevel1Option);
          reset((prev) => ({ ...prev, ral_level_1_id: ralLevel1Option }));
        }
        if (result.RalLevel2id) {
          const ralLevel2Option = {
            value: result.RalLevel2id.Id,
            label: `${result.RalLevel2id.kode_referensi} ${result.RalLevel2id.nama_referensi}`,
          };
          setSelectedRal2(ralLevel2Option);
          reset((prev) => ({ ...prev, ral_level_2_id: ralLevel2Option }));
        }
        if (result.RalLevel3id) {
          const ralLevel3Option = {
            value: result.RalLevel3id.Id,
            label: `${result.RalLevel3id.kode_referensi} ${result.RalLevel3id.nama_referensi}`,
          };
          setSelectedRal3(ralLevel3Option);
          reset((prev) => ({ ...prev, ral_level_3_id: ralLevel3Option }));
        }
        if (result.RalLevel4id) {
          const ralLevel4Option = {
            value: result.RalLevel4id.Id,
            label: `${result.RalLevel4id.kode_referensi} ${result.RalLevel4id.nama_referensi}`,
          };
          setSelectedRal4(ralLevel4Option);
          reset((prev) => ({ ...prev, ral_level_4_id: ralLevel4Option }));
        }
        if (result.StrategicId) {
          const strategicOption = {
            value: result.StrategicId.id,
            label: result.StrategicId.nama_pohon,
          };
          setSelectedStrategic(strategicOption);
          reset((prev) => ({ ...prev, strategic_id: strategicOption }));
        }
        if (result.TacticalId) {
          const tacticalOption = {
            value: result.TacticalId.id,
            label: result.TacticalId.nama_pohon,
          };
          setSelectedTactical(tacticalOption);
          reset((prev) => ({ ...prev, tactical_id: tacticalOption }));
        }
        if (result.OperationalId) {
          const operationalOption = {
            value: result.OperationalId.id,
            label: result.OperationalId.nama_pohon,
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
  }, [reset, Id, token]);

  //fetching data RAL 1 - 4
  const fetchRal_1_4 = async (level: number) => {
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
        (item: any) => item.level_referensi === level && item.jenis_referensi === "Layanan",
      );
      const result = filteredData.map((item: any) => ({
        value: item.Id,
        label: `${item.kode_referensi} ${item.nama_referensi}`,
      }));
      set_ral_1_4(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAL Level 1 - 3", err);
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
    if (actionMeta.name === "tujuan_layanan_id") {
      setSelectedTujuanLayanan(option);
    } else if (actionMeta.name === "ral_level_1_id") {
      setSelectedRal1(option);
    } else if (actionMeta.name === "ral_level_2_id") {
      setSelectedRal2(option);
    } else if (actionMeta.name === "ral_level_3_id") {
      setSelectedRal3(option);
    } else if (actionMeta.name === "ral_level_4_id") {
      setSelectedRal4(option);
    } else if (actionMeta.name === "strategic_id") {
      setSelectedStrategic(option);
    } else if (actionMeta.name === "tactical_id") {
      setSelectedTactical(option);
    } else if (actionMeta.name === "operational_id") {
      setSelectedOperational(option);
    } else if (actionMeta.name === "tahun") {
      setSelectedTahun(option);
    } else if (actionMeta.name === "metode_layanan") {
      setSelectedMetodeLayanan(option);
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
      kode_opd: user?.kode_opd,
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
      const response = await fetch(`${API_URL}/v1/updatelayananspbe/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        AlertNotification("Berhasil", "Berhasil edit data layanan", "success", 1000);
        router.push("/Layanan/LayananSPBE")
      } else {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    } catch (error) {
        AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form Edit Data Layanan SPBE:</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="nama_layanan"
          >
            Nama Layanan :
          </label>
          <Controller
            name="nama_layanan"
            control={control}
            rules={{ required: "Nama Layanan harus terisi" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="nama_layanan"
                  type="text"
                  value={field.value || namaLayanan}
                  onChange={(e) => {
                    field.onChange(e);
                    setNamaLayanan(e.target.value);
                  }}
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
            Fungsi Layanan :
          </label>
          <Controller
            name="fungsi_layanan"
            control={control}
            rules={{required: "Fungsi Layanan Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="fungsi_layanan"
                  type="text"
                  value={field.value || selectedFungsiLayanan}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedFungsiLayanan(e.target.value);
                  }}
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
            Kementrian Terkait :
          </label>
          <Controller
            name="kementrian_terkait"
            control={control}
            rules={{required: "Kementrian Terkait Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="kementrian_terkait"
                  type="text"
                  value={field.value || selectedKementrianTerkait}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedKementrianTerkait(e.target.value);
                  }}
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
                Metode Layanan :
              </label>
              <Controller
                name="metode_layanan"
                control={control}
                rules={{ required: "Metode Layanan harus terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tahun"
                      value={selectedMetodeLayanan}
                      options={MetodeLayanan}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "metode_layanan" });
                      }}
                      isClearable={true}
                    />
                    {errors.metode_layanan ?
                      <h1 className="text-red-500">
                        {errors.metode_layanan.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Metode Layanan Layanan Harus Terisi</h1>
                    }
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="tujuan_layanan_id"
              >
                Tujuan Layanan :
              </label>
              <Controller
                name="tujuan_layanan_id"
                control={control}
                rules={{required: "Tujuan Layanan Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tujuan_layanan_id"
                      value={selectedTujuanLayanan || null}
                      placeholder="Pilih Tujuan Layanan"
                      options={ral_5_7}
                      isLoading={isLoading}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "tujuan_layanan_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if(ral_5_7.length === 0){
                          fetchRal_5_7("Operational")
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_5_7([])
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
                        handleChange(option, { name: "tahun" });
                      }}
                      isClearable={true}
                    />
                    {errors.tahun ?
                      <h1 className="text-red-500">
                        {errors.tahun.message}
                      </h1>
                      :
                      <h1 className="text-slate-300 text-xs">*Tahun Layanan Harus Terisi</h1>
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
                RAL Level 1 :
              </label>
              <Controller
                name="ral_level_1_id"
                control={control}
                rules={{required:"RAL Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="ral_level_1_id"
                      value={selectedRal1 || null}
                      placeholder="Pilih RAL Level 1"
                      isLoading={isLoading}
                      options={ral_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "ral_level_1_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_1_4.length === 0) {
                          fetchRal_1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_1_4([]);
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
                RAL Level 2 :
              </label>
              <Controller
                name="ral_level_2_id"
                control={control}
                rules={{required:"RAL Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="ral_level_2_id"
                      value={selectedRal2 || null}
                      placeholder="Pilih RAL Level 2"
                      isLoading={isLoading}
                      options={ral_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "ral_level_2_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_1_4.length === 0) {
                          fetchRal_1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_1_4([]);
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
                RAL Level 3 :
              </label>
              <Controller
                name="ral_level_3_id"
                control={control}
                rules={{required:"RAL Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="ral_level_3_id"
                      value={selectedRal3 || null}
                      placeholder="Pilih RAL Level 3"
                      isLoading={isLoading}
                      options={ral_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "ral_level_3_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_1_4.length === 0) {
                          fetchRal_1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_1_4([]);
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
                RAL Level 4 :
              </label>
              <Controller
                name="ral_level_4_id"
                control={control}
                rules={{required:"RAL Level 4 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="ral_level_4_id"
                      value={selectedRal4 || null}
                      placeholder="Pilih RAL Level 4"
                      isLoading={isLoading}
                      options={ral_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "ral_level_4_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (ral_1_4.length === 0) {
                          fetchRal_1_4(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_ral_1_4([]);
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
  );
};

export default FormEditData;
