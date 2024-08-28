import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Gantilah dengan kunci rahasia yang kuat

// Fungsi untuk mengenkripsi
export function encryptText(text: string): string {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Fungsi untuk mendekripsi
export function decryptText(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
