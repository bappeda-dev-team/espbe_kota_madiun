"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getToken, getUser, getOpdTahun } from "@/app/Login/Auth/Auth";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import IdNull from "@/components/common/Alert/IdNull";
import Loading from "@/components/global/Loading/Loading";

interface KeteranganForm {
  keterangan_gap: string;
}

const FormEditKeteranganGap = () => {
  const { id } = useParams();
  const token = getToken();
  const router =  useRouter();
  const [user, setUser] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const { control, handleSubmit, reset} = useForm<KeteranganForm>();
  const [loading, setLoading] = useState<boolean>(true);
  const [idNotFound, setIdNotFound] = useState<boolean | null>(null);
  const [keteranganValue, setKeteranganValue] = useState<string>("");
  const [selectedProsesBisnis, setSelectedProsesBisnis] = useState<number>();

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

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchingData = async () => {
        try {
          const response = await fetch(`${API_URL}/v1/keteranganGap/${id}`, {
              headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'application/json',
              },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if(data.code == 500){
          setIdNotFound(true);
        } else if (data.status == "OK") {
          setKeteranganValue(data.data.keterangan_gap);
          setSelectedProsesBisnis(data.data.id_prosesbisnis);
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};
fetchingData();
}, [id, token]);

const onSubmit: SubmitHandler<KeteranganForm> = async(data) =>  {
    const formData ={
        id_prosesbisnis : selectedProsesBisnis,
        keterangan_gap : data.keterangan_gap
    }
    // console.log(formData);
    if(user?.roles == "admin_kota"){
      if(SelectedOpd?.value == (undefined || null) || SelectedOpd?.value == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
      } else {
        try{
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${API_URL}/v1/updateketeranganGap/${id}?kode_opd=${SelectedOpd?.value}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
            });
          if (response.ok) {
            AlertNotification("Berhasil", "Keterangan Berhasil Diubah", "success", 1000);
            router.push("/GapArsitektur");
            reset();
          } else {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
          }
        } catch (error) {
            AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      }
    } else {
      try{
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/v1/updateketeranganGap/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
          });
        if (response.ok) {
          AlertNotification("Berhasil", "Keterangan Berhasil Diubah", "success", 1000);
          router.push("/GapArsitektur");
          reset();
        } else {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
        }
      } catch (error) {
          AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
      }
    }
  };

  if (loading) {
    return <Loading />
  } else if(idNotFound){
    const url = "/GapArsitektur"
    return (<IdNull url={url}/>)
  } else {
    return (
      <>
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bold">Form Edit Keterangan GAP</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="keterangan_gap"
            >
              Keterangan :
            </label>
            <Controller
              name="keterangan_gap"
              control={control}
              rules={{required: "Informasi Terkait Input Harus Terisi"}}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    id="keterangan_gap"
                    type="text"
                    value={field.value || keteranganValue}
                    onChange={(text) => {
                      field.onChange(text);
                      setKeteranganValue(text.target.value);
                    }}
                  />
                </>
              )}
            />
          </div>
          <div className="flex justify-evenly">
              <ButtonSc className="w-full mx-2" typee="submit">Simpan</ButtonSc>
              <ButtonTr className="w-full mx-2" onClick={() => {router.push("/GapArsitektur")}} typee="button">Batal</ButtonTr>
          </div>
        </form>
      </div>
      </>
    );
  }
};

export default FormEditKeteranganGap;
