import { ButtonPr, ButtonSc, ButtonTr } from "@/components/common/Button/Button";
import Image from "next/image";

const FormLogin = () => {
  return(
    <>
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="image" width={70} height={70} />
          <h1 className="text-2xl font-bold mt-3 mb-6 text-center">E-SPBE KOTA MADIUN</h1>
        </div>
        {/* <div> ganti dengan form */}
          <div className="mb-4">
            <label htmlFor="NIP" className="block text-sm font-medium text-gray-700 mb-1">
              NIP
            </label>
            <input
              type="text"
              id="NIP"
              name="NIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ButtonPr
            halaman_url="/"
            className="w-full py-2 px-4 rounded-md"
          >
            Login
          </ButtonPr>
        {/* </div> ganti dengan form */}
      </div>
    </div>
    </>
  )
};

export default FormLogin;