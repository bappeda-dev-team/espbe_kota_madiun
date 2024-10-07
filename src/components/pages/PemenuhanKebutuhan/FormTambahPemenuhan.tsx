"use client"

import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { getToken, getUser } from "@/app/Login/Auth/Auth";
import { useEffect, useState } from "react";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface OptionType {
    value: number;
    label: string;
}
interface OptionTypeString {
    value: string;
    label: string;
}
interface tahun_pelaksanaan {
    tahun: number;
}

interface formValue {
    id_sasaran_kinerja: OptionType;
    indikator_pd : OptionTypeString;
    perangkat_daerah : OptionTypeString | null;
    tahun_pelaksanaan: tahun_pelaksanaan[];
}

const FormTambahPemenuhan = () => {

    const {id} = useParams();
    const token = getToken();
    const router = useRouter();
    const [isClient, setIsClient] = useState<boolean>(false);
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<formValue>();

    const [SelectedSasaranKinerja, setSelectedSasaranKinerja] = useState<OptionType | null>(null);
    // const [selectedKodeOpd, setSelectedKodeOpd] = useState<string | null>(null);
    
    const [get2025, set2025] = useState<boolean | null>(null);
    const [get2026, set2026] = useState<boolean | null>(null);
    const [get2027, set2027] = useState<boolean | null>(null);
    const [get2028, set2028] = useState<boolean | null>(null);
    const [get2029, set2029] = useState<boolean | null>(null);

    const [OptionSasaranKinerja, setOptionSasaranKinerja] = useState<OptionType[]>([]);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
    },[])

    // useEffect(() => {
    //     const API_URL = process.env.NEXT_PUBLIC_API_URL;
    //     const fetchPemenuhan = async () => {
    //         try {
    //             const response = await fetch(`${API_URL}/v1/penanggungjawabkebutuhanspbe/${id}`, {
    //                 headers: {
    //                     'Authorization': `${token}`,
    //                 },
    //             });
    
    //             const data = await response.json();
    //             const result = data.data;
                
    //             if (result) {
    //                 if (result.kode_opd) {
    //                     setSelectedKodeOpd(result.kode_opd);
    //                 }
    //             }
    //         } catch (err) {
    //             console.error('Error fetching data by id:', err);
    //         }
    //     };
    //     fetchPemenuhan();
    //     setIsClient(true);
    
    // }, [id, token]);

    const fetchSasaranKinerja = async() => {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/sasaranKinerjaPegawai`, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                  },
            });
            const data = await response.json();
            const SK = data.data.map((item: any) => ({
              value : item.id,
              label : item.sasaran_kinerja,
            })); 
            setOptionSasaranKinerja(SK);
        } catch(err) {
            console.log("gagal fetch data Sasaran Kinerja", err);
        } finally {
            setLoading(false);
        }
    }

    const onSubmit: SubmitHandler<formValue> = async (data) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const tahunPelaksanaan = [
        get2025 ? { tahun: 2025 } : null,
        get2026 ? { tahun: 2026 } : null,
        get2027 ? { tahun: 2027 } : null,
        get2028 ? { tahun: 2028 } : null,
        get2029 ? { tahun: 2029 } : null,
      ].filter(Boolean); 

      const formData = {
        id_sasaran_kinerja: data.id_sasaran_kinerja?.value,
        tahun_pelaksanaan: tahunPelaksanaan,
      };
        if(user?.roles == 'admin_kota'){
            if(SelectedOpd == "" || SelectedOpd == "all_opd"){
            AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
            } else {
                // console.log(formData);
                try {
                    const response = await fetch(`${API_URL}/v1/createrencanaPelaksanaan?id_kebutuhan=${id}&kode_opd=${SelectedOpd}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `${token}`,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        AlertNotification("Berhasil", "Pemenuhan Kebutuhan Berhasil Diubah", "success", 1000);
                        router.push("/PemenuhanKebutuhan");
                    } else {
                        AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
                    }
                } catch (error) {
                    AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
                }
            }
        } else {
            // console.log(formData);
            try {
                const response = await fetch(`${API_URL}/v1/createrencanaPelaksanaan?id_kebutuhan=${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    AlertNotification("Berhasil", "Pemenuhan Kebutuhan Berhasil Diubah", "success", 1000);
                    router.push("/PemenuhanKebutuhan");
                } else {
                    AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
                }
            } catch (error) {
                AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
            }
        }
    };
    
    return(
        <>
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Pemenuhan</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="id_sasaran_kinerja"
                        >
                            Sasaran Kinerja :
                        </label>
                        <Controller
                            name="id_sasaran_kinerja"
                            control={control}
                            rules={{required: "Sasaran kinerja harus terisi"}}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="id_sasaran_kinerja"
                                        value={SelectedSasaranKinerja || null}
                                        placeholder="pilih sasaran kinerja"
                                        options={OptionSasaranKinerja}
                                        isClearable={true}
                                        isLoading={loading}
                                        onMenuOpen={() => fetchSasaranKinerja()}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            setSelectedSasaranKinerja(option);
                                          }}
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderRadius: '8px',
                                            })
                                        }}
                                    />
                                    {errors.id_sasaran_kinerja ?
                                    <h1 className="text-red-500">
                                        {errors.id_sasaran_kinerja.message}
                                    </h1>
                                    :
                                    <h1 className="text-slate-300 text-xs">*Sasaran Kinerja Harus Terisi</h1>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <label className="uppercase text-xs font-bold text-gray-700 my-2">Pilih Tahun Pelaksanaan :</label>
                    <div className="flex flex-wrap justify-evenly my-3 gap-3">
                        {get2025 ?
                        <button type="button" className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg" onClick={() => set2025(false)}>
                            2025
                        </button>
                        :
                        <button type="button" className="mx-1 py-1 min-w-[100px] border border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg text-gray-300" onClick={() => set2025(true)}>
                            2025
                        </button>
                        }
                        {get2026 ?
                        <button type="button" className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg" onClick={() => set2026(false)}>
                            2026
                        </button>
                        :
                        <button type="button" className="mx-1 py-1 min-w-[100px] border border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg text-gray-300" onClick={() => set2026(true)}>
                            2026
                        </button>
                        }
                        {get2027 ?
                        <button type="button" className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg" onClick={() => set2027(false)}>
                            2027
                        </button>
                        :
                        <button type="button" className="mx-1 py-1 min-w-[100px] border border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg text-gray-300" onClick={() => set2027(true)}>
                            2027
                        </button>
                        }
                        {get2028 ?
                        <button type="button" className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg" onClick={() => set2028(false)}>
                            2028
                        </button>
                        :
                        <button type="button" className="mx-1 py-1 min-w-[100px] border border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg text-gray-300" onClick={() => set2028(true)}>
                            2028
                        </button>
                        }
                        {get2029 ?
                        <button type="button" className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg" onClick={() => set2029(false)}>
                            2029
                        </button>
                        :
                        <button type="button" className="mx-1 py-1 min-w-[100px] border border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg text-gray-300" onClick={() => set2029(true)}>
                            2029
                        </button>
                        }
                    </div>
                    <ButtonSc className="w-full my-3" typee="submit">simpan</ButtonSc>
                    <ButtonTr className="w-full" typee="button" halaman_url="/PemenuhanKebutuhan">Kembali</ButtonTr>
                </form>
            </div>
        </>
    )
}

export default FormTambahPemenuhan;