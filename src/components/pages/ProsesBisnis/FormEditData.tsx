'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button/Button';

interface rabLevel1_3 {
    Id: number;
    kode_referensi: string;
    nama_referensi: string;
    level_referensi: number;
    jenis_referensi: string;
    tahun: number;
}
interface rabLevel4_6 {
    id : number,
    nama_pohon : string,
    jenis_pohon : string,
    level_pohon : number,
    kode_opd : string,
    tahun : number;
}

interface typeProsesBisnis {
    id: number;
    nama_proses_bisnis: string;
    sasaran_kota: string;
    kode_proses_bisnis: string;
    kode_opd: string;
    bidang_urusan: string;
    rab_level_1_id?: number;
    rab_level_2_id?: number;
    rab_level_3_id?: number;
    rab_level_4_id?: number;
    rab_level_5_id?: number;
    rab_level_6_id?: number;
    tahun: number;
}

const FormEditData = () => {
    const { id } = useParams();
    const [data, setData] = useState<typeProsesBisnis | null>(null);
    const [dropDown, setDropDown] = useState<rabLevel1_3[]>([])
    const [error, setError] = useState<string | boolean>(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<typeProsesBisnis>({
        defaultValues: {
            id: 0,
            nama_proses_bisnis: '',
            sasaran_kota: '',
            kode_proses_bisnis: '',
            kode_opd: '',
            bidang_urusan: '',
            tahun: 0,
            rab_level_1_id: undefined,
            rab_level_2_id: undefined,
            rab_level_3_id: undefined,
            rab_level_4_id: undefined,
            rab_level_5_id: undefined,
            rab_level_6_id: undefined,
        },
    });

    // Fetching data buat dropdown RAB
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const response = await fetch(`${API_URL}/v1/referensiarsitektur`)
                if (!response.ok) {
                    throw new Error('cant fetch data dropdown')
                }
                const data = await response.json();
                setDropDown(data.data);
            } catch (err) {
                console.log('gagal memuat data dropdown')
            }
        }
        fetchDropDown();
    }, []);

    const dropDown_option = (level: number) => {
        return dropDown
            .filter(item => item.level_referensi === level)
            .map(item => (
                <option key={item.Id} value={item.Id}>{item.kode_referensi}</option>
            ))
    };

    useEffect(() => {
        if (id) {
            // Fetch data untuk spesifik ID
            const fetchData = async () => {
                try {
                    const response = await fetch(`${API_URL}/v1/prosesbisnisbyid/${id}`);
                    if (!response.ok) {
                        throw new Error("Cannot fetch data");
                    }
                    const result = await response.json();
                    setData(result.data);
                    // Set form values with the fetched data
                    setValue('id', result.data.id);
                    setValue('nama_proses_bisnis', result.data.nama_proses_bisnis);
                    setValue('sasaran_kota', result.data.sasaran_kota);
                    setValue('kode_proses_bisnis', result.data.kode_proses_bisnis);
                    setValue('kode_opd', result.data.kode_opd);
                    setValue('bidang_urusan', result.data.bidang_urusan);
                    setValue('tahun', result.data.tahun);
                    setValue('rab_level_1_id', result.data.rab_level_1? result.data.rab_level_1.Id : '');
                    setValue('rab_level_2_id', result.data.rab_level_2? result.data.rab_level_2.Id : '');
                    setValue('rab_level_3_id', result.data.rab_level_3? result.data.rab_level_3.Id : '');
                    setValue('rab_level_4_id', result.data.rab_level_4? result.data.rab_level_4.Id : '');
                    setValue('rab_level_5_id', result.data.rab_level_5? result.data.rab_level_5.Id : '');
                    setValue('rab_level_6_id', result.data.rab_level_6? result.data.rab_level_6.Id : '');
                } catch (err) {
                    console.error(err);
                    setError("gagal memuat data, silakan cek database / koneksi internet")
                }
            };

            fetchData();
        }
    }, [id, setValue]);

    const formHandleSubmit = async (formData: any) => {
        const payload = {
            id: 1,
            nama_proses_bisnis: formData.nama_proses_bisnis,
            sasaran_kota: formData.sasaran_kota,
            kode_proses_bisnis: formData.kode_proses_bisnis,
            kode_opd: formData.kode_opd,
            bidang_urusan: formData.bidang_urusan,
            rab_level_1_id: parseInt(formData.rab_level_1_id, 10),
            rab_level_2_id: parseInt(formData.rab_level_2_id, 10),
            rab_level_3_id: parseInt(formData.rab_level_3_id, 10),
            rab_level_4_id: formData.rab_level_4_id ? parseInt(formData.rab_level_4_id, 10) : null,
            rab_level_5_id: formData.rab_level_5_id ? parseInt(formData.rab_level_5_id, 10) : null,
            rab_level_6_id: formData.rab_level_6_id ? parseInt(formData.rab_level_6_id, 10) : null,
            tahun: 0
        };
        try {
            const response = await fetch(`${API_URL}/v1/updateprosesbisnis/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('update success')
        } catch (error) {
            console.error('Error:', error);
            alert('update gagal')
        }
    };

    if (!data) {
        return <h1>Loading...</h1>;
    } else if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className="border p-5">
            <h1 className="uppercase font-bold">Edit Proses Bisnis</h1>
            <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(formHandleSubmit)}>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Nama Proses Bisnis</label>
                    <input 
                        className="border px-4 py-2" 
                        type="text" 
                        {...register('nama_proses_bisnis', {required: true}) } 
                    />
                </div>
                {errors.nama_proses_bisnis && <><h1 className="text-red-500">Nama Proses Bisnis harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Sasaran Kota</label>
                    <input 
                        className="border px-4 py-2" 
                        type="text" 
                        {...register('sasaran_kota', {required: true})} 
                    />
                </div>
                {errors.sasaran_kota && <><h1 className="text-red-500">Sasaran Kota harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Kode Proses Bisnis</label>
                    <input 
                        className="border px-4 py-2" 
                        type="text" 
                        {...register('kode_proses_bisnis', {required: true})} 
                    />
                </div>
                {errors.kode_proses_bisnis && <><h1 className="text-red-500">Kode Proses Bisnis harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Kode OPD</label>
                    <input 
                        className="border px-4 py-2" 
                        type="text" 
                        {...register('kode_opd')} 
                    />
                </div>
                {errors.kode_opd && <><h1 className="text-red-500">Kode OPD harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Bidang Urusan</label>
                    <input 
                        className="border px-4 py-2" 
                        type="text" 
                        {...register('bidang_urusan')} 
                    />
                </div>
                {errors.bidang_urusan && <><h1 className="text-red-500">Bidang Urusan harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Tahun</label>
                    <input 
                        className="border px-4 py-2" 
                        type="number" 
                        {...register('tahun', {required: true})} 
                    />
                </div>
                {errors.tahun && <><h1 className="text-red-500">Tahun harus terisi</h1></>}
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">RAB Level 1</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_1_id"
                        {...register("rab_level_1_id", { required: true })}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(1)}
                    </select>
                </div>
                {errors.rab_level_1_id && <><h1 className="text-red-500">RAB Level 1 harus dipilih</h1></>}
                
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">RAB Level 2</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_2_id"
                        {...register("rab_level_2_id", { required: true })}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(2)}
                    </select>
                </div>
                {errors.rab_level_2_id && <><h1 className="text-red-500">RAB Level 2 harus dipilih</h1></>}
                
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">RAB Level 3</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_3_id"
                        {...register("rab_level_3_id", { required: true })}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(3)}
                    </select>
                </div>
                {errors.rab_level_3_id && <><h1 className="text-red-500">RAB Level 3 harus dipilih</h1></>}
                
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_4_id"
                        {...register("rab_level_4_id")}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(4)}
                    </select>
                </div>

                <div className="flex flex-col py-3">     
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">RAB Level 5</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_5_id"
                        {...register("rab_level_5_id")}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(5)}
                    </select>
                </div>

                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6 _id">RAB Level 6</label>
                    <select
                        className="border px-4 py-2" 
                        id="rab_level_6_id"
                        {...register("rab_level_6_id")}
                        defaultValue=''
                    >
                        <option value=''></option>
                        {dropDown_option(6)}
                    </select>
                </div>
                <Button typee="submit" halaman_url='/ProsesBisnis'>save</Button>
            </form>
        </div>
    );
};

export default FormEditData;
