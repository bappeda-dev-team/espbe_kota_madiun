"use client"

import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { getToken, getUser, logout } from "@/app/Login/Auth/Auth";
import { useEffect, useState } from "react";
import { AlertNotification } from "@/components/common/Alert/Alert";
import { ButtonSc, ButtonTr } from "@/components/common/Button/Button";

interface formValue {
    old_password: string;
    new_password : string;
}

const FormEditPassword = () => {

    const token = getToken();
    const [user, setUser] = useState<any>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
      } = useForm<formValue>();

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
    },[])

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
      };

    const onSubmit: SubmitHandler<formValue> = async (data) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const formData = {
        old_password: data.old_password,
        new_password: data.new_password,
      };
        console.log(formData);
        try {
            const response = await fetch(`${API_URL}/v1/changepassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.code === 200) {
                AlertNotification("Berhasil", "Password Berhasil Dibuah", "success", 2000);
                logout()
            } else if(data.code === 400) {
                AlertNotification("Gagal", "Password Lama terdapat kesalahan / tidak terdaftar", "error", 2000);
            } else {
                AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
            }
        } catch (error) {
            AlertNotification("Gagal", "Cek koneksi internet atau database server", "error", 2000);
        }
    }
    
    return(
        <>
            <div className="border p-5 rounded-xl shadow-xl">
                <h1 className="uppercase font-bold">Form Edit Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="old_password"
                        >
                            Password Lama :
                        </label>
                        <Controller
                            name="old_password"
                            control={control}
                            rules={{ required : "Password Lama Harus Terisi"}}
                            render={({ field }) => (
                                <>
                                    <input
                                        className="border px-4 py-2 rounded-lg"
                                        {...field}
                                        type="text"
                                        id="fungsi_layanan"
                                        placeholder="masukkan Password Lama"
                                        minLength={8}
                                    />
                                    {errors.old_password? 
                                        <h1 className="text-red-500">
                                            {errors.old_password.message}
                                        </h1>
                                    :
                                        <h1 className="text-slate-300 text-xs">*Password Lama Harus Terisi</h1>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <label
                            className="uppercase text-xs font-bold text-gray-700 my-2"
                            htmlFor="new_password"
                        >
                            Password Baru :
                        </label>
                        <Controller
                            name="new_password"
                            control={control}
                            rules={{ required : "Password Baru Harus Terisi"}}
                            render={({ field }) => (
                                <>
                                    <input
                                        className="border px-4 py-2 rounded-lg"
                                        {...field}
                                        type="text"
                                        id="fungsi_layanan"
                                        placeholder="masukkan password baru"
                                        minLength={8}
                                    />
                                    {errors.new_password? 
                                        <h1 className="text-red-500">
                                            {errors.new_password.message}
                                        </h1>
                                    :
                                        <h1 className="text-slate-300 text-xs">*Password Baru Harus Terisi</h1>
                                    }
                                </>
                            )}
                        />
                    </div>
                    <ButtonSc className="w-full my-3" typee="submit">Simpan Password</ButtonSc>
                    <ButtonTr className="w-full" typee="button" halaman_url="/User">Kembali</ButtonTr>
                </form>
            </div>
        </>
    )
}

export default FormEditPassword;