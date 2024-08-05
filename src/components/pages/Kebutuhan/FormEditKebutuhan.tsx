"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Select from "react-select";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";

interface OptionType {
    value: number;
    label: string;
}

interface OptionTypeString {
    value: string;
    label: string;
}

interface KondisiAwal {
    keterangan: string;
    tahun: number;
}

interface JenisKebutuhan {
    kebutuhan: string;
    kondisi_awal: KondisiAwal[];
}

interface FormValues {
    kode_opd: string;
    tahun: number;
    nama_domain: OptionTypeString | null;
    jenis_kebutuhan: JenisKebutuhan[];
    proses_bisnis: OptionType | null;
}

const FormEditKebutuhan = () => {
    const { id } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNamaDomain, setSelectedNamaDomain] = useState<OptionTypeString | null>(null);
    const [selectedNamaProsesBisnis, setSelectedNamaProsesBisnis] = useState<OptionType | null>(null);
    const [optionDomain, setOptionDomain] = useState<OptionTypeString[]>([]);
    const [optionProsesBisnis, setOptionProsesBisnis] = useState<OptionType[]>([]);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            kode_opd: "5.01.5.05.0.00.02.0000",
            tahun: 2024,
            nama_domain: null,
            jenis_kebutuhan: [],
        },
    });

    const { fields, append, replace, remove } = useFieldArray({
        control,
        name: "jenis_kebutuhan",
    });

    const handleChange = (option: any, actionMeta: any) => {
        if (actionMeta.name === "nama_domain") {
            setSelectedNamaDomain(option);
        }
    };

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDataById = async () => {
            try {
                const response = await fetch(`${API_URL}/v1/kebutuhanspbebyid/${id}`);
                const data = await response.json();
                const result = data.data;

                // Set nama_domain
                if (result.nama_domain) {
                    const selectedDomain = {
                        value: result.nama_domain,
                        label: result.nama_domain,
                    };
                    setSelectedNamaDomain(selectedDomain);
                }

                // Set id_prosesbisnis
                if (result.proses_bisnis) {
                    const selectedProsesBisnis = {
                        value: result.proses_bisnis.id,
                        label: result.proses_bisnis.nama_proses_bisnis,
                    };
                    setSelectedNamaProsesBisnis(selectedProsesBisnis);
                }

                // Reset form data with fetched data
                reset({
                    kode_opd: result.kode_opd,
                    tahun: result.tahun,
                    nama_domain: {
                        value: result.nama_domain,
                        label: result.nama_domain,
                    },
                    proses_bisnis: {
                        value: result.proses_bisnis.id,
                        label: result.proses_bisnis.nama_proses_bisnis,
                    },
                    jenis_kebutuhan: result.jenis_kebutuhan.map((kebutuhan: JenisKebutuhan) => ({
                        kebutuhan: kebutuhan.kebutuhan,
                        kondisi_awal: kebutuhan.kondisi_awal.map((kondisi: KondisiAwal) => ({
                            keterangan: kondisi.keterangan,
                            tahun: kondisi.tahun,
                        })),
                    })),
                });

                // Replace the fields to avoid duplication
                replace(result.jenis_kebutuhan.map((kebutuhan: JenisKebutuhan) => ({
                    kebutuhan: kebutuhan.kebutuhan,
                    kondisi_awal: kebutuhan.kondisi_awal,
                })));
            } catch (err) {
                console.log("Gagal fetch data default value by id", err);
            }
        };

        fetchDataById();
    }, [reset, replace, id]);

    const fetchDomain = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/v1/domainspbe`);
            const data = await response.json();
            const result = data.data.map((item: any) => ({
                label: item.nama_domain,
                value: item.nama_domain,
            }));
            setOptionDomain(result);
        } catch (err) {
            console.log("Gagal fetch data domain", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProsesBisnis = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/v1/prosesbisnisnogap`);
            const data = await response.json();
            const result = data.data.map((item: any) => ({
                label: item.nama_proses_bisnis,
                value: item.id,
            }));
            setOptionProsesBisnis(result);
        } catch (err) {
            console.log("Gagal fetch data proses bisnis", err);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            kode_opd: data.kode_opd,
            tahun: data.tahun,
            nama_domain: data.nama_domain?.value,
            id_prosesbisnis: data.proses_bisnis?.value,
            jenis_kebutuhan: data.jenis_kebutuhan.map((kebutuhan) => ({
                kebutuhan: kebutuhan.kebutuhan,
                kondisi_awal: kebutuhan.kondisi_awal.map((kondisi) => ({
                    keterangan: kondisi.keterangan,
                    tahun: kondisi.tahun,
                })),
            })),
        };

        try {
            const response = await fetch(`${API_URL}/v1/updatekebutuhanspbe/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                AlertNotification("Berhasil", "Kebutuhan SPBE Berhasil Diubah", "success", 1000);
                router.push("/KebutuhanSPBE");
            } else {
                AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
            }
        } catch (error) {
            AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
        }
    };

    return (
        <div className="border p-5">
            <h1 className="uppercase font-bold">Form Edit Kebutuhan SPBE</h1>
            <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_domain">
                        Nama Domain:
                    </label>
                    <Controller
                        name="nama_domain"
                        control={control}
                        rules={{ required: "Nama Domain Harus Terisi" }}
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    id="nama_domain"
                                    value={selectedNamaDomain || null}
                                    placeholder="Pilih Nama Domain"
                                    isLoading={isLoading}
                                    options={optionDomain}
                                    isClearable={true}
                                    onChange={(option) => {
                                        field.onChange(option);
                                        handleChange(option, { name: "nama_domain" });
                                    }}
                                    onMenuOpen={fetchDomain}
                                />
                                {errors.nama_domain ? (
                                    <h1 className="text-red-500">{errors.nama_domain.message}</h1>
                                ) : (
                                    <h1 className="text-slate-300 text-xs">*Nama Domain Harus Terisi</h1>
                                )}
                            </>
                        )}
                    />
                </div>

                <div className="flex flex-col py-3">
                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="id_prosesbisnis">
                        Proses Bisnis:
                    </label>
                    <Controller
                        name="proses_bisnis"
                        control={control}
                        rules={{ required: "Proses Bisnis Harus Terisi" }}
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    id="proses_bisnis"
                                    value={selectedNamaProsesBisnis || null}
                                    placeholder="Pilih Proses Bisnis"
                                    isLoading={isLoading}
                                    options={optionProsesBisnis}
                                    onChange={(option) => {
                                        field.onChange(option);
                                        handleChange(option, { name: "proses_bisnis" });
                                    }}
                                    isClearable={true}
                                    onMenuOpen={fetchProsesBisnis}
                                />
                                {errors.proses_bisnis ? (
                                    <h1 className="text-red-500">{errors.proses_bisnis.message}</h1>
                                ) : (
                                    <h1 className="text-slate-300 text-xs">*Proses Bisnis Harus Terisi</h1>
                                )}
                            </>
                        )}
                    />
                </div>

                {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-col mb-3 py-2 px-3 bg-emerald-50 rounded-xl">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor={`jenis_kebutuhan.${index}.kebutuhan`}>
                            Jenis Kebutuhan {index + 1}:
                        </label>
                        <Controller
                            name={`jenis_kebutuhan.${index}.kebutuhan`}
                            control={control}
                            rules={{ required: "Jenis Kebutuhan Harus Terisi" }}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        className="border px-4 py-2 rounded"
                                        id={`jenis_kebutuhan.${index}.kebutuhan`}
                                        type="text"
                                    />
                                    {errors.jenis_kebutuhan?.[index]?.kebutuhan ? (
                                        <h1 className="text-red-500">{errors.jenis_kebutuhan[index]?.kebutuhan?.message}</h1>
                                    ) : (
                                        <h1 className="text-slate-300 text-xs">*Jenis Kebutuhan Harus Terisi</h1>
                                    )}
                                </>
                            )}
                        />

                        {item.kondisi_awal.map((_, subIndex) => (
                            <div key={subIndex} className="flex flex-col py-3">
                                <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor={`jenis_kebutuhan.${index}.kondisi_awal.${subIndex}.keterangan`}>
                                    Kondisi Awal {subIndex + 1}:
                                </label>
                                <Controller
                                    name={`jenis_kebutuhan.${index}.kondisi_awal.${subIndex}.keterangan`}
                                    control={control}
                                    rules={{ required: `Kondisi Awal ${subIndex + 1} Harus Terisi` }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                className="border px-4 py-2 rounded"
                                                id={`jenis_kebutuhan.${index}.kondisi_awal.${subIndex}.keterangan`}
                                                type="text"
                                            />
                                            {errors.jenis_kebutuhan?.[index]?.kondisi_awal?.[subIndex]?.keterangan ? (
                                                <h1 className="text-red-500">{errors.jenis_kebutuhan?.[index]?.kondisi_awal?.[subIndex]?.keterangan?.message}</h1>
                                            ) : (
                                                <h1 className="text-slate-300 text-xs">*Kondisi Awal {subIndex + 1} Harus Terisi</h1>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        ))}
                        {/* Button to remove a specific jenis kebutuhan */}
                        <Button className="bg-red-500 hover:bg-red-700 mb-3" typee="button" onClick={() => remove(index)}>Hapus Jenis Kebutuhan</Button>
                    </div>
                ))}
                <Button
                    className="bg-gradient-to-r from-[#071952] to-[#008DDA] text-white hover:from-[#256D85] hover:to-[#8FE3CF] mb-3"
                    typee="button"
                    onClick={() => append({ kebutuhan: "", kondisi_awal: [{ keterangan: "", tahun: 2023 }, { keterangan: "", tahun: 2024 }] })}
                >
                    Tambah Jenis Kebutuhan
                </Button>
                <Button typee="submit">Simpan Data Kebutuhan SPBE</Button>
                <Button typee="button" className="mt-5 bg-red-500" halaman_url="/KebutuhanSPBE">
                    Kembali
                </Button>
            </form>
        </div>
    );
};

export default FormEditKebutuhan;
