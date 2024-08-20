"use client"

import { ButtonPr, ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "@/app/Login/Auth/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface FormValues {
  nip: string;
  password: string;
}

const FormLogin = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const isLoggedIn = await login(data.nip, data.password);

    if (isLoggedIn) {
      router.push('/'); // Redirect ke halaman dashboard jika login berhasil
    } else {
      console.log('Login gagal');
      // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna jika diperlukan
    }
  };

  return(
    <>
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="image" width={70} height={70} />
          <h1 className="text-2xl font-bold mt-3 mb-6 text-center">E-SPBE KOTA MADIUN</h1>
        </div>
          <div className="mb-4">
            <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
              NIP
            </label>
            <input
              type="nip"
              id="nip"
              {...register('nip', { required: 'nip is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.nip && <span className="text-red-500 text-sm">{errors.nip.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center justify-end">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'password is required' })}
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute pr-3 pt-1"
              >
                {showPassword ? 
                <Image
                  src="/iconDark/eye-slash.svg"
                  alt="eye-slash"
                  width={20}
                  height={20}
                />
                :
                <Image
                  src="/iconDark/eye.svg"
                  alt="eye"
                  width={20}
                  height={20}
                /> }
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <ButtonPr
            typee="submit"
            className="w-full py-2 px-4 rounded-md"
          >
            Login
          </ButtonPr>
      </form>
    </div>
    </>
  )
};

export default FormLogin;