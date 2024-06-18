"use client";

import Button from "@/components/common/Button/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.css";

interface rabLevel1_3 {
    Id: number,
    kode_referensi: string,
    nama_referensi: string,
    level_referensi: number,
    jenis_referensi: string,
    tahun: number
}

interface rabLevel4_6 {
    id: number,
    nama_pohon: string,
    jenis_pohon: string,
    level_pohon: number,
    kode_opd: string,
    tahun: string
}

interface sasaran_kota {
    ID: number,
    Sasaran: string;
}

function FormTambahData() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    useEffect(() => {

        $('#rab_level_1_id').select2({
            ajax: {
                url: `${API_URL}/v1/referensiarsitektur`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: data.data.filter((item: rabLevel1_3) => item.level_referensi === 1).map((item: rabLevel1_3) => ({
                            id: item.Id,
                            text: item.kode_referensi,
                            value: item.Id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 1'
        });

        $('#rab_level_2_id').select2({
            ajax: {
                url: `${API_URL}/v1/referensiarsitektur`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: result.filter((item: rabLevel1_3) => item.level_referensi === 2).map((item: rabLevel1_3) => ({
                            id: item.Id,
                            text: item.kode_referensi,
                            value: item.Id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 2'
        });

        $('#rab_level_3_id').select2({
            ajax: {
                url: `${API_URL}/v1/referensiarsitektur`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: result.filter((item: rabLevel1_3) => item.level_referensi === 3).map((item: rabLevel1_3) => ({
                            id: item.Id,
                            text: item.kode_referensi,
                            value: item.Id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 3'
        });

        $('#rab_level_4_id').select2({
            ajax: {
                url: `${API_URL}/v1/pohonkinerja`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: result.filter((item: rabLevel4_6) => item.level_pohon === 4).map((item: rabLevel4_6) => ({
                            id: item.id,
                            text: item.nama_pohon,
                            value: item.id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 4'
        });

        $('#rab_level_5_id').select2({
            ajax: {
                url: `${API_URL}/v1/pohonkinerja`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: result.filter((item: rabLevel4_6) => item.level_pohon === 5).map((item: rabLevel4_6) => ({
                            id: item.id,
                            text: item.nama_pohon,
                            value: item.id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 5'
        });

        $('#rab_level_6_id').select2({
            ajax: {
                url: `${API_URL}/v1/pohonkinerja`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page -1) * 10,
                    };
                    if(params.term) {
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
                        results: result.filter((item: rabLevel4_6) => item.level_pohon === 6).map((item: rabLevel4_6) => ({
                            id: item.id,
                            text: item.nama_pohon,
                            value: item.id
                        })),
                        pagination: {
                            more: (params.page * 10) <data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih RAB Level 6'
        });

        $('#sasaran_kota_id').select2({
            ajax: {
                url: `${API_URL}/v1/sasarankota`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const page = params.page || 1;
                    const query: { [key: string]: any } = {
                        limit: 10,
                        offset: (page - 1) * 10,
                      };
                    if (params.term) {
                        query['Sasaran'] = params.term;
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
                        };
                    }
                    const results = data.data.filter((item: any) =>
                        item.Sasaran.toLowerCase().includes((params.term || '').toLowerCase())
                    );
        
                    return {
                        results: results.map((item: any) => ({
                            id: item.ID,
                            text: item.Sasaran,
                            value: item.ID
                        })),
                        pagination: {
                            more: (params.page * 10) < data.count
                        }
                    };
                },
                cache: true
            },
            placeholder: 'pilih sasaran kota',
        });
        
        
    }, [API_URL]);

    const prosesBisnis = async (formData: any) => {
        const dataProsesBisnis = {
          id: 0,
          kode_opd: formData.kode_opd,
          nama_proses_bisnis: formData.nama_proses_bisnis,
          sasaran_kota_id: parseInt($("#sasaran_kota_id").val() as string),
          kode_proses_bisnis: formData.kode_proses_bisnis,
          bidang_urusan_id: formData.bidang_urusan,
          rab_level_1_id: parseInt($("#rab_level_1_id").val() as string, 10),
          rab_level_2_id: parseInt($("#rab_level_2_id").val() as string, 10),
          rab_level_3_id: parseInt($("#rab_level_3_id").val() as string, 10),
          rab_level_4_id: $("#rab_level_4_id").val() ? parseInt($("#rab_level_4_id").val() as string, 10) : null,
          rab_level_5_id: $("#rab_level_5_id").val() ? parseInt($("#rab_level_5_id").val() as string, 10) : null,
          rab_level_6_id: $("#rab_level_6_id").val() ? parseInt($("#rab_level_6_id").val() as string, 10) : null,
          tahun: parseInt(formData.tahun, 10)
        };
        try{
            const response = await fetch(`${API_URL}/v1/createprosesbisnis`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json' 
                },
                body : JSON.stringify(dataProsesBisnis)
            });
            if(!response.ok) {
                throw new Error('cant post data')
            }
            const result = response.json();
            alert('berhasil menambahkan data');
            router.push("/ProsesBisnis")
        } catch (err) {
            alert("gagal menyimpan data, silakan cek koneksi internet/database server")
        }
    };

    return (
        <>
            <div className="border p-5">
                <h1 className="uppercase font-bold">Form tambah data proses bisnis</h1>
                <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(prosesBisnis)}>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_proses_bisnis">Proses Bisnis</label>
                        <input
                            className="border px-4 py-2"
                            id="nama_proses_bisnis"
                            type="text"
                            placeholder="Masukkan Proses Bisnis"
                            {...register("nama_proses_bisnis", {required: true})}
                        />
                        {errors.nama_proses_bisnis && <><h1 className="text-red-500">proses bisnis harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="sasaran_kota_id">Sasaran Kota</label>
                        <select
                            className="border px-4 py-2"
                            id="sasaran_kota_id"
                            {...register("sasaran_kota_id", {required: true})}
                        >
                        </select>
                        {errors.sasaran_kota_id && <><h1 className="text-red-500">sasaran kota harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="bidang_urusan">Bidang Urusan</label>
                        <input
                            className="border px-4 py-2"
                            id="bidang_urusan"
                            type="text"
                            placeholder="Masukkan Bidang Urusan"
                            {...register("bidang_urusan", {required: true})}
                        />
                        {errors.bidang_urusan && <><h1 className="text-red-500">bidang urusan harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_opd">Kode OPD</label>
                        <input
                            className="border px-4 py-2"
                            id="kode_opd"
                            type="text"
                            placeholder="Masukkan Kode OPD"
                            {...register("kode_opd", {required: true})}
                        />
                        {errors.kode_opd && <><h1 className="text-red-500">kode OPD harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kode_proses_bisnis">Kode Proses Bisnis</label>
                        <input
                            className="border px-4 py-2"
                            id="kode_proses_bisnis"
                            type="number"
                            placeholder="Masukkan Kode Proses Bisnis"
                            {...register("kode_proses_bisnis", {required: true})}
                        />
                        {errors.kode_proses_bisnis && <><h1 className="text-red-500">kode proses bisnis harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="tahun">Tahun</label>
                        <input
                            className="border px-4 py-2"
                            id="tahun"
                            type="number"
                            placeholder="Masukkan Tahun"
                            {...register("tahun", {required: true})}
                        />
                        {errors.tahun && <><h1 className="text-red-500">tahun harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_1_id">RAB Level 1</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_1_id"
                            {...register("rab_level_1_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_1_id && <><h1 className="text-red-500">rab Level 1 Harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_2_id">RAB Level 2</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_2_id"
                            {...register("rab_level_2_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_2_id && <><h1 className="text-red-500">rab Level 2 Harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_3_id">RAB Level 3</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_3_id"
                            {...register("rab_level_3_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_3_id && <><h1 className="text-red-500">rab Level 3 Harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_4_id">RAB Level 4</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_4_id"
                            {...register("rab_level_4_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_4_id && <><h1 className="text-red-500">rab Level 4 Harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_5_id">RAB Level 5</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_5_id"
                            {...register("rab_level_5_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_5_id && <><h1 className="text-red-500">rab Level 5 Harus terisi</h1></>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="rab_level_6_id">RAB Level 6</label>
                        <select
                            className="border px-4 py-2"
                            id="rab_level_6_id"
                            {...register("rab_level_6_id", {required: true})}
                        >
                        </select>
                        {errors.rab_level_6_id && <><h1 className="text-red-500">rab Level 6 Harus terisi</h1></>}
                    </div>
                    <div className="pt-5">
                        <Button className="w-full">Simpan</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormTambahData;
