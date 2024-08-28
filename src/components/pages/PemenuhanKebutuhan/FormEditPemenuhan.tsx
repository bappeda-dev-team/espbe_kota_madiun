"use client"

import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { getToken } from "@/app/Login/Auth/Auth";
import { useEffect, useState } from "react";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";

interface OptionTypeString {
    value: string;
    label: string;
}

interface formValue {
    indikator_pj : OptionTypeString;
    penanggung_jawab : OptionTypeString | null;
}

const FormEditPemenuhan = () => {

    const {id} = useParams();
    const token = getToken();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm<formValue>();

    const [isClient, setIsClient] = useState<boolean>(false); 
    const [SelectedIndikatorPJ, setSelectedIndikatorPj] = useState<OptionTypeString | null>(null);
    const [SelectedPJ, setSelectedPJ] = useState<OptionTypeString | null>(null);
    const [OptionOpd, setOptionOpd] = useState<OptionTypeString[]>([]);

    const OptionIndikatorPj: OptionTypeString[] = [
        {value: "internal", label: "Internal"},
        {value: "eksternal", label: "Eksternal"}
    ]

    const indikatorValue = watch("indikator_pj");

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const fetchPemenuhan = async() => {
            try{
                const response = await fetch(`${API_URL}/v1/kebutuhanspbebyid/${id}`, {
                    headers: {
                        'Authorization': `${token}`,
                      },
                });
                const data = await response.json();
                const result = data.data;

                 if(result.indikator_pj){
                    const IndikatorPJ = {
                        value: result.indikator_pj,
                        label: result.indikator_pj,
                    };
                    setSelectedIndikatorPj(IndikatorPJ);
                    reset((prev) => ({ ...prev, indikator_pj: IndikatorPJ }));
                };
                if(result.penanggung_jawab){
                    const PenanggungJawab = {
                        value: result.penanggung_jawab,
                        label: result.penanggung_jawab,
                    };
                    setSelectedPJ(PenanggungJawab);
                    reset((prev) => ({ ...prev, penanggung_jawab: PenanggungJawab }));
                 };
            } catch (err) {
                console.log(err);
            }
        };
        fetchPemenuhan();
        setIsClient(true);
    },[reset, id, token]);

    const fetchOpd = async() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try{
            const response = await fetch(`${API_URL}/v1/opdall`, {
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

    const handleChange = (option: any, actionMeta: any) => {
      if (actionMeta.name === "indikator_pj") {
        setSelectedIndikatorPj(option);
      } else if (actionMeta.name === "penanggung_jawab") {
        setSelectedPJ(option);
      } 
    };

    const onSubmit: SubmitHandler<formValue> = async (data) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = {
        indikator_pj : data.indikator_pj?.value,
        penanggung_jawab : data.penanggung_jawab?.value
      };
    //   console.log(formData);
      try {
        const response = await fetch(`${API_URL}/v1/updatepjkebutuhanspbe/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          AlertNotification("Berhasil", "Data Informasi Berhasil Di Edit", "success", 1000);
          router.push("/PemenuhanKebutuhan");
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } catch (error) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
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
                            htmlFor="indikator_pj"
                        >
                            Indikator PJ :
                        </label>
                        <Controller
                            name="indikator_pj"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        id="indikator_pj"
                                        value={SelectedIndikatorPJ || null}
                                        options={OptionIndikatorPj}
                                        isClearable={true}
                                        onChange={(option) => {
                                            field.onChange(option);
                                            handleChange(option, { name: "indikator_pj" });
                                          }}
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
                    {indikatorValue?.value === "eksternal" && 
                        <div className="flex flex-col py-3">
                            <label
                                className="uppercase text-xs font-bold text-gray-700 my-2"
                                htmlFor="penanggung_jawab"
                            >
                                Penanggung Jawab :
                            </label>
                            <Controller
                                name="penanggung_jawab"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="penanggung_jawab"
                                            value={SelectedPJ || null}
                                            options={OptionOpd}
                                            isClearable={true}
                                            isSearchable
                                            onMenuOpen={() => {
                                                if(OptionOpd.length == 0){
                                                    fetchOpd();
                                                }
                                            }}
                                            onMenuClose={() => {
                                                setOptionOpd([]);
                                            }}
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
                    }
                    <button type="submit">simpan</button>
                </form>
            </div>
        </>
    )
}

export default FormEditPemenuhan;