'use client'

import { useEffect, useState } from "react";
import { getUser } from "@/app/Login/Auth/Auth";
import { getToken } from "@/app/Login/Auth/Auth";
import Loading from "@/components/global/Loading/Loading";
import { ButtonPr, ButtonSc } from "@/components/common/Button/Button";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { AlertNotification } from "@/components/common/Alert/Alert";
import {useRouter} from "next/navigation";
import OpdNull from "@/components/common/Alert/OpdNull";

export const ASN = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    return (
        <>
        <div className="overflow-auto w-full rounded-xl text-center py-5 mb-5 px-2 bg-white shadow-lg border">
            <h1 className="font-bold uppercase mb-5">Profil User</h1>
            <div className="flex justify-between mb-5">
                <div className="overflow-auto w-full rounded-xl text-center py-5 mx-3 px-2 bg-white border hover:bg-gray-100">
                    <h1>User : {user?.nama}</h1>
                </div>
                <div className="overflow-auto w-full rounded-xl text-center py-5 mx-3 px-2 bg-white border hover:bg-gray-100">
                    <h1>OPD Profil : {user?.kode_opd}</h1>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="overflow-auto w-full rounded-xl text-center py-5 mx-3 px-2 bg-white border hover:bg-gray-100">
                    <h1>NIP : {user?.nip}</h1>
                </div>
                <div className="overflow-auto w-full rounded-xl text-center py-5 mx-3 px-2 bg-white border hover:bg-gray-100">
                    <h1>Role : {user?.roles}</h1>
                </div>
            </div>
            <ButtonSc halaman_url="/User/EditPassword" className="mt-5 px-5">Ubah Password</ButtonSc>
        </div>
        </>
    );
}

export const AdminOPD = () => {
    const SelectedOpd = useSelector((state: RootState) => state.Opd.value);
    const [user, setUser] = useState<any>(null);
    const [dataNull, setDataNull] = useState<boolean>(false);
    const [dataUser, setDataUser] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean | null>(null);
    const [opdKosong, setOpdKosong] = useState<boolean | null>(null);
    const token = getToken();
    const router = useRouter();

    const [roles, setRoles] = useState<number>(0);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    useEffect(() => {
       const API_URL = process.env.NEXT_PUBLIC_API_URL;
       const fetchUser = async () => {
        if(SelectedOpd == ""){
            setOpdKosong(true);
            setLoading(false);
        } else if(SelectedOpd == "all_opd"){
            try{
                setLoading(true);
                const response = await fetch(`${API_URL}/v1/user?roles_id=${roles}`,{
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
                setOpdKosong(false);
            }
        } else {
            try{
                setLoading(true);
                const response = await fetch(`${API_URL}/v1/user?roles_id=${roles}&kode_opd=${SelectedOpd}`,{
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
                setOpdKosong(false);
            }
        }
    };
    fetchUser();
    }, [SelectedOpd, roles, token]);

    const sinkronUser = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if(SelectedOpd !== 'all_opd' && SelectedOpd !== ''){
            try {
              const response = await fetch(`${API_URL}/userapifetch?kode_opd=${SelectedOpd}`, {
                method: "GET",
                headers: {
                  'Authorization': `${token}`,
                },
              });
              if (!response.ok) {
                throw new Error("cant fetch data");
              }
              AlertNotification("Berhasil", "Berhasil Sinkron data user", "success", 1000);
              setTimeout(() => {
                window.location.reload(); // Refresh halaman
              }, 1000);
            } catch (err) {
              AlertNotification("Gagal", "cek koneksi internet atau database server", "error", 2000);
            }
          } else {
            AlertNotification("Pilih OPD", "pilih opd terlebih dahulu", "warning", 3000);
          }
      };

    if(error){
        return <div className="text-red-500">{error}</div>
    } else if(loading){
        return <Loading />
    } else if(opdKosong){
        return <OpdNull />
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="uppercase font-bold my-5">Table Data User</h1>
                <ButtonSc 
                    onClick={() => sinkronUser()}
                >
                <div className="flex">
                    <Image 
                        className="mr-1"
                        src="/iconLight/refresh-2.svg" 
                        alt="refresh-2" 
                        width={15} 
                        height={15} 
                        />
                    Sinkron
                </div>
                </ButtonSc>
            </div>
            <div className="flex flex-wrap justify-between mb-3">
                <div className="flex">
                    {roles == 0 ?
                    <button className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg">Semua</button>
                    :
                    <button className="mx-1 py-1 min-w-[100px] border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg text-emerald-500" 
                        onClick={() => {
                        setRoles(0);
                        }}
                    >
                        Semua
                    </button>
                    }
                    {roles == 1 ? 
                    <button className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg">Admin Kota</button>
                    :
                    <button className="mx-1 py-1 min-w-[100px] border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg text-emerald-500" 
                        onClick={() => {
                        setRoles(1);
                        }}
                    >
                        Admin Kota
                    </button>
                    }
                    {roles == 2 ?
                    <button className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg">Admin OPD</button>
                    :
                    <button className="mx-1 py-1 min-w-[100px] border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg text-emerald-500" 
                        onClick={() => {
                        setRoles(2);
                        }}
                    >
                        Admin OPD
                    </button>
                    }
                    {roles == 3 ? 
                    <button className="mx-1 py-1 min-w-[100px] border bg-emerald-500 text-white rounded-lg">ASN</button>
                    :
                    <button className="mx-1 py-1 min-w-[100px] border border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg text-emerald-500" 
                        onClick={() => {
                        setRoles(3);
                        }}
                    >
                        ASN
                    </button>
                    }
                </div>
                {roles == 2 && 
                    <ButtonPr>Tambah Admin</ButtonPr>
                }
            </div>
            <div className="overflow-auto rounded-t-xl bg-white shadow-lg border">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-white bg-emerald-500 uppercase border">
                    <tr>
                        <th className="px-6 py-3 border max-w-[20px] sticky bg-emerald-500 left-[-2px]">No.</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">Nama</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">NIP</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">Kode OPD</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">Jabatan</th>
                        <th className="px-6 py-3 border min-w-[200px] text-center">Roles</th>
                        <th className="px-6 py-3 border min-w-[100px] text-center">Aksi</th>
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
                        <td className="px-6 py-4 border">{data.jabatan}</td>
                        {data.roles.map((item: any) => (
                            <td className="px-6 py-4 border" key={item.id}>{item.nama}</td>
                        ))}
                        <td className="px-6 py-4 border">
                            <ButtonSc>
                                Reset Password
                            </ButtonSc>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
                </table>
            </div>
        </>
    );
}