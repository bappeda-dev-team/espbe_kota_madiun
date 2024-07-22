"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Select from "react-select";
import { useParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PopUp from "@/components/common/PopUp/PopUp";

interface OptionType {
  value: number;
  label: string;
}

interface formValue {
    nama_data : string,
    sifat_data : string,
    jenis_data : string,
    produsen_data : string,
    pj_data : string,
    kode_opd : string,
    informasi_terkait_input : string,
    informasi_terkait_output : string,
    interoprabilitas : string,
    tahun : OptionType | null,
    rad_level_1_id : OptionType | null,
    rad_level_2_id : OptionType | null,
    rad_level_3_id : OptionType | null,
    rad_level_4_id : OptionType | null,
    strategic_id : OptionType | null,
    tactical_id : OptionType | null,
    operational_id : OptionType | null;
}

interface rad_level_1_4 {
  Id: number;
  nama_referensi: string;
  kode_referensi: string;
  level_referensi: number;
}
interface rad_level_5_7 {
  id: number;
  nama_pohon: string;
  level_pohon: string;
}

const FormEditData = () => {
  const { Id } = useParams();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);

  const [rad_1_4, set_rad_1_4] = useState<OptionType[]>([]);
  const [rad_5_7, set_rad_5_7] = useState<OptionType[]>([]);

  //state untuk fetch default value data by id
  const [namaData, setNamaData] = useState<string>("");
  const [selectedSifatData, setSelectedSifatData] = useState<string>("");
  const [selectedJenisData, setSelectedJenisData] = useState<string>("");
  const [selectedProdusenData, setSelectedProdusenData] = useState<string>("");
  const [selectedPjData, setSelectedPjData] = useState<string>("");
  const [kode_opd, set_kode_opd] = useState<string>("");
  const [selectedInformasiTerkaitInput, setSelectedInformasiTerkaitInput] = useState<string>("");
  const [selectedInformasiTerkaitOutput, setSelectedInformasiTerkaitOutput] = useState<string>("");
  const [selectedInteroprabilitas, setSelectedInteroprabilitas] = useState<string>("");
  
  const [selectedTahun, setSelectedTahun] = useState<OptionType | null>(null);
  const [selectedRad1, setSelectedRad1] = useState<OptionType | null>(null);
  const [selectedRad2, setSelectedRad2] = useState<OptionType | null>(null);
  const [selectedRad3, setSelectedRad3] = useState<OptionType | null>(null);
  const [selectedRad4, setSelectedRad4] = useState<OptionType | null>(null);
  const [selectedStrategic, setSelectedStrategic] = useState<OptionType | null>(null);
  const [selectedTactical, setSelectedTactical] = useState<OptionType | null>(null);
  const [selectedOperational, setSelectedOperational] = useState<OptionType | null>(null);

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
        const response = await fetch(`${API_URL}/v1/datainformasibyid/${Id}`);
        const data = await response.json();
        const result = data.data;
        
        if (result.NamaData) {
          setNamaData(result.NamaData);
          reset((prev) => ({...prev, nama_data: result.NamaData,}));
        }
        if (result.SifatData) {
          setSelectedSifatData(result.SifatData);
          reset((prev) => ({...prev, sifat_data: result.SifatData,}));
        }
        if (result.JenisData) {
          setSelectedJenisData(result.JenisData);
          reset((prev) => ({...prev, jenis_data: result.JenisData,}));
        }
        if (result.SifatData) {
          setSelectedProdusenData(result.ProdusenData);
          reset((prev) => ({...prev, produsen_data: result.ProdusenData,}));
        }
        if (result.PjData) {
          setSelectedPjData(result.PjData);
          reset((prev) => ({...prev, pj_data: result.PjData,}));
        }
        if (result.KodeOPD) {
          set_kode_opd(result.KodeOPD);
          reset((prev) => ({...prev, kode_opd: result.KodeOPD,}));
        }
        if (result.InformasiTerkaitInput) {
          setSelectedInformasiTerkaitInput(result.InformasiTerkaitInput);
          reset((prev) => ({...prev, informasi_terkait_input: result.InformasiTerkaitInput,}));
        }
        if (result.InformasiTerkaitOutput) {
          setSelectedInformasiTerkaitOutput(result.InformasiTerkaitOutput);
          reset((prev) => ({ ...prev, informasi_terkait_output: result.InformasiTerkaitOutput }));
        }
        if (result.Interoprabilitas) {
          setSelectedInteroprabilitas(result.Interoprabilitas);
          reset((prev) => ({ ...prev, interoprabilitas: result.Interoprabilitas }));
        }

        if (result.Tahun) {
          const selectedTahun = {
            value: result.Tahun,
            label: result.Tahun,
          };
          setSelectedTahun(selectedTahun);
          reset((prev) => ({ ...prev, tahun: selectedTahun }));
        }
        if (result.RadLevel1id) {
          const radLevel1Option = {
            value: result.RadLevel1id.Id,
            label: `${result.RadLevel1id.kode_referensi} ${result.RadLevel1id.nama_referensi}`,
          };
          setSelectedRad1(radLevel1Option);
          reset((prev) => ({ ...prev, rad_level_1_id: radLevel1Option }));
        }
        if (result.RadLevel2id) {
          const radLevel2Option = {
            value: result.RadLevel2id.Id,
            label: `${result.RadLevel2id.kode_referensi} ${result.RadLevel2id.nama_referensi}`,
          };
          setSelectedRad2(radLevel2Option);
          reset((prev) => ({ ...prev, rad_level_2_id: radLevel2Option }));
        }
        if (result.RadLevel3id) {
          const radLevel3Option = {
            value: result.RadLevel3id.Id,
            label: `${result.RadLevel3id.kode_referensi} ${result.RadLevel3id.nama_referensi}`,
          };
          setSelectedRad3(radLevel3Option);
          reset((prev) => ({ ...prev, rad_level_3_id: radLevel3Option }));
        }
        if (result.RadLevel4id) {
          const radLevel4Option = {
            value: result.RadLevel4id.Id,
            label: `${result.RadLevel4id.kode_referensi} ${result.RadLevel4id.nama_referensi}`,
          };
          setSelectedRad4(radLevel4Option);
          reset((prev) => ({ ...prev, rad_level_4_id: radLevel4Option }));
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
  }, [reset, Id]);

  //fetching data RAL 1 - 4
  const fetchRad_1_4 = async (level: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (item: any) => item.level_referensi === level && item.jenis_referensi === "DataDanInformasi",
      );
      const result = filteredData.map((item: any) => ({
        value: item.Id,
        label: `${item.kode_referensi} ${item.nama_referensi}`,
      }));
      set_rad_1_4(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAD Level 1 - 4", err);
    } finally {
      setIsLoading(false);
    }
  };

  //fetching data RAL 5 - 7
  const fetchRad_5_7 = async (pohon_kinerja: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (pohon: any) => pohon.jenis_pohon === pohon_kinerja,
      );
      const result = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama_pohon,
      }));
      set_rad_5_7(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAD Level 5 - 7", err);
    } finally {
      setIsLoading(false);
    }
  };

  //
  const handleChange = (option: any, actionMeta: any) => {
    if (actionMeta.name === "rad_level_1_id") {
      setSelectedRad1(option);
    } else if (actionMeta.name === "rad_level_2_id") {
      setSelectedRad2(option);
    } else if (actionMeta.name === "rad_level_3_id") {
      setSelectedRad3(option);
    } else if (actionMeta.name === "rad_level_4_id") {
      setSelectedRad4(option);
    } else if (actionMeta.name === "strategic_id") {
      setSelectedStrategic(option);
    } else if (actionMeta.name === "tactical_id") {
      setSelectedTactical(option);
    } else if (actionMeta.name === "operational_id") {
      setSelectedOperational(option);
    } else if (actionMeta.name === "tahun") {
      setSelectedTahun(option);
    }
  };

  //aski form di submit
  const onSubmit: SubmitHandler<formValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      nama_data: data.nama_data,
      sifat_data: data.sifat_data,
      jenis_data: data.jenis_data,
      produsen_data: data.produsen_data,
      pj_data: data.pj_data,
      kode_opd: "5.01.5.05.0.00.02.0000",
      informasi_terkait_input: data.informasi_terkait_input,
      informasi_terkait_output: data.informasi_terkait_output,
      interoprabilitas: data.interoprabilitas,
      tahun: data.tahun?.value,
      rad_level_1_id: data.rad_level_1_id?.value,
      rad_level_2_id: data.rad_level_2_id?.value,
      rad_level_3_id: data.rad_level_3_id?.value,
      rad_level_4_id: data.rad_level_4_id?.value,
      strategic_id: data.strategic_id?.value,
      tactical_id: data.tactical_id?.value,
      operational_id: data.operational_id?.value,
    };
    try {
      const response = await fetch(`${API_URL}/v1/updatedatainformasi/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPopup(true);
        setEdited(true)
        reset();
      } else {
        setPopup(true);
        setEdited(false);
      }
    } catch (error) {
        setPopup(true);
        setEdited(false);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form Edit Data Informasi :</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="nama_data"
          >
            Nama Data Informasi :
          </label>
          <Controller
            name="nama_data"
            control={control}
            rules={{ required: "Nama Data Informasi harus terisi" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="nama_data"
                  type="text"
                  value={field.value || namaData}
                  onChange={(e) => {
                    field.onChange(e);
                    setNamaData(e.target.value);
                  }}
                />
                {errors.nama_data && (
                  <h1 className="text-red-500">
                    {errors.nama_data.message}
                  </h1>
                )}
              </>
            )}
          />
        </div>
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
            rules={{required: "Sifat Data Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="sifat_data"
                  type="text"
                  value={field.value || selectedSifatData}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedSifatData(e.target.value);
                  }}
                />
                {errors.nama_data && <h1 className="text-red-500">{errors.nama_data.message}</h1>}
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
            rules={{required: "Jenis Data Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="jenis_data"
                  type="text"
                  value={field.value || selectedJenisData}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedJenisData(e.target.value);
                  }}
                />
                {errors.jenis_data && <h1 className="text-red-500">{errors.jenis_data.message}</h1>}
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
            rules={{required: "Produse Data Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="produsen_data"
                  type="text"
                  value={field.value || selectedProdusenData}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedProdusenData(e.target.value);
                  }}
                />
                {errors.produsen_data && <h1 className="text-red-500">{errors.produsen_data.message}</h1>}
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
            rules={{required: "Penanggung Jawab Data Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="pj_data"
                  type="text"
                  value={field.value || selectedPjData}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedPjData(e.target.value);
                  }}
                />
                {errors.pj_data && <h1 className="text-red-500">{errors.pj_data.message}</h1>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="kode_opd"
          >
            Kode OPD:
          </label>
          <Controller
            name="kode_opd"
            control={control}
            rules={{ required: "Kode OPD harus terisi" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="kode_opd"
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    set_kode_opd(e.target.value);
                  }}
                />
                {errors.kode_opd && (
                  <h1 className="text-red-500">{errors.kode_opd.message}</h1>
                )}
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
            rules={{required: "Informasi Terkait Input Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="informasi_terkait_input"
                  type="text"
                  value={field.value || selectedInformasiTerkaitInput}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedInformasiTerkaitInput(e.target.value);
                  }}
                />
                {errors.informasi_terkait_input && <h1 className="text-red-500">{errors.informasi_terkait_input.message}</h1>}
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
            rules={{required: "Informasi Terkait Output Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="informasi_terkait_output"
                  type="text"
                  value={field.value || selectedInformasiTerkaitOutput}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedInformasiTerkaitOutput(e.target.value);
                  }}
                />
                {errors.informasi_terkait_output && <h1 className="text-red-500">{errors.informasi_terkait_output.message}</h1>}
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
            rules={{required: "Interoprabilitas Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="interoprabilitas"
                  type="text"
                  value={field.value || selectedInteroprabilitas}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedInteroprabilitas(e.target.value);
                  }}
                />
                {errors.interoprabilitas && <h1 className="text-red-500">{errors.interoprabilitas.message}</h1>}
              </>
            )}
          />
        </div>


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
                        handleChange(option, { name: "tahun" });
                      }}
                      isClearable={true}
                    />
                    {errors.tahun && (
                      <h1 className="text-red-500">{errors.tahun.message}</h1>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_1_id"
              >
                RAD Level 1 :
              </label>
              <Controller
                name="rad_level_1_id"
                control={control}
                rules={{required: "RAD Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rad_level_1_id"
                      value={selectedRad1 || null}
                      placeholder="Pilih RAD Level 1"
                      isLoading={isLoading}
                      options={rad_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "rad_level_1_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_1_4.length === 0) {
                          fetchRad_1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_1_4([]);
                      }}
                    />
                    {errors.rad_level_1_id && (<h1 className="text-red-500">{errors.rad_level_1_id.message}</h1>)}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_2_id"
              >
                RAD Level 2 :
              </label>
              <Controller
                name="rad_level_2_id"
                control={control}
                rules={{required: "RAD Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rad_level_2_id"
                      value={selectedRad2 || null}
                      placeholder="Pilih RAD Level 2"
                      isLoading={isLoading}
                      options={rad_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "rad_level_2_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_1_4.length === 0) {
                          fetchRad_1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_1_4([]);
                      }}
                    />
                    {errors.rad_level_2_id && (<h1 className="text-red-500">{errors.rad_level_2_id.message}</h1>)}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_3_id"
              >
                RAD Level 3 :
              </label>
              <Controller
                name="rad_level_3_id"
                control={control}
                rules={{required: "RAD Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rad_level_3_id"
                      value={selectedRad3 || null}
                      placeholder="Pilih RAD Level 3"
                      isLoading={isLoading}
                      options={rad_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "rad_level_3_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_1_4.length === 0) {
                          fetchRad_1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_1_4([]);
                      }}
                    />
                    {errors.rad_level_3_id && (<h1 className="text-red-500">{errors.rad_level_3_id.message}</h1>)}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rad_level_4_id"
              >
                RAD Level 4 :
              </label>
              <Controller
                name="rad_level_4_id"
                control={control}
                rules={{required: "RAD Level 4 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="rad_level_4_id"
                      value={selectedRad4 || null}
                      placeholder="Pilih RAD Level 4"
                      isLoading={isLoading}
                      options={rad_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "rad_level_4_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_1_4.length === 0) {
                          fetchRad_1_4(4);
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_1_4([]);
                      }}
                    />
                    {errors.rad_level_4_id && (<h1 className="text-red-500">{errors.rad_level_4_id.message}</h1>)}
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
                rules={{required: "Strategic Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="strategic_id"
                      value={selectedStrategic || null}
                      placeholder="Pilih Strategic"
                      isLoading={isLoading}
                      options={rad_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "strategic_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_5_7.length === 0) {
                          fetchRad_5_7("Strategic");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_5_7([]);
                      }}
                    />
                    {errors.strategic_id && (<h1 className="text-red-500">{errors.strategic_id.message}</h1>)}
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
                rules={{required: "Tactical Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tactical_id"
                      value={selectedTactical || null}
                      placeholder="Pilih RAB Level 5"
                      isLoading={isLoading}
                      options={rad_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "tactical_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_5_7.length === 0) {
                          fetchRad_5_7("Tactical");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_5_7([]);
                      }}
                    />
                    {errors.tactical_id && (<h1 className="text-red-500">{errors.tactical_id.message}</h1>)}
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
                rules={{required: "Operational Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="operational_id"
                      value={selectedOperational || null}
                      placeholder="Pilih Operational"
                      isLoading={isLoading}
                      options={rad_5_7}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "operational_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (rad_5_7.length === 0) {
                          fetchRad_5_7("Operational");
                        }
                      }}
                      onMenuClose={() => {
                        set_rad_5_7([]);
                      }}
                    />
                    {errors.operational_id && (<h1 className="text-red-500">{errors.operational_id.message}</h1>)}
                  </>
                )}
              />
            </div>
          </>
        )}
        <Button typee="submit">Simpan</Button>
      </form>
      <PopUp isOpen={popup} onClose={() => setPopup(false)}>
        <div className="flex flex-col justify-around">
          {edited ?
            <h1>Berhasil edit data informasi</h1>
            :
            <h1>Gagal edit data informasi, periksa koneksi internet atau database server</h1>
          }
          <Button 
            className="mt-5"
            onClick={() => {
              setPopup(false);
              setEdited(false);
              router.push("/DataInformasi")
            }}
          >
            Tutup
          </Button>
        </div>
      </PopUp>
    </div>
  );
};

export default FormEditData;
