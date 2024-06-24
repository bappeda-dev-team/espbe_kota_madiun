"use client"

import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Button/Button';
import Select from 'react-select';

interface OptionType {
  value: number;
  label: string;
}

interface FormValues {
  nama_proses_bisnis: string;
  kode_proses_bisnis: string;
  kode_opd: string;
  bidang_urusan_id: undefined;
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
  const [rab_level_1_3_option, set_rab_level_1_3_option] = useState<OptionType[]>([]);
  const [rab_level_4_6_option, set_rab_level_4_6_option] = useState<OptionType[]>([]);
  const [sasaran_kota_option, set_sasaran_kota_option] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const tahun: OptionType[] = [
    {value: 2024, label: "2024"},
    {value: 2025, label: "2025"},
    {value: 2026, label: "2026"},
    {value: 2027, label: "2027"},
    {value: 2028, label: "2028"},
    {value: 2029, label: "2029"},
    {value: 2030, label: "2030"},
  ]

  const { control, handleSubmit, reset , formState : {errors}} = useForm<FormValues>({
    defaultValues: {
      nama_proses_bisnis: '',
      kode_proses_bisnis: '',
      kode_opd: '',
      bidang_urusan_id: undefined,
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
      const filteredData = data.data.filter((referensi: any) => referensi.level_referensi === level);
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        label: referensi.kode_referensi,
      }));
      set_rab_level_1_3_option(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRabLevel4_6 = async (level: number) => {
    setIsLoading(true);
    try{
      const response = await fetch(`${API_URL}/v1/pohonkinerja`);
      const data = await response.json();
      const filteredData = data.data.filter((pohon: any) => pohon.level_pohon === level);
      const result = filteredData.map((pohon: any) => ({
        value: pohon.id,
        label: pohon.nama_pohon,
      }));
      set_rab_level_4_6_option(result);
    } catch(err) {
      console.log('cant fetcing data pohon kinerja')
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
      console.log('Failed to fetch Sasaran Kota data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
      nama_proses_bisnis: data.nama_proses_bisnis,
      kode_proses_bisnis: data.kode_proses_bisnis,
      kode_opd: data.kode_opd,
      bidang_urusan_id: Number(data.bidang_urusan_id),
      tahun: data.tahun?.value,
      sasaran_kota_id: data.sasaran_kota_id?.value,
      rab_level_1_id: data.rab_level_1_id?.value,
      rab_level_2_id: data.rab_level_2_id?.value,
      rab_level_3_id: data.rab_level_3_id?.value,
      rab_level_4_id: data.rab_level_4_id?.value,
      rab_level_5_id: data.rab_level_5_id?.value,
      rab_level_6_id: data.rab_level_6_id?.value,
    };
    try {
      const response = await fetch(`${API_URL}/v1/createprosesbisnis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data Proses Bisnis berhasil ditambahkan');
        reset();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form tambah data Proses Bisnis</h1>
      <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Nama Proses Bisnis</label>
          <Controller
            name="nama_proses_bisnis"
            control={control}
            rules={{required: 'Nama Proses Bisnis Harus Terisi'}}
            render={({field}) => (
              <>
                <input 
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="nama_proses_bisnis"
                  placeholder="masukkan nama proses bisnis"
                />
                {errors.nama_proses_bisnis && <h1 className="text-red-500">{errors.nama_proses_bisnis.message}</h1>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_proses_bisnis">Kode Proses Bisnis</label>
          <Controller
            name="kode_proses_bisnis"
            control={control}
            rules={{required: 'Kode Proses Bisnis Harus Terisi'}}
            render={({field}) => (
              <>
                <input 
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="kode_proses_bisnis"
                  placeholder="masukkan Kode Proses Bisnis"
                />
                {errors.kode_proses_bisnis && <h1 className="text-red-500">{errors.kode_proses_bisnis.message}</h1>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_opd">Kode OPD</label>
          <Controller
            name="kode_opd"
            control={control}
            rules={{required: 'Kode OPD Harus Terisi'}}
            render={({field}) => (
              <>
                <input 
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="text"
                  id="kode_opd"
                  placeholder="masukkan Kode OPD"
                />
                {errors.kode_opd && <h1 className="text-red-500">{errors.kode_opd.message}</h1>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-red-700 my-2" htmlFor="bidang_urusan_id">Bidang Urusan</label>
          <Controller
            name="bidang_urusan_id"
            control={control}
            render={({field}) => (
              <>
                <input 
                  className="border px-4 py-2 rounded"
                  {...field}
                  type="number"
                  id="bidang_urusan_id"
                  placeholder="masukkan Bidang Urusan"
                />
              </>
            )}
          />
        </div>
       
        {isClient && (
          <>
           <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun</label>
            <Controller
              name="tahun"
              control={control}
              rules={{required: 'Tahun Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    options={tahun}
                    isSearchable
                    placeholder="Pilih Tahun"
                  />
                  {errors.tahun && <h1 className="text-red-500">{errors.tahun.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota_id">Sasaran Kota:</label>
            <Controller
              name="sasaran_kota_id"
              control={control}
              rules={{required: 'Sasaran Kota Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    options={sasaran_kota_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(sasaran_kota_option.length === 0){
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
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">RAB Level 1:</label>
            <Controller
              name="rab_level_1_id"
              control={control}
              rules={{required: 'RAB Level 1 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 1"
                    options={rab_level_1_3_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_1_3_option.length === 0){
                        fetchRabLevel1_3(1);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_1_3_option([])
                    }}
                  />
                  {errors.rab_level_1_id && <h1 className="text-red-500">{errors.rab_level_1_id.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">RAB Level 2:</label>
            <Controller
              name="rab_level_2_id"
              control={control}
              rules={{required: 'RAB Level 2 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 2"
                    options={rab_level_1_3_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_1_3_option.length === 0){
                        fetchRabLevel1_3(2);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_1_3_option([])
                    }}
                  />
                  {errors.rab_level_2_id && <h1 className="text-red-500">{errors.rab_level_2_id.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">RAB Level 3:</label>
            <Controller
              name="rab_level_3_id"
              control={control}
              rules={{required: 'RAB Level 3 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 3"
                    options={rab_level_1_3_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_1_3_option.length === 0){
                        fetchRabLevel1_3(3);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_1_3_option([])
                    }}
                  />
                  {errors.rab_level_3_id && <h1 className="text-red-500">{errors.rab_level_3_id.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4:</label>
            <Controller
              name="rab_level_4_id"
              control={control}
              rules={{required: 'RAB Level 4 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 4"
                    options={rab_level_4_6_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_4_6_option.length === 0){
                        fetchRabLevel4_6(4);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_4_6_option([])
                    }}
                  />
                  {errors.rab_level_4_id && <h1 className="text-red-500">{errors.rab_level_4_id.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">RAB Level 5:</label>
            <Controller
              name="rab_level_5_id"
              control={control}
              rules={{required: 'RAB Level 5 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 5"
                    options={rab_level_4_6_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_4_6_option.length === 0){
                        fetchRabLevel4_6(5);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_4_6_option([])
                    }}
                  />
                  {errors.rab_level_5_id && <h1 className="text-red-500">{errors.rab_level_5_id.message}</h1>}
                </>
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6_id">RAB Level 6:</label>
            <Controller
              name="rab_level_6_id"
              control={control}
              rules={{required: 'RAB Level 6 Harus Terisi'}}
              render={({field}) => (
                <>
                  <Select 
                    {...field}
                    placeholder="Masukkan RAB Level 4"
                    options={rab_level_4_6_option}
                    isLoading={isLoading}
                    isSearchable
                    onMenuOpen={() => {
                      if(rab_level_4_6_option.length === 0){
                        fetchRabLevel4_6(6);
                      }
                    }}
                    onMenuClose={() => {
                      set_rab_level_4_6_option([])
                    }}
                  />
                  {errors.rab_level_6_id && <h1 className="text-red-500">{errors.rab_level_6_id.message}</h1>}
                </>
              )}
            />
          </div>
          </>
        )}
        <Button typee="submit" halaman_url="/ProsesBisnis" className="mt-5">Simpan</Button>
      </form>
    </div>
  );
};

export default FormTambahData;



