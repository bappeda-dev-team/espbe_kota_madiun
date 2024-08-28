"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getToken } from "@/app/Login/Auth/Auth";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { useRouter } from "next/navigation";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";

interface KeteranganForm {
  keterangan: string;
}

const FormEditKeterangan = () => {
  const { id } = useParams();
  const token = getToken();
  const router =  useRouter();
  const { control, handleSubmit, reset} = useForm<KeteranganForm>();
  const [loading, setLoading] = useState<boolean>(true);
  const [keteranganValue, setKeteranganValue] = useState<string>("")

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchingData = async () => {
        try {
            const response = await fetch(`${API_URL}/v1/kebutuhanspbebyid/${id}`, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.data.keterangan) {
            setKeteranganValue( data.data.keterangan);
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
        keterangan_gap : data.keterangan
    }
    // console.log(formData);
    try{
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/v1/updateketeranganGapKebutuhan/${id}`, {
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
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className="border p-5 rounded-xl shadow-xl">
      <h1 className="uppercase font-bold">Form Edit Keterangan</h1>
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
                  value={field.value || keteranganValue}
                  onChange={(e) => {
                    field.onChange(e);
                    setKeteranganValue(e.target.value);
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
};

export default FormEditKeterangan;
