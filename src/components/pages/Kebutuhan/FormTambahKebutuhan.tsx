"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import Select from "react-select";
import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const router = useRouter();
    const token = getToken();
    const [user, setUser] = useState<any>(null);
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
            kode_opd: user?.roles == 'admin_kota' ? SelectedOpd : user?.kode_opd,
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
        const fetchUser = getUser();
        setUser(fetchUser);
    },[])

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
            const response = await fetch(`${API_URL}/v1/domainspbe`, {
                headers: {
                  'Authorization': `${token}`,
                },
              });
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
            const response = await fetch(`${API_URL}/v1/prosesbisnisnogap`, {
                headers: {
                  'Authorization': `${token}`,
                },
              });
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
            kode_opd: user?.roles == 'admin_kota' ? SelectedOpd : user?.kode_opd,
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
                    'Authorization': `${token}`,
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
                <div className="border p-5 rounded-xl shadow-xl">
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
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderRadius: '8px',
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
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderRadius: '8px',
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
                            <div className="bg-emerald-50 mb-3 mt-1 px-3 rounded-xl" key={item.id}>
                                <div className="flex flex-col py-3">
                                    <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor={`jenis_kebutuhan.${index}.kebutuhan`}>
                                        Kebutuhan {index + 1}:
                                    </label>
                                    <Controller
                                        name={`jenis_kebutuhan.${index}.kebutuhan`}
                                        control={control}
                                        rules={{ required: "Kebutuhan Harus Terisi" }}
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
                                                    <h1 className="text-slate-300 text-xs">*Kebutuhan Harus Terisi</h1>
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
                                                        placeholder={`Tuliskan "-" atau "kosong" jika kondisi awal ${subIndex + 1} kosong`}
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
                        <div className="flex justify-between w-full">
                            <ButtonSc className="mx-2 w-full" typee="submit">Simpan Data Kebutuhan SPBE</ButtonSc>
                            <ButtonTr className="mx-2 w-full" halaman_url="/KebutuhanSPBE">Kembali</ButtonTr>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default FormTambahKebutuhan;
