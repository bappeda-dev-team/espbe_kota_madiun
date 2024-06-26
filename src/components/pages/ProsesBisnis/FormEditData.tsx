"use client"

import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button/Button';
import Select from 'react-select';
import { useParams } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface OptionType {
  value: number;
  label: string;
}

interface sasaran_kota {
  ID: number;
  Sasaran: string;
}

interface rab_level_1_3 {
  Id: number;
  kode_referensi: string;
  nama_referensi: string;
  level_referensi: number;
}

interface rab_level_4_6 {
  id: number;
  nama_pohon: string;
  level_pohon: number;
}

interface defaultValuePB {
  nama_proses_bisnis: string;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan_id?: number;
  tahun: number;
  sasaran_kota?: sasaran_kota;
  rab_level_1?: rab_level_1_3;
  rab_level_2?: rab_level_1_3;
  rab_level_3?: rab_level_1_3;
  rab_level_4?: rab_level_4_6;
  rab_level_5?: rab_level_4_6;
  rab_level_6?: rab_level_4_6;
}

interface formValue {
  nama_proses_bisnis: string;
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
  const {id} = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { control, handleSubmit, reset, formState: { errors } } = useForm<formValue>();
  const [sasaran_kota_option, set_sasaran_kota_option] = useState<OptionType[]>([]);
  const [bidang_urusan_option, set_bidang_urusan_option] = useState<OptionType[]>([]);
  const [rab_1_3, set_rab_1_3] = useState<OptionType[]>([]);
  const [rab_4_6, set_rab_4_6] = useState<OptionType[]>([]);
  const [selectedSasaranKota, setSelectedSasaranKota] = useState<OptionType | null>(null);
  const [selectedBidangUrusan, setSelectedBidangUrusan] = useState<OptionType | null>(null);
  const [selectedRab1, setSelectedRab1] = useState<OptionType | null>(null);
  const [selectedRab2, setSelectedRab2] = useState<OptionType | null>(null);
  const [selectedRab3, setSelectedRab3] = useState<OptionType | null>(null);
  const [selectedRab4, setSelectedRab4] = useState<OptionType | null>(null);
  const [selectedRab5, setSelectedRab5] = useState<OptionType | null>(null);
  const [selectedRab6, setSelectedRab6] = useState<OptionType | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<OptionType | null>(null)
  const [namaProsesBisnis, setNamaProsesBisnis] = useState<string>('');
  const [kode_opd, set_kode_opd] = useState<string>('');
  const [kode_proses_bisnis, set_kode_proses_bisnis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tahun_option: OptionType[] = [
    {value: 2024, label: "2024"},
    {value: 2025, label: "2025"},
    {value: 2026, label: "2026"},
    {value: 2027, label: "2027"},
    {value: 2028, label: "2028"},
    {value: 2029, label: "2029"},
    {value: 2030, label: "2030"},
  ]

  useEffect(() => {
    const fetchingDataId = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/prosesbisnisbyid/${id}`);
        const data = await response.json();
        const result = (data.data)

        if (result.sasaran_kota) {
          const sasaranKotaOption = {
            value: result.sasaran_kota.ID,
            label: result.sasaran_kota.Sasaran
          };
          setSelectedSasaranKota(sasaranKotaOption);
          reset(prev => ({ ...prev, sasaran_kota_id: sasaranKotaOption }));
        }
        if (result.bidang_urusan_id) {
          const bidangUrusanOption = {
            value: result.bidang_urusan_id.id,
            label: result.bidang_urusan_id.bidang_urusan,
          };
          setSelectedBidangUrusan(bidangUrusanOption);
          reset(prev => ({ ...prev, bidang_urusan_id: bidangUrusanOption }));
        }
        if (result.rab_level_1) {
          const rabLevel1Option = {
            value: result.rab_level_1.Id,
            label: result.rab_level_1.kode_referensi
          };
          setSelectedRab1(rabLevel1Option);
          reset(prev => ({ ...prev, rab_level_1_id: rabLevel1Option }));
        }
        if (result.rab_level_2) {
          const rabLevel2Option = {
            value: result.rab_level_2.Id,
            label: result.rab_level_2.kode_referensi
          };
          setSelectedRab2(rabLevel2Option);
          reset(prev => ({ ...prev, rab_level_2_id: rabLevel2Option }));
        }
        if (result.rab_level_3) {
          const rabLevel3Option = {
            value: result.rab_level_3.Id,
            label: result.rab_level_3.kode_referensi
          };
          setSelectedRab3(rabLevel3Option);
          reset(prev => ({ ...prev, rab_level_3_id: rabLevel3Option }));
        }
        if (result.rab_level_4) {
          const rabLevel4Option = {
            value: result.rab_level_4.id,
            label: result.rab_level_4.nama_pohon
          };
          setSelectedRab4(rabLevel4Option);
          reset(prev => ({ ...prev, rab_level_4_id: rabLevel4Option }));
        }
        if (result.rab_level_5) {
          const rabLevel5Option = {
            value: result.rab_level_5.id,
            label: result.rab_level_5.nama_pohon
          };
          setSelectedRab5(rabLevel5Option);
          reset(prev => ({ ...prev, rab_level_5_id: rabLevel5Option }));
        }
        if (result.rab_level_6) {
          const rabLevel6Option = {
            value: result.rab_level_6.id,
            label: result.rab_level_6.nama_pohon
          };
          setSelectedRab6(rabLevel6Option);
          reset(prev => ({ ...prev, rab_level_6_id: rabLevel6Option }));
        }
        if (result.tahun) {
          const selectedTahun = {
            value: result.tahun,
            label: result.tahun,
          };
          setSelectedTahun(selectedTahun);
          reset(prev => ({ ...prev, tahun: selectedTahun }));
        }

        if (result.nama_proses_bisnis) {
          setNamaProsesBisnis(result.nama_proses_bisnis);
          reset(prev => ({ ...prev, nama_proses_bisnis: result.nama_proses_bisnis }));
        }
        if (result.kode_opd) {
          set_kode_opd(result.kode_opd);
          reset(prev => ({ ...prev, kode_opd: result.kode_opd }));
        }
        if (result.kode_proses_bisnis) {
          set_kode_proses_bisnis(result.kode_proses_bisnis);
          reset(prev => ({ ...prev, kode_proses_bisnis: result.kode_proses_bisnis }));
        }
      } catch (err) {
        console.log('Gagal fetching data id');
      }
    }
    fetchingDataId();
  }, [reset]);

  const fetchSasaranKota = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/v1/sasarankota');
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.ID,
        label: item.Sasaran,
      }));
      set_sasaran_kota_option(result);
    } catch (err) {
      console.log('Gagal memuat data Sasaran Kota', err);
    } finally{
        setIsLoading(false)
    }
  };

  const fetchBidangUrusan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/v1/bidangurusan');
      const data = await response.json();
      const result = data.data.map((item: any) => ({
        value: item.id,
        label: `${item.id}. ${item.kode_bidang_urusan} - ${item.bidang_urusan}`
      }));
      set_bidang_urusan_option(result);
    } catch (err) {
      console.log('Gagal memuat data Bidang Urusan', err);
    } finally{
        setIsLoading(false)
    }
  };

  const fetchRab_1_3 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/v1/referensiarsitektur');
      const data = await response.json();
      const filteredData = data.data.filter((item: any) => item.level_referensi === level);
      const result = filteredData.map((item: any) => ({
        value: item.Id,
        label: item.kode_referensi,
      }));
      set_rab_1_3(result);
    } catch (err) {
      console.log('Gagal memuat data RAB Level 1 - 3', err);
    } finally {
        setIsLoading(false)
    }
  };

  const fetchRab_4_6 = async (level: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/v1/pohonkinerja`);
      const data = await response.json();
      const filteredData = data.data.filter((pohon: any) => pohon.level_pohon === level)
      const result = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama_pohon,
      }));
      set_rab_4_6(result);
    } catch (err) {
      console.log('Gagal memuat data RAB Level 4 - 6', err);
    } finally {
        setIsLoading(false)
    }
  }

  const handleChange = (option: any, actionMeta: any) => {
    if (actionMeta.name === 'sasaran_kota_id') {
      setSelectedSasaranKota(option);
    } else if (actionMeta.name === 'rab_level_1_id') {
      setSelectedRab1(option);
    } else if (actionMeta.name === 'rab_level_2_id') {
      setSelectedRab2(option);
    } else if (actionMeta.name === 'rab_level_3_id') {
      setSelectedRab3(option);
    } else if (actionMeta.name === 'rab_level_4_id') {
      setSelectedRab4(option);
    } else if (actionMeta.name === 'rab_level_5_id') {
      setSelectedRab5(option);
    } else if (actionMeta.name === 'rab_level_6_id') {
      setSelectedRab6(option);
    }
  };

  const onSubmit: SubmitHandler<formValue> = async (data) => {
    const formData = {
      nama_proses_bisnis: data.nama_proses_bisnis,
      kode_opd: data.kode_opd,
      kode_proses_bisnis: data.kode_proses_bisnis,
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
    try {
        const response = await fetch(`${API_URL}/v1/updateprosesbisnis/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert('Data Proses Bisnis berhasil diperbarui');
          reset();
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Data Proses Bisnis gagal diperbarui:', error);
      }
  }

  return (
    <div className="border p-5">
      <h1>Edit Page</h1>
      <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Nama Proses Bisnis</label>
            <Controller
                name="nama_proses_bisnis"
                control={control}
                rules={{required: 'Nama Proses Bisnis harus terisi'}}
                render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="border px-4 py-2 rounded"
                        id="nama_proses_bisnis"
                        type="text"
                        value={field.value || namaProsesBisnis}
                        onChange={(e) => {
                            field.onChange(e);
                            setNamaProsesBisnis(e.target.value);
                        }}
                       />
                      {errors.nama_proses_bisnis && <h1 className="text-red-500">{errors.nama_proses_bisnis.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_opd">Kode OPD</label>
            <Controller
                name="kode_opd"
                control={control}
                rules={{required: 'Kode OPD harus terisi'}}
                render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="border px-4 py-2 rounded"
                        id="kode_opd"
                        type="text"
                        value={field.value || kode_opd}
                        onChange={(e) => {
                            field.onChange(e);
                            set_kode_opd(e.target.value);
                        }}
                       />
                      {errors.kode_opd && <h1 className="text-red-500">{errors.kode_opd.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_proses_bisnis">Kode Proses Bisnis</label>
            <Controller
                name="kode_proses_bisnis"
                control={control}
                rules={{required: 'Kode Proses Bisnis harus terisi'}}
                render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="border px-4 py-2 rounded"
                        id="kode_proses_bisnis"
                        type="text"
                        value={field.value || kode_proses_bisnis}
                        onChange={(e) => {
                            field.onChange(e);
                            setNamaProsesBisnis(e.target.value);
                        }}
                       />
                      {errors.kode_proses_bisnis && <h1 className="text-red-500">{errors.kode_proses_bisnis.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun</label>
            <Controller
                name="tahun"
                control={control}
                rules={{required: 'Tahun harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                        {...field}
                        id="tahun"
                        value={selectedTahun}
                        options={tahun_option}
                        onChange={(option) => {
                            field.onChange(option);
                            handleChange(option, { name: 'tahun' });
                        }}
                        isClearable={true}
                        />
                        {errors.tahun && <h1 className="text-red-500">{errors.tahun.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota_id">Sasaran Kota</label>
            <Controller
                name="sasaran_kota_id"
                control={control}
                rules={{required: 'Sasaran Kota harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                        {...field}
                        id="sasaran_kota_id"
                        isLoading={isLoading}
                        value={selectedSasaranKota}
                        options={sasaran_kota_option}
                        onChange={(option) => {
                            field.onChange(option);
                            handleChange(option, { name: 'sasaran_kota_id' });
                        }}
                        isClearable={true}
                        onMenuOpen={() => {
                            if (sasaran_kota_option.length === 0) {
                                fetchSasaranKota();
                            }
                        }}
                    />
                    {errors.sasaran_kota_id && <h1 className="text-red-500">{errors.sasaran_kota_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="bidang_urusan_id">Bidang Urusan</label>
            <Controller
                name="bidang_urusan_id"
                control={control}
                rules={{required: 'Bidang Urusan harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                        {...field}
                        id="bidang_urusan_id"
                        isLoading={isLoading}
                        value={selectedBidangUrusan}
                        options={bidang_urusan_option}
                        onChange={(option) => {
                            field.onChange(option);
                            handleChange(option, { name: 'bidang_urusan_id' });
                        }}
                        isClearable={true}
                        onMenuOpen={() => {
                            if (bidang_urusan_option.length === 0) {
                                fetchBidangUrusan();
                            }
                        }}
                    />
                    {errors.bidang_urusan_id && <h1 className="text-red-500">{errors.bidang_urusan_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">RAB Level 1</label>
            <Controller
                name="rab_level_1_id"
                control={control}
                rules={{required: 'RAB Level 1 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_1_id"
                            value={selectedRab1}
                            isLoading={isLoading}
                            options={rab_1_3}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_1_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_1_3.length === 0) {
                                    fetchRab_1_3(1);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_1_3([])
                            }}
                            />
                        {errors.rab_level_1_id && <h1 className="text-red-500">{errors.rab_level_1_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">RAB Level 2</label>
            <Controller
                name="rab_level_2_id"
                control={control}
                rules={{required: 'RAB Level 2 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_2_id"
                            value={selectedRab2}
                            isLoading={isLoading}
                            options={rab_1_3}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_2_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_1_3.length === 0) {
                                    fetchRab_1_3(2);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_1_3([])
                            }}
                            />
                        {errors.rab_level_2_id && <h1 className="text-red-500">{errors.rab_level_2_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">RAB Level 3</label>
            <Controller
                name="rab_level_3_id"
                control={control}
                rules={{required: 'RAB Level 3 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_3_id"
                            value={selectedRab3}
                            isLoading={isLoading}
                            options={rab_1_3}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_3_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_1_3.length === 0) {
                                    fetchRab_1_3(3);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_1_3([])
                            }}
                        />
                        {errors.rab_level_3_id && <h1 className="text-red-500">{errors.rab_level_3_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4</label>
            <Controller
                name="rab_level_4_id"
                control={control}
                rules={{required: 'RAB Level 4 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_4_id"
                            value={selectedRab4}
                            isLoading={isLoading}
                            options={rab_4_6}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_4_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_4_6.length === 0) {
                                    fetchRab_4_6(4);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_4_6([])
                            }}
                            />
                        {errors.rab_level_4_id && <h1 className="text-red-500">{errors.rab_level_4_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">RAB Level 5</label>
            <Controller
                name="rab_level_5_id"
                control={control}
                rules={{required: 'RAB Level 5 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_5_id"
                            value={selectedRab5}
                            isLoading={isLoading}
                            options={rab_4_6}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_5_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_4_6.length === 0) {
                                    fetchRab_4_6(5);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_4_6([])
                            }}
                        />
                        {errors.rab_level_5_id && <h1 className="text-red-500">{errors.rab_level_5_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6_id">RAB Level 6</label>
            <Controller
                name="rab_level_6_id"
                control={control}
                rules={{required: 'RAB Level 6 harus terisi'}}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="rab_level_6_id"
                            value={selectedRab6}
                            isLoading={isLoading}
                            options={rab_4_6}
                            onChange={(option) => {
                                field.onChange(option);
                                handleChange(option, { name: 'rab_level_6_id' });
                            }}
                            isClearable={true}
                            onMenuOpen={() => {
                                if (rab_4_6.length === 0) {
                                    fetchRab_4_6(6);
                                }
                            }}
                            onMenuClose={() => {
                                set_rab_4_6([])
                            }}
                        />
                        {errors.rab_level_6_id && <h1 className="text-red-500">{errors.rab_level_6_id.message}</h1>}
                    </>
                )}
            />
        </div>
        <Button typee="submit">Simpan</Button>
      </form>
    </div>
  );
};

export default FormEditData;
