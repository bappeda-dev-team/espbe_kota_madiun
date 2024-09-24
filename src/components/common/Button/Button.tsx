'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/Login/Auth/Auth";

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
            className={`bg-gradient-to-r from-[#0F4C75] to-[#64B9F1] hover:from-[#071952] hover:to-[#008DDA] px-3 py-2 text-white rounded-lg ${className}`}
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
            className={`bg-gradient-to-r from-[#007F73] to-[#40DA97] hover:from-[#014741] hover:to-[#35B47D] px-3 py-2 text-white rounded-lg ${className}`}
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
            className={`bg-gradient-to-r from-[#BE1010] to-[#EA5353] hover:from-[#670505] hover:to-[#FF0000] px-3 py-2 text-white rounded-lg ${className}`}
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
            className={`bg-emerald-300 hover:bg-emerald-500 px-3 py-2 text-white rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}

export const ButtonHeader: React.FC<button> = ({children, halaman_url, typee, className, }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Untuk merujuk elemen menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return(
        <div className="relative inline-block" ref={menuRef}>
            <button
                type={typee}
                onClick={toggleMenu}
                className={`rounded-lg px-3 py-2 border ml-1 border-emerald-500 text-emerald-500 font-bold text-sm hover:bg-emerald-500 hover:text-white ${className}`}
            >
                {children}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                    <ul>
                    <li>
                        <button onClick={() => router.push("/User")} className="block w-full text-left px-4 py-2 hover:bg-emerald-100">
                            Profil User
                        </button>
                    </li>
                    <li>
                        <button onClick={() => logout()} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white">
                            Logout
                        </button>
                    </li>
                    </ul>
                </div>
            )}
        </div>
    );
}


//warna default lama
//bg-emerald-300 hover:bg-emerald-500
//bg-red-500 hover:bg-red-700
//bg-blue-500 hover:bg-blue-700