"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {ButtonPr, ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import IdNull from "@/components/common/Alert/IdNull";

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
    keterangan: string;
    nama_domain: OptionTypeString | null;
    jenis_kebutuhan: JenisKebutuhan[] | null;
    proses_bisnis: OptionType | null;
    indikator_pj: OptionTypeString | null;
    penanggung_jawab: OptionTypeString | null;
}

const FormEditKebutuhan = () => {
    const { id } = useParams();
    const router = useRouter();
    const token = getToken();
    const [user, setUser] = useState<any>(null);
    const [SelectedOpd, setSelectedOpd] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [idNotFound, setIdNotFound] = useState<boolean | null>(null);
    const [selectedNamaProsesBisnis, setSelectedNamaProsesBisnis] = useState<OptionType | null>(null);
    const [selectedNamaDomain, setSelectedNamaDomain] = useState<OptionTypeString | null>(null);
    const [selectedIndikator_pj, setSelectedIndikator_pj] = useState<OptionTypeString | null>(null);
    const [selectedPenanggungJawab, setSelectedPenanggungJawab] = useState<OptionTypeString | null>(null);
    const [selectedKeterangan, setSelectedKeterangan] = useState<OptionType | null>(null);

    const [optionDomain, setOptionDomain] = useState<OptionTypeString[]>([]);
    const [optionOpd, setOptionOpd] = useState<OptionTypeString[]>([]);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
        const data = getOpdTahun();
        if(data.opd){
          const dataOpd = {
            value: data.opd.value,
            label: data.opd.label
          }
          setSelectedOpd(dataOpd);
        }
      }, []);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            nama_domain: null,
            indikator_pj: null,
            penanggung_jawab: null,
            jenis_kebutuhan: [],
        },
    });

    const { fields, append, replace, remove } = useFieldArray({
        control,
        name: "jenis_kebutuhan",
    });

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDataById = async () => {
            try {
                const response = await fetch(`${API_URL}/v1/kebutuhanspbebyid/${id}`, {
                    headers: {
                      'Authorization': `${token}`,
                    },
                  });
                const data = await response.json();
                if(data.code == 500){
                    setIdNotFound(true);
                } else {
                    const result = data.data;
                    
                    // Set id_prosesbisnis
                    if (result.proses_bisnis) {
                        const selectedProsesBisnis = {
                            value: result.proses_bisnis.id,
                            label: result.proses_bisnis.nama_proses_bisnis,
                        };
                        setSelectedNamaProsesBisnis(selectedProsesBisnis);
                    }
                    // Set Ketarangan
                    if (result.keterangan) {
                        const Keterangan = {
                            value: result.keterangan,
                            label: result.keterangan,
                        };
                        setSelectedKeterangan(Keterangan);
                    }
                    // Set nama_domain
                    if (result.nama_domain != "" && result.nama_domain !== null) {
                        const selectedDomain = {
                            value: result.nama_domain,
                            label: result.nama_domain,
                        };
                        setSelectedNamaDomain(selectedDomain);
                        reset((prev) => ({ ...prev, nama_domain: selectedDomain }));
                    }
                    // Set indikator_pj
                    if (result.indikator_pj) {
                        const selectedindikator = {
                            value: result.indikator_pj,
                            label: result.indikator_pj,
                        };
                        setSelectedIndikator_pj(selectedindikator);
                        reset((prev) => ({ ...prev, indikator_pj: selectedindikator }));
                    }
                    // Set penanggung_jawab
                    if (result.penanggung_jawab) {
                        const selectedPJ = {
                            value: result.penanggung_jawab,
                            label: result.penanggung_jawab,
                        };
                        setSelectedPenanggungJawab(selectedPJ);
                        reset((prev) => ({ ...prev, penanggung_jawab: selectedPJ }));
                    }
    
                    // Reset form data with fetched data
                    reset({
                        tahun: result.tahun,
                        nama_domain: {
                            value: result.nama_domain,
                            label: result.nama_domain,
                        },
                        proses_bisnis: {
                            value: result.proses_bisnis.id,
                            label: result.proses_bisnis.nama_proses_bisnis,
                        },
                        indikator_pj : {
                            value: result.indikator_pj,
                            label: result.indikator_pj,
                        },
                        penanggung_jawab: {
                            value: result.penanggung_jawab,
                            label: result.penanggung_jawab,
                        },
                        jenis_kebutuhan: result.jenis_kebutuhan?.map((kebutuhan: JenisKebutuhan) => ({
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
                }
            } catch (err) {
                console.error("Gagal fetch data default value by id", err);
            }
        };

        fetchDataById();
    }, [reset, replace, id, token, user, SelectedOpd]);

    const OptionIndikatorPj: OptionTypeString[] = [
        {value: "internal", label: "internal"},
        {value: "eksternal", label: "eksternal"}
    ]

    const fetchDomain = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        setIsLoading(true);
        try {
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
            setOptionDomain(result);
        } catch (err) {
            console.log("Gagal fetch data domain", err);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchOpd = async() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/opdeksternal`, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                  },
            });
            const data = await response.json();
            const opd = data.data.map((item: any) => ({
              value : item.kode_opd,
              label : item.nama_opd,
            })); 
            setOptionOpd(opd);
        } catch(err) {
            console.log("gagal fetch data opd", err);
        }
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formData = {
            kode_opd: user?.roles == 'admin_kota' ? SelectedOpd?.value : user?.kode_opd,
            tahun: data.tahun,
            nama_domain: data.nama_domain?.value,
            indikator_pj: data.indikator_pj?.value,
            penanggung_jawab: data.indikator_pj?.value == "eksternal" ? data.penanggung_jawab?.value : ( user?.roles == 'admin_kota' ? SelectedOpd?.value : user?.kode_opd),
            id_prosesbisnis: selectedNamaProsesBisnis?.value,
            jenis_kebutuhan: data.jenis_kebutuhan?.map((kebutuhan) => ({
                kebutuhan: kebutuhan.kebutuhan,
                kondisi_awal: kebutuhan.kondisi_awal.map((kondisi) => ({
                    keterangan: kondisi.keterangan,
                    tahun: kondisi.tahun,
                })),
            })),
        };
        if(user?.roles == 'admin_kota'){
            if(SelectedOpd?.value == (undefined || null) || SelectedOpd?.value == "all_opd"){
              AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000, true);
            } else {
                console.log(formData);
                try {
                    const response = await fetch(`${API_URL}/v1/updatekebutuhanspbe/${id}?kode_opd=${SelectedOpd?.value}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `${token}`,
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
            }
        } else {
            console.log(formData);
            try {
                const response = await fetch(`${API_URL}/v1/updatekebutuhanspbe/${id}?kode_opd=${user?.kode_opd}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `${token}`,
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
        }
    };

    if(idNotFound){
        const url = "/KebutuhanSPBE"
        return( <IdNull url={url}/>)
    } else {
        return (
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Kebutuhan SPBE</h1>
                <form className="flex flex-col mx-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="proses_bisnis">
                            Proses Bisnis:
                        </label>
                        <Controller
                            name="proses_bisnis"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="proses_bisnis"
                                        value={selectedNamaProsesBisnis || null}
                                        placeholder="Pilih Proses Bisnis"
                                        isLoading={isLoading}
                                        isDisabled
                                        isClearable={true}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="keterangan">
                            Keterangan:
                        </label>
                        <Controller
                            name="keterangan"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="keterangan"
                                        value={selectedKeterangan || null}
                                        isDisabled
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
                                    />
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="nama_domain">
                            Nama Domain:
                        </label>
                        <Controller
                            name="nama_domain"
                            control={control}
                            // rules={{ required: "Nama Domain Harus Terisi" }}
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
                                            setSelectedNamaDomain(option);
                                        }}
                                        onMenuOpen={fetchDomain}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
                                    />
                                    {/* {errors.nama_domain ? (
                                        <h1 className="text-red-500">{errors.nama_domain.message}</h1>
                                    ) : (
                                        <h1 className="text-slate-300 text-xs">*Nama Domain Harus Terisi</h1>
                                    )} */}
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="indikator_pj">
                            Pelaksana :
                        </label>
                        <Controller
                            name="indikator_pj"
                            control={control}
                            rules={{ required: "Indikator PJ Harus Terisi" }}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="indikator_pj"
                                        value={selectedIndikator_pj || null}
                                        placeholder="Pilih Indikator PJ"
                                        isLoading={isLoading}
                                        options={OptionIndikatorPj}
                                        isClearable={true}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setSelectedIndikator_pj(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
                                    />
                                    {errors.indikator_pj ? (
                                        <h1 className="text-red-500">{errors.indikator_pj.message}</h1>
                                    ) : (
                                        <h1 className="text-slate-300 text-xs">*Indikator PJ Harus Terisi</h1>
                                    )}
                                </>
                            )}
                        />
                    </div>
                    {selectedIndikator_pj?.value == 'eksternal' &&
                    <div className="flex flex-col py-3">
                        <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor="penanggung_jawab">
                            Perangkat Daerah:
                        </label>
                        <Controller
                            name="penanggung_jawab"
                            control={control}
                            rules={{ required: "Penanggung Jawab Harus Terisi" }}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="penanggung_jawab"
                                        value={selectedPenanggungJawab || null}
                                        placeholder="Pilih Penanggung Jawab"
                                        isLoading={isLoading}
                                        options={optionOpd}
                                        isClearable={true}
                                        onMenuOpen={() => fetchOpd()}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setSelectedPenanggungJawab(option);
                                        }}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                borderRadius: '8px',
                                            })
                                        }}
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
                    }
    
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex flex-col mb-3 py-2 px-3 bg-emerald-50 rounded-xl">
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
                                            {...field}
                                            className="border px-4 py-2 rounded-lg"
                                            id={`jenis_kebutuhan.${index}.kebutuhan`}
                                            type="text"
                                            placeholder={`Masukkan kebutuhan ${index + 1}`}
                                        />
                                        {errors.jenis_kebutuhan?.[index]?.kebutuhan ? (
                                            <h1 className="text-red-500">{errors.jenis_kebutuhan[index]?.kebutuhan?.message}</h1>
                                        ) : (
                                            <h1 className="text-slate-300 text-xs">*Kebutuhan Harus Terisi</h1>
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
                                                    className="border px-4 py-2 rounded-lg"
                                                    id={`jenis_kebutuhan.${index}.kondisi_awal.${subIndex}.keterangan`}
                                                    placeholder={`Tuliskan "-" atau "kosong" jika kondisi awal ${subIndex + 1} kosong`}
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
                            <ButtonTr className="mb-3" typee="button" onClick={() => remove(index)}>Hapus Jenis Kebutuhan</ButtonTr>
                        </div>
                    ))}
                    <ButtonPr
                        className="mb-3 mx-2"
                        typee="button"
                        onClick={() => append({ kebutuhan: "", kondisi_awal: [{ keterangan: "", tahun: 2022 }, { keterangan: "", tahun: 2023 }, { keterangan: "", tahun: 2024 }] })}
                    >
                        Tambah Jenis Kebutuhan
                    </ButtonPr>
                    <div className="flex justify-between w-full">
                        <ButtonSc className="w-full mx-2" typee="submit">Simpan Data Kebutuhan SPBE</ButtonSc>
                        <ButtonTr className="w-full mx-2" typee="button" halaman_url="/KebutuhanSPBE">
                            Kembali
                        </ButtonTr>
                    </div>
                </form>
            </div>
        );
    }
};

export default FormEditKebutuhan;
