"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Select from "react-select";
import { useParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface OptionType {
  value: number;
  label: string;
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
    tahun : OptionType | null,
    raa_level_1_id : OptionType | null,
    raa_level_2_id : OptionType | null,
    raa_level_3_id : OptionType | null,
    strategic_id : OptionType | null,
    tactical_id : OptionType | null,
    operational_id : OptionType | null;
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

  const [raa_1_4, set_raa_1_4] = useState<OptionType[]>([]);
  const [raa_5_7, set_raa_5_7] = useState<OptionType[]>([]);

  //state untuk fetch default value data by id
  const [namaAplikasi, setNamaAplikasi] = useState<string>("");
  const [selectedFungsiAplikasi, setSelectedFungsiAplikasi] = useState<string>("");
  const [selectedProdusenAplikasi, setSelectedProdusenAplikasi] = useState<string>("");
  const [selectedPjAplikasi, setSelectedPjAplikasi] = useState<string>("");
  const [kode_opd, set_kode_opd] = useState<string>("");
  const [selectedInformasiTerkaitInput, setSelectedInformasiTerkaitInput] = useState<string>("");
  const [selectedInformasiTerkaitOutput, setSelectedInformasiTerkaitOutput] = useState<string>("");
  
  const [selectedJenisAplikasi, setSelectedJenisAplikasi] = useState<OptionTypeString | null>(null);
  const [selectedInteroprabilitas, setSelectedInteroprabilitas] = useState<OptionTypeString | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<OptionType | null>(null);
  const [selectedRaa1, setSelectedRaa1] = useState<OptionType | null>(null);
  const [selectedRaa2, setSelectedRaa2] = useState<OptionType | null>(null);
  const [selectedRaa3, setSelectedRaa3] = useState<OptionType | null>(null);
  const [selectedRaa4, setSelectedRaa4] = useState<OptionType | null>(null);
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
        const response = await fetch(`${API_URL}/v1/aplikasibyid/${Id}`);
        const data = await response.json();
        const result = data.data;
        
        if (result.NamaAplikasi) {
          setNamaAplikasi(result.NamaAplikasi);
          reset((prev) => ({...prev, nama_aplikasi: result.NamaAplikasi,}));
        }
        if (result.FungsiAplikasi) {
          setSelectedFungsiAplikasi(result.FungsiAplikasi);
          reset((prev) => ({...prev, fungsi_aplikasi: result.FungsiAplikasi,}));
        }
        if (result.SifatAplikasi) {
          setSelectedProdusenAplikasi(result.ProdusenAplikasi);
          reset((prev) => ({...prev, produsen_aplikasi: result.ProdusenAplikasi,}));
        }
        if (result.ProdusenAplikasi) {
          setSelectedProdusenAplikasi(result.ProdusenAplikasi);
          reset((prev) => ({...prev, produsen_aplikasi: result.ProdusenAplikasi,}));
        }
        if (result.PjAplikasi) {
          setSelectedPjAplikasi(result.PjAplikasi);
          reset((prev) => ({...prev, pj_aplikasi: result.PjAplikasi,}));
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
        
        //default dropdown
        if (result.Interoprabilitas) {
          const selectedInteroprabilitas = {
            value: result.Interoprabilitas,
            label: result.Interoprabilitas,
          };
          setSelectedInteroprabilitas(selectedInteroprabilitas);
          reset((prev) => ({ ...prev, interoprabilitas: selectedInteroprabilitas }));
        }
        if (result.JenisAplikasi) {
          const selectedJenisAplikasi = {
            value: result.JenisAplikasi,
            label: result.JenisAplikasi,
          };
          setSelectedJenisAplikasi(selectedJenisAplikasi);
          reset((prev) => ({...prev, jenis_aplikasi: selectedJenisAplikasi,}));
        }
        if (result.Tahun) {
          const selectedTahun = {
            value: result.Tahun,
            label: result.Tahun,
          };
          setSelectedTahun(selectedTahun);
          reset((prev) => ({ ...prev, tahun: selectedTahun }));
        }
        if (result.RaaLevel1id) {
          const raaLevel1Option = {
            value: result.RaaLevel1id.Id,
            label: `${result.RaaLevel1id.kode_referensi} ${result.RaaLevel1id.nama_referensi}`,
          };
          setSelectedRaa1(raaLevel1Option);
          reset((prev) => ({ ...prev, raa_level_1_id: raaLevel1Option }));
        }
        if (result.RaaLevel2id) {
          const raaLevel2Option = {
            value: result.RaaLevel2id.Id,
            label: `${result.RaaLevel2id.kode_referensi} ${result.RaaLevel2id.nama_referensi}`,
          };
          setSelectedRaa2(raaLevel2Option);
          reset((prev) => ({ ...prev, raa_level_2_id: raaLevel2Option }));
        }
        if (result.RaaLevel3id) {
          const raaLevel3Option = {
            value: result.RaaLevel3id.Id,
            label: `${result.RaaLevel3id.kode_referensi} ${result.RaaLevel3id.nama_referensi}`,
          };
          setSelectedRaa3(raaLevel3Option);
          reset((prev) => ({ ...prev, raa_level_3_id: raaLevel3Option }));
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
  const fetchRaa_1_4 = async (level: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/referensiarsitektur`);
      const data = await response.json();
      const filteredData = data.data.filter(
        (item: any) => item.level_referensi === level && item.jenis_referensi === "Aplikasi",
      );
      const result = filteredData.map((item: any) => ({
        value: item.Id,
        label: `${item.kode_referensi} ${item.nama_referensi}`,
      }));
      set_raa_1_4(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAA Level 1 - 3", err);
    } finally {
      setIsLoading(false);
    }
  };

  //fetching data RAL 5 - 7
  const fetchRaa_5_7 = async (pohon_kinerja: any) => {
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
      set_raa_5_7(result);
    } catch (err) {
      console.log("Gagal memuat data Option RAA Level 5 - 7", err);
    } finally {
      setIsLoading(false);
    }
  };

  //
  const handleChange = (option: any, actionMeta: any) => {
    if (actionMeta.name === "raa_level_1_id") {
      setSelectedRaa1(option);
    } else if (actionMeta.name === "raa_level_2_id") {
      setSelectedRaa2(option);
    } else if (actionMeta.name === "raa_level_3_id") {
      setSelectedRaa3(option);
    } else if (actionMeta.name === "raa_level_4_id") {
      setSelectedRaa4(option);
    } else if (actionMeta.name === "strategic_id") {
      setSelectedStrategic(option);
    } else if (actionMeta.name === "tactical_id") {
      setSelectedTactical(option);
    } else if (actionMeta.name === "operational_id") {
      setSelectedOperational(option);
    } else if (actionMeta.name === "tahun") {
      setSelectedTahun(option);
    } else if (actionMeta.name === "jenis_aplikasi") {
      setSelectedJenisAplikasi(option);
    } else if (actionMeta.name === "interoprabilitas") {
      setSelectedInteroprabilitas(option);
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
      kode_opd: "5.01.5.05.0.00.02.0000",
      informasi_terkait_input: data.informasi_terkait_input,
      informasi_terkait_output: data.informasi_terkait_output,
      interoprabilitas: data.interoprabilitas?.value,
      tahun: data.tahun?.value,
      raa_level_1_id: data.raa_level_1_id?.value,
      raa_level_2_id: data.raa_level_2_id?.value,
      raa_level_3_id: data.raa_level_3_id?.value,
      strategic_id: data.strategic_id?.value,
      tactical_id: data.tactical_id?.value,
      operational_id: data.operational_id?.value,
    };
    try {
        const response = await fetch(`${API_URL}/v1/updateaplikasi/${Id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          AlertNotification("Berhasil", "Data Aplikasi Berhasil Diubah", "success", 1000);
          router.push("/Aplikasi");
          reset();
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } catch (error) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form Edit Aplikasi :</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col py-3">
          <label
            className="uppercase text-xs font-bold text-gray-700 my-2"
            htmlFor="nama_aplikasi"
          >
            Nama Aplikasi :
          </label>
          <Controller
            name="nama_aplikasi"
            control={control}
            rules={{ required: "Nama Aplikasi harus terisi" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="nama_aplikasi"
                  type="text"
                  value={field.value || namaAplikasi}
                  onChange={(e) => {
                    field.onChange(e);
                    setNamaAplikasi(e.target.value);
                  }}
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
            rules={{required: "Fungsi Aplikasi Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="fungsi_aplikasi"
                  type="text"
                  value={field.value || selectedFungsiAplikasi}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedFungsiAplikasi(e.target.value);
                  }}
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
            rules={{required: "Produse Aplikasi Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="produsen_aplikasi"
                  type="text"
                  value={field.value || selectedProdusenAplikasi}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedProdusenAplikasi(e.target.value);
                  }}
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
            rules={{required: "Penanggung Jawab Aplikasi Harus Terisi"}}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="border px-4 py-2 rounded"
                  id="pj_aplikasi"
                  type="text"
                  value={field.value || selectedPjAplikasi}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedPjAplikasi(e.target.value);
                  }}
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
                rules={{ required: "Jenis Aplikasi harus terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="jenis_aplikasi"
                      value={selectedJenisAplikasi}
                      options={JenisAplikasi}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "jenis_aplikasi" });
                      }}
                      isClearable={true}
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
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="interoprabilitas"
              >
                Interoprabilitas :
              </label>
              <Controller
                name="interoprabilitas"
                control={control}
                rules={{ required: "Interoprabilitas harus terisi" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="tahun"
                      value={selectedInteroprabilitas}
                      options={interoprabilitas}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "interoprabilitas" });
                      }}
                      isClearable={true}
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
                      <h1 className="text-slate-300 text-xs">*Tahun Harus Terisi</h1>
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
                RAA Level 1 :
              </label>
              <Controller
                name="raa_level_1_id"
                control={control}
                rules={{required: "RAA Level 1 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="raa_level_1_id"
                      value={selectedRaa1 || null}
                      placeholder="Pilih RAA Level 1"
                      isLoading={isLoading}
                      options={raa_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "raa_level_1_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_1_4.length === 0) {
                          fetchRaa_1_4(1);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
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
                RAA Level 2 :
              </label>
              <Controller
                name="raa_level_2_id"
                control={control}
                rules={{required: "RAA Level 2 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="raa_level_2_id"
                      value={selectedRaa2 || null}
                      placeholder="Pilih RAA Level 2"
                      isLoading={isLoading}
                      options={raa_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "raa_level_2_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_1_4.length === 0) {
                          fetchRaa_1_4(2);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
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
                RAA Level 3 :
              </label>
              <Controller
                name="raa_level_3_id"
                control={control}
                rules={{required: "RAA Level 3 Harus Terisi"}}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      id="raa_level_3_id"
                      value={selectedRaa3 || null}
                      placeholder="Pilih RAA Level 3"
                      isLoading={isLoading}
                      options={raa_1_4}
                      onChange={(option) => {
                        field.onChange(option);
                        handleChange(option, { name: "raa_level_3_id" });
                      }}
                      isClearable={true}
                      onMenuOpen={() => {
                        if (raa_1_4.length === 0) {
                          fetchRaa_1_4(3);
                        }
                      }}
                      onMenuClose={() => {
                        set_raa_1_4([]);
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
                rules={{required: "Strategic Harus Terisi"}}
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
                rules={{required: "Tactical Harus Terisi"}}
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
                rules={{required: "Operational Harus Terisi"}}
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
        <Button typee="submit">Simpan</Button>
        <Button typee="button" className="mt-5 bg-red-500" halaman_url="/Aplikasi">
          Batal
        </Button>
      </form>
    </div>
  );
};

export default FormEditData;
