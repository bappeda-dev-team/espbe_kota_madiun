"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getUser, getToken } from "@/app/Login/Auth/Auth";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import IdNull from "@/components/common/Alert/IdNull";

interface KeteranganForm {
  keterangan: string;
}

const FormTambahKeterangan = () => {
  const { id } = useParams();
  const token = getToken();
  const router =  useRouter();
  const { control, handleSubmit, reset} = useForm<KeteranganForm>();
  const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
  const [idKosong, setIdKosong] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = getUser();
    setUser(fetchUser);
  },[])

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchid = async() => {
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
      } catch(err) {
       console.log("periksa koneksi internet atau database server"); 
      }
    }
    fetchid();
  },[id, token])

  const onSubmit: SubmitHandler<KeteranganForm> = async(data) =>  {
    const formData ={
        keterangan_kebutuhan : data.keterangan
    }
    // console.log(formData);
    if(user?.roles == 'admin_kota'){
      if(SelectedOpd == "" || SelectedOpd == "all_opd"){
        AlertNotification("Pilih OPD", "OPD harus dipilih di header", "warning", 2000);
      } else {
        try{
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${API_URL}/v1/createkebutuhanspbe?kode_opd=${SelectedOpd}&id_prosesbisnis=${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
            body: JSON.stringify(formData),
            });
          if (response.ok) {
            AlertNotification("Berhasil", "Keterangan Berhasil Ditambah", "success", 1000);
            router.push("/KebutuhanSPBE");
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
        const response = await fetch(`${API_URL}/v1/createkebutuhanspbe?id_prosesbisnis=${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify(formData),
          });
        if (response.ok) {
          AlertNotification("Berhasil", "Keterangan Berhasil Ditambah", "success", 1000);
          router.push("/KebutuhanSPBE");
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
    const url = "/GapArsitektur";
    return <IdNull url={url}/>
  } else {
    return (
      <>
      <div className="border p-5 rounded-xl shadow-xl">
        <h1 className="uppercase font-bod">Form Tambah Keterangan Kebutuhan</h1>
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

export default FormTambahKeterangan;
