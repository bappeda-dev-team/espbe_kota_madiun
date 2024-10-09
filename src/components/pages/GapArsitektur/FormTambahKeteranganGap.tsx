"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getUser, getToken, getOpdTahun } from "@/app/Login/Auth/Auth";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import IdNull from "@/components/common/Alert/IdNull";

interface KeteranganForm {
  keterangan: string;
}

const FormTambahKeteranganGap = () => {
  const { id } = useParams();
  const token = getToken();
  const router =  useRouter();
  const { control, handleSubmit, reset} = useForm<KeteranganForm>();
  const [user, setUser] = useState<any>(null);
  const [SelectedOpd, setSelectedOpd] = useState<any>(null);
  const [idKosong, setIdKosong] = useState<boolean | null>(null);

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
    const fetchId = async() => {
      try{
        const response = await fetch(`${API_URL}/v1/prosesbisnisbyid/${id}`, {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        if(data.code == 500){
          setIdKosong(true);
        } else if(data.data.id == id){
          setIdKosong(false);
        }
      } catch(err){
        console.log("cek koneksi internet atau database server");
      }
    }
    fetchId();
  },[id, token])

  const onSubmit: SubmitHandler<KeteranganForm> = async(data) =>  {
    const formData ={
        keterangan_gap : data.keterangan
    }
    // console.log(formData);
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd?.value == (undefined || null) || SelectedOpd?.value == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
      } else {
        try{
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${API_URL}/v1/createketeranganGap?kode_opd=${SelectedOpd?.value}&prosesbisnis=${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
            });
          if (response.ok) {
            AlertNotification("Berhasil", "Keterangan GAP Berhasil Ditambah", "success", 1000);
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
        const response = await fetch(`${API_URL}/v1/createketeranganGap?prosesbisnis=${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
          });
        if (response.ok) {
          AlertNotification("Berhasil", "Keterangan Berhasil Ditambah", "success", 1000);
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

  if(idKosong){
    const url = "/GapArsitektur"
    return <IdNull url={url}/>
  } else {
    return (
      <>
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bod">Form Tambah Keterangan GAP</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="keterangan"
            >
              Keterangan :
            </label>
            <Controller
              name="keterangan"
              control={control}
              rules={{required: "Informasi Terkait Input Harus Terisi"}}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    id="keterangan"
                    type="text"
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

export default FormTambahKeteranganGap;
