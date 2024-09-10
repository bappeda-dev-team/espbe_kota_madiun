"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {ButtonSc, ButtonTr} from "@/components/common/Button/Button";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { getToken, getUser } from "@/app/Login/Auth/Auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface OptionType {
  value: number;
  label: string;
  kode?: string;
}

interface FormValues {
  rab_level_1_id: OptionType | null;
  rab_level_2_id: OptionType | null;
  rab_level_3_id: OptionType | null;
}

const SdmInfrastruktur = () => {
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);

  const [rab_level_1_3_option, set_rab_level_1_3_option] = useState<OptionType[]>([]);

  const [selectedRab1, setSelectedRab1] = useState<OptionType | null>(null);
  const [selectedRab2, setSelectedRab2] = useState<OptionType | null>(null);
  const [selectedRab3, setSelectedRab3] = useState<OptionType | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = getToken();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  },[])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      rab_level_1_id: selectedRab1,
      rab_level_2_id: selectedRab2,
      rab_level_3_id: selectedRab3,
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchdataid = async() => {
      try{
        const response = await fetch(`${API_URL}/v1/prosesbisnisbyid/13`, {
          headers: {
            'Authorization' : `${token}`,
          },
        });
        const data = await response.json();
        const result = data.data;

        if(result.rab_level_1){
          const rablevel1 = {
            label : `${result.rab_level_1.kode_referensi} ${result.rab_level_1.nama_referensi}`,
            kode : result.rab_level_1.kode_referensi,
            value : result.rab_level_1.Id,
          }
          setSelectedRab1(rablevel1);
          reset((prev) => ({ ...prev, rab_level_1_id: rablevel1 }));
        }
        if(result.rab_level_2){
          const rablevel2 = {
            label : `${result.rab_level_2.kode_referensi} ${result.rab_level_2.nama_referensi}`,
            kode : result.rab_level_2.kode_referensi,
            value : result.rab_level_2.Id,
          }
          setSelectedRab2(rablevel2);
          reset((prev) => ({ ...prev, rab_level_2_id: rablevel2 }));
        }
        if(result.rab_level_3){
          const rablevel3 = {
            label : `${result.rab_level_3.kode_referensi} ${result.rab_level_3.nama_referensi}`,
            kode : result.rab_level_3.kode_referensi,
            value : result.rab_level_3.Id,
          }
          setSelectedRab3(rablevel3);
          reset((prev) => ({ ...prev, rab_level_3_id: rablevel3 }));
        }
      }catch(err){
        console.error('gagal fetch data by id', err);
      }
    }
    fetchdataid();
  },[])

  const fetchRabLevel1_3 = async (level: number, value?: string) => {
    setIsLoading(true);
    try {
      const url = value ? `${API_URL}/v1/referensiarsitektur/${value}` : `${API_URL}/v1/referensiarsitektur`
      const response = await fetch(url, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      const data = await response.json();
      const filteredData = data.data.filter(
        (referensi: any) => referensi.level_referensi === level && referensi.jenis_referensi === "ProsesBisnis",
      );
      const result = filteredData.map((referensi: any) => ({
        value: referensi.Id,
        kode: referensi.kode_referensi,
        label: `${referensi.kode_referensi} ${referensi.nama_referensi}`,
      }));
      set_rab_level_1_3_option(result);
    } catch (error) {
      console.error("gagal memuat data option RAB Level 1 - 3");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      //key : value
      rab_level_1_id: data.rab_level_1_id?.value,
      rab_level_2_id: data.rab_level_2_id?.value,
      rab_level_3_id: data.rab_level_3_id?.value,
    };
      if(SelectedOpd == "" || SelectedOpd == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 1000);
      } else {
        console.log(formData);
        // try{
        //   const response = await fetch(`${API_URL}/v1/createprosesbisnis`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type" : "application/json",
        //       'Authorization': `${token}`,
        //     },
        //     body: JSON.stringify(formData),
        //   });
        //   if(response.ok){
        //     AlertNotification("Berhasil", "Berhasil menambahkan data proses bisnis", "success", 1000);
        //     router.push("/ProsesBisnis")
        //   } else {
        //     AlertNotification("Gagal", "cek koneksi interet atau database server", "error", 2000);
        //   }
        // } catch(err){
        //     AlertNotification("Gagal", "cek koneksi interet atau database server", "error", 2000);
        // }
      }
  };

  return (
    <div className="border p-5 rounded-xl shadow-xl">
      <h1 className="uppercase font-bold">Form Test Data</h1>
      <form
        className="flex flex-col mx-5 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >

        {isClient && (
          <>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_1_id"
              >
                RAB Level 1:
              </label>
              <Controller
                name="rab_level_1_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      value={selectedRab1}
                      placeholder="Masukkan RAB Level 1"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      isSearchable
                      isClearable
                      onChange={(option) => {
                        setSelectedRab1(option);
                        field.onChange(option);
                        setSelectedRab2(null);
                        setSelectedRab3(null);
                      }}
                      onMenuOpen={() => {
                        if (rab_level_1_3_option.length === 0) {
                          fetchRabLevel1_3(1);
                        }
                      }}
                      onMenuClose={() => set_rab_level_1_3_option([])}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        }),
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_2_id"
              >
                RAB Level 2:
              </label>
              <Controller
                name="rab_level_2_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAB Level 2"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      value={selectedRab2}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (selectedRab1?.kode) {
                          fetchRabLevel1_3(2, selectedRab1.kode);
                        }
                      }}
                      onMenuClose={() => { set_rab_level_1_3_option([]);}}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab2(option);
                        setSelectedRab3(null);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        }),
                      }}
                      isDisabled={!selectedRab1}
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="rab_level_3_id"
              >
                RAB Level 3:
              </label>
              <Controller
                name="rab_level_3_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Masukkan RAB Level 3"
                      options={rab_level_1_3_option}
                      isLoading={isLoading}
                      value={selectedRab3}
                      isSearchable
                      isClearable
                      onMenuOpen={() => {
                        if (selectedRab2?.kode) {
                          fetchRabLevel1_3(3, selectedRab2.kode);
                        }
                      }}
                      onMenuClose={() => set_rab_level_1_3_option([])}
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedRab3(option);
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderRadius: '8px',
                        }),
                      }}
                      isDisabled={!selectedRab2}
                    />
                  </>
                )}
              />
            </div>
          </>
        )}
        <ButtonSc typee="submit" className="mt-5">
          Simpan
        </ButtonSc>
      </form>
    </div>
  );
};

export default SdmInfrastruktur;
