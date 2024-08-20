import * as jwtDecoded from "jwt-decode";
import { AlertNotification } from "@/components/common/Alert/Alert";

export const login = async (nip: string, password: string): Promise<boolean> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nip, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      try {
        const decoded = jwtDecoded.jwtDecode(token);
        // Simpan token di cookie
        document.cookie = `token=${token}; path=/;`;
        document.cookie = `user=${JSON.stringify(decoded)}; path=/;`;
        AlertNotification("Login Berhasil", "Berhasil Login" , "success", 1000)
        return true;
      } catch (decodeError) {
        AlertNotification("Login Gagal", "Gagal Login" , "error", 1000)
        console.error('Error decoding token:', decodeError);
        return false;
      }
    } else if (response.status === 401) {
        AlertNotification("Login Gagal", "Gagal Login" , "error", 1000)
      return false;
    } else {
      console.log(`Login gagal: Status ${response.status}`);
      return false;
    }
  } catch (err) {
    console.error('Login gagal:', err);
    return false;
  }
};

export const logout = () => {
  // Hapus token dari localStorage
  localStorage.removeItem('token');

  // Hapus semua cookie yang terkait
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

  // Redirect ke halaman login
  window.location.href = '/Login';
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    // Jika di server-side, kembalikan null atau nilai default lainnya
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const getUser = () => {
  const get_User = getCookie("user")
  if (get_User) {
    return JSON.parse(get_User);
  }
  return null;
}
export const getToken = () => {
  const get_Token = getCookie("token")
  if (get_Token) {
    return get_Token;
  }
  return null;
}

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('token');
};
