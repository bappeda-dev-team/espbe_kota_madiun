'use client'

import { useRouter } from "next/navigation";

type button = {
    onClick? : () => void;
    children: React.ReactNode;
    typee? : 'reset' | 'submit' | 'button';
    className? : string;
    halaman_url? : string;
}

export const ButtonPr: React.FC<button> = ({children, halaman_url, typee, className, onClick}) => {

    const router = useRouter()
    const pindahHalaman = () => {
        if(halaman_url){
            router.push(halaman_url)
        }
    }

    return(
        <button
            type={typee}
            onClick={onClick || pindahHalaman}
            className={`bg-gradient-to-r from-[#071952] to-[#008DDA] hover:from-[#0F4C75] hover:to-[#BBE1FA] p-3 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}
export const ButtonSc: React.FC<button> = ({children, halaman_url, typee, className, onClick}) => {

    const router = useRouter()
    const pindahHalaman = () => {
        if(halaman_url){
            router.push(halaman_url)
        }
    }

    return(
        <button
            type={typee}
            onClick={onClick || pindahHalaman}
            className={`bg-gradient-to-r from-[#007F73] to-[#40DA97] hover:from-[#4AAF9B] hover:to-[#64B07B] p-3 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}
export const ButtonTr: React.FC<button> = ({children, halaman_url, typee, className, onClick}) => {

    const router = useRouter()
    const pindahHalaman = () => {
        if(halaman_url){
            router.push(halaman_url)
        }
    }

    return(
        <button
            type={typee}
            onClick={onClick || pindahHalaman}
            className={`bg-gradient-to-r from-[#BE1010] to-[#EA5353] hover:from-[#670505] hover:to-[#FF0000] p-3 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}

export const Button: React.FC<button> = ({children, halaman_url, typee, className, onClick}) => {
    const router = useRouter()
    const pindahHalaman = () => {
        if(halaman_url){
            router.push(halaman_url)
        }
    }

    return(
        <button
            type={typee}
            onClick={onClick || pindahHalaman}
            className={`bg-emerald-300 hover:bg-emerald-500 p-3 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}



//warna default lama
//bg-emerald-300 hover:bg-emerald-500
//bg-red-500 hover:bg-red-700
//bg-blue-500 hover:bg-blue-700