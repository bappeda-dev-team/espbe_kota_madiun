"use client"

import { getUser} from "@/app/Login/Auth/Auth";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = getUser();
        setUser(fetchUser);
      }, []);

    return(
        <>
            <h1>Selamat Datang {user?.nama}</h1>
        </>
    )
}

export default Dashboard;
