'use client'

import { useRouter } from "next/navigation";

type button = {
    onClick? : () => void;
    children: React.ReactNode;
    typee? : 'reset' | 'submit' | 'button';
    className? : string;
    halaman_url? : string;
}

const Button: React.FC<button> = ({children, halaman_url, typee, className, onClick}) => {

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
            className={`bg-emerald-300 p-3 text-white rounded-lg hover:bg-emerald-500 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;