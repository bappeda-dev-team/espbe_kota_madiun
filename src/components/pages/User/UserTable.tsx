'use client'

import { useEffect, useState } from "react";
import { getUser } from "@/app/Login/Auth/Auth";
import { getToken } from "@/app/Login/Auth/Auth";
import Loading from "@/components/global/Loading/Loading";

export const ASN = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    return (
        <>
            <h1>User : {user?.nama}</h1>
            <h1>OPD : {user?.kode_opd}</h1>
            <h1>NIP : {user?.nip}</h1>
            <h1>Role : {user?.roles}</h1>
        </>
    );
}

export const AdminOPD = () => {
    const [user, setUser] = useState<any>(null);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const token = getToken();

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    useEffect(() => {
       const API_URL = process.env.NEXT_PUBLIC_API_URL;
       const fetchUser = async () => {
        try{
            const response = await fetch(`${API_URL}/v1/User?kode_opd=${user?.kode_opd}`,{
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok){
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            if(data.data === null){
                setDataNull(true);
                setDataUser([]);
            }else{
                setDataNull(false);
                setDataUser(data.data);
            }
        } catch (error) {
            setError('Gagal mengambil data user, cek koneksi internet atau database server');
        } finally {
            setLoading(false);
        }
    };
    fetchUser();
    }, [user, token]);

    if(error){
        return <div className="text-red-500">{error}</div>
    } else if(loading){
        return <Loading />
    }

    return (
        <>
           <h1 className="uppercase font-bold mb-5">Data pohon kinerja badan perencanaan, penelitian dan pengembangan daerah</h1>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Nama</th>
                        <th className="px-6 py-3 border min-w-[200px]">NIP</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kode OPD</th>
                        <th className="px-6 py-3 border min-w-[200px]">Role</th>
                    </tr>
                </thead>
                <tbody>
                {dataNull ? (
                <tr>
                    <td className="px-6 py-3" colSpan={5}>
                        Data Kosong / Belum Ditambahkan
                    </td>
                </tr>
                ) : (
                    dataUser.map((data, index) => (
                    <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.nama}</td>
                        <td className="px-6 py-4 border">{data.nip}</td>
                        <td className="px-6 py-4 border">{data.kode_opd}</td>
                        <td className="px-6 py-4 border">{data.role}</td>
                    </tr>
                    ))
                )}
                </tbody>
                </table>
            </div>
        </>
    );
}

export const AdminKota = () => {
    const [user, setUser] = useState<any>(null);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const token = getToken();

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    useEffect(() => {
       const API_URL = process.env.NEXT_PUBLIC_API_URL;
       const fetchUser = async () => {
        try{
            const response = await fetch(`${API_URL}/v1/User`,{
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok){
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            if(data.data === null){
                setDataNull(true);
                setDataUser([]);
            }else{
                setDataNull(false);
                setDataUser(data.data);
            }
        } catch (err) {
            setError('Gagal mengambil data user, cek koneksi internet atau database server');
        } finally {
            setLoading(false);
        }
    };
    fetchUser();
    }, [user, token]);

    if(error){
        return <div className="text-red-500">{error}</div>
    } else if(loading){
        return <Loading />
    }

    return (
        <>
           <h1 className="uppercase font-bold mb-5">Data pohon kinerja badan perencanaan, penelitian dan pengembangan daerah</h1>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-white left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px]">Nama</th>
                        <th className="px-6 py-3 border min-w-[200px]">NIP</th>
                        <th className="px-6 py-3 border min-w-[200px]">Kode OPD</th>
                        <th className="px-6 py-3 border min-w-[200px]">Role</th>
                    </tr>
                </thead>
                <tbody>
                {dataNull ? (
                <tr>
                    <td className="px-6 py-3" colSpan={5}>
                        Data Kosong / Belum Ditambahkan
                    </td>
                </tr>
                ) : (
                    dataUser.map((data, index) => (
                    <tr key={data.id} className="border rounded-b-lg hover:bg-slate-50">
                        <td className="px-6 py-4 border sticky bg-white left-[-2px]">{index +1}</td>
                        <td className="px-6 py-4 border">{data.nama}</td>
                        <td className="px-6 py-4 border">{data.nip}</td>
                        <td className="px-6 py-4 border">{data.kode_opd}</td>
                        <td className="px-6 py-4 border">{data.role}</td>
                    </tr>
                    ))
                )}
                </tbody>
                </table>
            </div>
        </>
    );
}