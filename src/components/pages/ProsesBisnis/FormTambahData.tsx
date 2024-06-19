"use client"

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/common/Button/Button';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

interface dataProsesBisnis {
  nama_proses_bisnis: string;
  kode_opd: string;
  kode_proses_bisnis: string;
  bidang_urusan_id: number;
  tahun: number;
  sasaran_kota_id: number;
  rab_level_1_id: string;
  rab_level_2_id: string;
  rab_level_3_id: string;
  rab_level_4_id: string;
  rab_level_5_id: string;
  rab_level_6_id: string;
}

interface DataSasaran {
  ID: number;
  Sasaran: string;
  TujuanKota: string;
  StrategiKota: string;
  Tahun: number;
  CreatedAt: string;
  UpdatedAt: string;
}

const FormTambahData = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { handleSubmit, register, control, setValue, formState:{errors} } = useForm<dataProsesBisnis>();

  useEffect(() => {
    const rab_4_6 = (selector: string, level: number) => {
      $(selector).select2({
        ajax: {
          url: `${API_URL}/v1/pohonkinerja`,
          dataType: 'json',
          delay: 250,
          data: function (params) {
            const page = params.page || 1;
            const query: { [key: string]: any } = {
                limit: 10,
                offset: (page - 1) * 10,
              };
            if (params.term) {
                query['nama_pohon'] = params.term;
            }
            return query;
          },
          processResults: function (data, params) {
            params.page = params.page || 1;

            if (!data.data || !Array.isArray(data.data)) {
                return {
                    results: [],
                    pagination: {
                        more: false
                    }
                }
            }
            const result = data.data.filter((item: any) => 
                item.nama_pohon.toLowerCase().includes((params.term || '').toLowerCase())
            );
            return {
              results: result
                .filter((item: any) => item.level_pohon === level)
                .map((item: any) => ({
                  id: item.id,
                  text: item.nama_pohon,
                })),
            };
          },
          cache: true,
        },
        placeholder: 'Pilih sebuah opsi',
      }).on('select2:select', function (e: any) {
        const value = e.params.data.id;
        const name = $(this).attr('id');
        if (name) {
          setValue(name as keyof dataProsesBisnis, value);
        }
      });
    };

    const rab_1_3 = (selector: string, level: number, placeholder: string) => {
      $(selector).select2({
        ajax: {
          url: `${API_URL}/v1/referensiarsitektur`,
          dataType: 'json',
          delay: 250,
          data: function (params) {
            const page = params.page || 1;
            const query: { [key: string]: any } = {
                limit: 10,
                offset: (page - 1) * 10,
              };
            if (params.term) {
                query['kode_referensi'] = params.term;
            }
            return query;
          },
          processResults: function (data, params) {
            params.page = params.page || 1;

            if (!data.data || !Array.isArray(data.data)) {
                return {
                    results: [],
                    pagination: {
                        more: false
                    }
                }
            }
            const result = data.data.filter((item: any) => 
                item.kode_referensi.toLowerCase().includes((params.term || '').toLowerCase())
            );
            return {
              results: result
                .filter((item: any) => item.level_referensi === level)
                .map((item: any) => ({
                  id: item.Id,
                  text: item.kode_referensi,
                })),
            };
          },
          cache: true,
        },
        placeholder: placeholder,
      }).on('select2:select', function (e: any) {
        const value = e.params.data.id;
        const name = $(this).attr('id');
        if (name) {
          setValue(name as keyof dataProsesBisnis, value);
        }
      });
    };

    $('#sasaran_kota_id').select2({
      ajax: {
        url: `${API_URL}/v1/sasarankota`,
        dataType: 'json',
        delay: 250,
        data: function (params) {
          const query = {
            limit: 10,
            offset: (params.page || 1) * 10,
            Sasaran: params.term || '',
          };
          return query;
        },
        processResults: function (data) {
          if (!data.data || !Array.isArray(data.data)) {
            return {
              results: [],
            };
          }
          const results = data.data.map((item: DataSasaran) => ({
            id: item.ID,
            text: item.Sasaran,
          }));
          return {
            results: results,
          };
        },
        cache: true,
      },
      placeholder: 'Pilih sasaran kota',
        }).on('select2:select', function (e: any) {
        const value = e.params.data.id.toString(); // Pastikan nilai diubah menjadi string jika diperlukan
        setValue('sasaran_kota_id', value); // Menggunakan setValue untuk mengatur nilai sasaran_kota_id
        });

    rab_1_3('#rab_level_1_id', 1, 'pilih RAB Level 1');
    rab_1_3('#rab_level_2_id', 2, 'pilih RAB Level 2');
    rab_1_3('#rab_level_3_id', 3, 'pilih RAB Level 3');
    rab_4_6('#rab_level_4_id', 4);
    rab_4_6('#rab_level_5_id', 5);
    rab_4_6('#rab_level_6_id', 6);
  }, [setValue]);

  const onSubmit = (data: dataProsesBisnis) => {
    console.log(data);
  };

  return (
    <div className="border p-5">
      <h1 className="uppercase font-bold">Form tambah data informasi</h1>
      <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Nama Proses Bisnis</label>
          <input 
            className="border px-4 py-2"
            type="text" 
            placeholder="masukkan nama proses bisnis" 
            id="nama_proses_bisnis" 
            {...register("nama_proses_bisnis", {required:true})}
          />
          {errors.nama_proses_bisnis && <><h1 className="text-red-500">Nama Proses Bisnis Harus Terisi</h1></>}
        </div>

        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_proses_bisnis">Kode Proses Bisnis</label>
          <input 
            className="border px-4 py-2"
            type="text" 
            placeholder="masukkan kode proses bisnis" 
            id="kode_proses_bisnis" 
            {...register("kode_proses_bisnis", {required:true})}
          />
          {errors.kode_proses_bisnis && <><h1 className="text-red-500">Kode Proses Bisnis Harus Terisi</h1></>}
        </div>

        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_opd">Kode OPD</label>
          <input 
            className="border px-4 py-2"
            type="text" 
            placeholder="masukkan kode OPD" 
            id="kode_opd" 
            {...register("kode_opd", {required:true})}
          />
          {errors.kode_opd && <><h1 className="text-red-500">Kode OPD Harus Terisi</h1></>}
        </div>

        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="bidang_urusan_id">Bidang Urusan</label>
          <input 
            className="border px-4 py-2"
            type="number" 
            placeholder="masukkan bidang urusan" 
            id="bidang_urusan_id" 
            {...register("bidang_urusan_id")}
          />
        </div>

        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun</label>
          <input 
            className="border px-4 py-2"
            type="number" 
            placeholder="masukkan tahun" 
            id="tahun" 
            {...register("tahun", {required: true})}
          />
          {errors.tahun && <><h1 className="text-red-500">Tahun Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota_id">Sasaran Kota:</label>
          <Controller
            name="sasaran_kota_id"
            control={control}
            render={({ field }) => (
              <select id="sasaran_kota_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">Level 1:</label>
          <Controller
            name="rab_level_1_id"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <select id="rab_level_1_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_1_id && <><h1 className="text-red-500">RAB Level 1 Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">Level 2:</label>
          <Controller
            name="rab_level_2_id"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <select id="rab_level_2_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_2_id && <><h1 className="text-red-500">RAB Level 2 Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">Level 3:</label>
          <Controller
            name="rab_level_3_id"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <select id="rab_level_3_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_3_id && <><h1 className="text-red-500">RAB Level 3 Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">Level 4:</label>
          <Controller
            name="rab_level_4_id"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <select id="rab_level_4_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_4_id && <><h1 className="text-red-500">RAB Level 4 Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">Level 5:</label>
          <Controller
            name="rab_level_5_id"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <select id="rab_level_5_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_5_id && <><h1 className="text-red-500">RAB Level 5 Harus Terisi</h1></>}
        </div>
        <div className="flex flex-col py-3">
          <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6_id">Level 6:</label>
          <Controller
            name="rab_level_6_id"
            control={control}
            defaultValue=""
            rules={{required: true}}
            render={({ field }) => (
              <select id="rab_level_6_id" className="select2 w-full" {...field}>
                <option value="">Pilih sebuah opsi</option>
              </select>
            )}
          />
          {errors.rab_level_6_id && <><h1 className="text-red-500">RAB Level 6 Harus Terisi</h1></>}
        </div>
        <Button typee="submit" className="mt-5">Simpan</Button>
      </form>
    </div>
  );
};

export default FormTambahData;



