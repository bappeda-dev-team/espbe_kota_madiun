"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import Button from "@/components/common/Button/Button";
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
            const response = await fetch(`${API_URL}/v1/prosesbisnis`);
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
                        {/* jenis kebutuhan */}
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kebutuhan">
                                Jenis Kebutuhan :
                            </label>
                            <Controller
                                name="jenis_kebutuhan.0.kebutuhan"
                                control={control}
                                rules={{ required: "Jenis Kebutuhan Harus Terisi" }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            className="border px-4 py-2 rounded"
                                            {...field}
                                            type="text"
                                            id="kebutuhan"
                                            placeholder="Masukkan jenis kebutuhan"
                                        />
                                        {errors.jenis_kebutuhan?.[0]?.kebutuhan ? (
                                            <h1 className="text-red-500">
                                                {errors.jenis_kebutuhan[0].kebutuhan?.message}
                                            </h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Jenis Kebutuhan Harus Terisi</h1>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        {/* kondisi awal */}
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kondisi_awal1">
                                Kondisi Awal 1 :
                            </label>
                            <Controller
                                name="jenis_kebutuhan.0.kondisi_awal.0.keterangan"
                                control={control}
                                rules={{ required: "Kondisi Awal 1 Harus Terisi" }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            className="border px-4 py-2 rounded"
                                            {...field}
                                            type="textarea"
                                            id="kondisi_awal1"
                                            placeholder="Masukkan kondisi awal 1"
                                        />
                                        {errors.jenis_kebutuhan?.[0]?.kondisi_awal?.[0]?.keterangan ? (
                                            <h1 className="text-red-500">
                                                {errors.jenis_kebutuhan[0].kondisi_awal[0].keterangan?.message}
                                            </h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Kondisi Awal 1 Harus Terisi</h1>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col py-3">
                            <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="kondisi_awal2">
                                Kondisi Awal 2 :
                            </label>
                            <Controller
                                name="jenis_kebutuhan.0.kondisi_awal.1.keterangan"
                                control={control}
                                rules={{ required: "Kondisi Awal 2 Harus Terisi" }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            className="border px-4 py-2 rounded"
                                            {...field}
                                            type="textarea"
                                            id="kondisi_awal2"
                                            placeholder="Masukkan kondisi awal 2"
                                        />
                                        {errors.jenis_kebutuhan?.[0]?.kondisi_awal?.[1]?.keterangan ? (
                                            <h1 className="text-red-500">
                                                {errors.jenis_kebutuhan[0].kondisi_awal[1].keterangan?.message}
                                            </h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Kondisi Awal 2 Harus Terisi</h1>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <Button typee="submit">Tambah Kebutuhan</Button>
                        <Button className="bg-red-500 hover:bg-red-700 mt-3" halaman_url="/KebutuhanSPBE">Kembali</Button>
                    </form>
                </div>
            )}
        </>
    );
};

export default FormTambahKebutuhan;
