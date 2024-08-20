"use client"

import { AdminKota, AdminOPD, ASN } from "@/components/pages/User/UserTable";
import { getUser } from "../Login/Auth/Auth";
import { useEffect, useState } from "react";

const User = () => {
    // const [user, setUser] = useState<any>(null);
    
    // useEffect(() => {
    //     const user = getUser();
    //     setUser(user);
    // }, []);
    
    return(
        <>
            <ASN />
            {/* {user?.roles === "asn" && <ASN />}
            {user?.roles === "admin_opd" && <AdminOPD />}
            {user?.roles === "admin_kota" && <AdminKota />} */}
        </>
    )
}

export default User