"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import Select from "react-select";
import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";

interface OptionTypeString {
    label: string;
    value: string;
}
interface OptionType {
    label: string;
    value: number;
}

interface FormValues {
    kode_opd: string;
    tahun: number;
    nama_domain: OptionTypeString | null;
    id_prosesbisnis: OptionType | null;
    jenis_kebutuhan: JenisKebutuhan[];
}
interface KondisiAwal {
    keterangan: string;
    tahun: number;
}

interface JenisKebutuhan {
    kebutuhan: string;
    kondisi_awal: KondisiAwal[];
}


const FormTambahKebutuhan = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState<boolean>(false);
    const [domain, setDomain] = useState<OptionTypeString[]>([]);
    const [prosesBisnis, setProsesBisnis] = useState<OptionType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            kode_opd: "5.01.5.05.0.00.02.0000",
            tahun: 2024,
            nama_domain: null,
            id_prosesbisnis: null,
            jenis_kebutuhan: [
                {
                    kebutuhan: "",
                    kondisi_awal: [
                        { keterangan: "", tahun: 2022 },
                        { keterangan: "", tahun: 2023 },
                        { keterangan: "", tahun: 2024 },
                    ],
                },
            ],
        },
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "jenis_kebutuhan",
    });

    const fetchDomain = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setIsLoading(true);
        try{
            const response = await fetch(`${API_URL}/v1/domainspbe`);
            const data = await response.json();
            const result = data.data.map((item: any) => ({
                label: item.nama_domain,
                value: item.nama_domain,
            }));
            setDomain(result);
        } catch (err) {
            console.log("gagal fetch data domain");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProsesBisnis = async () => {
       const API_URL = process.env.NEXT_PUBLIC_API_URL;
       setIsLoading(true);
       try{
            const response = await fetch(`${API_URL}/v1/prosesbisnisnogap`);
            const data = await response.json();
            const result = data.data.map((item: any) => ({
                label: item.nama_proses_bisnis,
                value: item.id,
            }));
            setProsesBisnis(result);
       } catch (err) {
            console.log("gagal fetch data proses bisnis");
       } finally {
            setIsLoading(false);
       }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const formData = {
            kode_opd: "5.01.5.05.0.00.02.0000",
            tahun: data.tahun,
            nama_domain: data.nama_domain?.value,
            id_prosesbisnis: data.id_prosesbisnis?.value,
            jenis_kebutuhan: data.jenis_kebutuhan.map((kebutuhan, index) => ({
                kebutuhan: kebutuhan.kebutuhan,
                kondisi_awal: kebutuhan.kondisi_awal.map((kondisi, idx) => ({
                    keterangan: kondisi.keterangan,
                    tahun: kondisi.tahun,
                })),
            })),
        };
        // console.log(formData);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${API_URL}/v1/createkebutuhanspbe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                AlertNotification("Berhasil", "Kebutuhan SPBE Berhasil Ditambahkan", "success", 1000);
                router.push("/KebutuhanSPBE");
            } else {
                AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
            }
        } catch (err) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
    };

    return (
        <>
            {isClient && (
                <div className="border p-5">
                    <h1 className="uppercase font-bold">Form tambah Kebutuhan SPBE</h1>
                    <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_domain">
                                Nama Domain :
                            </label>
                            <Controller
                                name="nama_domain"
                                control={control}
                                rules={{ required: "Nama Domain Harus Terisi" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            options={domain}
                                            isSearchable
                                            isClearable
                                            placeholder="Pilih nama domain"
                                            isLoading={isLoading}
                                            onMenuOpen={() => fetchDomain()}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                  ...baseStyles,
                                                  borderRadius: '8px', // This applies the rounded-full effect
                                                  borderColor: state.isFocused ? 'your-focus-color' : 'your-normal-color',
                                                }),
                                              }}
                                        />
                                        {errors.nama_domain ? (
                                            <h1 className="text-red-500">
                                                {errors.nama_domain.message}
                                            </h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Nama Domain Harus Terisi</h1>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="id_prosesbisnis">
                                Nama Proses Bisnis :
                            </label>
                            <Controller
                                name="id_prosesbisnis"
                                control={control}
                                rules={{ required: "Proses Bisnis Harus Terisi" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            options={prosesBisnis}
                                            isSearchable
                                            isClearable
                                            placeholder="Pilih Proses Bisnis"
                                            isLoading={isLoading}
                                            onMenuOpen={() => fetchProsesBisnis()}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                  ...baseStyles,
                                                  borderRadius: '8px', // This applies the rounded-full effect
                                                  borderColor: state.isFocused ? 'your-focus-color' : 'your-normal-color',
                                                }),
                                              }}
                                        />
                                        {errors.id_prosesbisnis ? (
                                            <h1 className="text-red-500">
                                                {errors.id_prosesbisnis.message}
                                            </h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Nama Proses Bisnis Harus Terisi</h1>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        {/* Jenis Kebutuhan */}
                        {fields.map((item, index) => (
                            <div className="bg-emerald-50 mb-3 mt-1 px-3 rounded-lg" key={item.id}>
                                <div className="flex flex-col py-3">
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
                                                    className="border px-4 py-2 rounded-lg"
                                                    {...field}
                                                    type="text"
                                                    id={`jenis_kebutuhan.${index}.kebutuhan`}
                                                    placeholder="Masukkan jenis kebutuhan"
                                                />
                                                {errors.jenis_kebutuhan?.[index]?.kebutuhan ? (
                                                    <h1 className="text-red-500">
                                                        {errors.jenis_kebutuhan?.[index]?.kebutuhan?.message}
                                                    </h1>
                                                ) : (
                                                    <h1 className="text-slate-300 text-xs">*Jenis Kebutuhan Harus Terisi</h1>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                {/* Kondisi Awal */}
                                {item.kondisi_awal.map((_, subIndex) => (
                                    <div className="flex flex-col py-3" key={subIndex}>
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
                                                        className="border px-4 py-2 rounded-lg"
                                                        {...field}
                                                        type="text"
                                                        id={`jenis_kebutuhan.${index}.kondisi_awal.${subIndex}.keterangan`}
                                                        placeholder={`Masukkan kondisi awal ${subIndex + 1}`}
                                                    />
                                                    {errors.jenis_kebutuhan?.[index]?.kondisi_awal?.[subIndex]?.keterangan ? (
                                                        <h1 className="text-red-500">
                                                            {errors.jenis_kebutuhan?.[index]?.kondisi_awal?.[subIndex]?.keterangan?.message}
                                                        </h1>
                                                    ) : (
                                                        <h1 className="text-slate-300 text-xs">*Kondisi Awal {subIndex + 1} Harus Terisi</h1>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                ))}

                                {/* Button to remove a specific jenis kebutuhan */}
                                <ButtonTr className="mb-3" typee="button" onClick={() => remove(index)}>Hapus Jenis Kebutuhan</ButtonTr>
                            </div>
                        ))}
                        {/* Button to add new jenis kebutuhan */}
                        <ButtonPr
                            className="mb-3"
                            typee="button"
                            onClick={() => append({ kebutuhan: "", kondisi_awal: [{ keterangan: "", tahun: 2023 }, { keterangan: "", tahun: 2024 }] })}
                        >
                            Tambah Jenis Kebutuhan
                        </ButtonPr>
                        <ButtonSc typee="submit">Simpan Data Kebutuhan SPBE</ButtonSc>
                        <ButtonTr className="mt-3" halaman_url="/KebutuhanSPBE">Kembali</ButtonTr>
                    </form>
                </div>
            )}
        </>
    );
};

export default FormTambahKebutuhan;
