import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get('token');
    let isLogin = false;

    if (token) {
        try {
            isLogin = true;
        } catch (error) {
            console.error('Token verification failed:', error);
            isLogin = false;
        }
    } else {
        isLogin = false;
    }
    
    if(isLogin){
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL("/Login", req.url))
    }
};

export const config = {
    matcher: [
        "/", 
        "/User",
        "/PohonKinerja",
        "/ReferensiArsitektur",
        "/SasaranKota",
        "/BidangUrusan",

        "/ProsesBisnis",
        "/ProsesBisnis/TambahData",
        "/ProsesBisnis/EditData/:path*",
        
        "/Layanan/LayananSPBE",
        "/Layanan/LayananSPBE/TambahData",
        "/Layanan/LayananSPBE/EditData/:path*",

        "/DataInformasi",
        "/DataInformasi/TambahData",
        "/DataInformasi/EditData/:path*",

        "/Aplikasi",
        "/Aplikasi/TambahData",
        "/Aplikasi/EditData/:path*",
        
        "/KebutuhanSPBE",
        "/KebutuhanSPBE/TambahKebutuhan",
        "/KebutuhanSPBE/EditKebutuhan/:path*",
        
        "/PemenuhanKebutuhan",
        
        "/Arsitektur",
        "/GapArsitektur",
        "/SdmInfrastruktur",
        "/PetaRencana",
    ]
}