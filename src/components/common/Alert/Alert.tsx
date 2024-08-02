import Swal, { SweetAlertResult } from "sweetalert2";

export const AlertNotification = (
    title: string, 
    text: string,icon: "success" | "error" | "warning" | "info" | "question", 
    timer?: number
) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: true,
      timer: timer,
      customClass: {
        confirmButton: "bg-emerald-300 hover:bg-emerald-500 text-white font-bold"
      }
    });
}

export const AlertQuestion = (
    title: string, 
    text: string, 
    icon: "success" | "error" | "warning" | "info" | "question",
    confirmButtonText: string,
    cancelButtonText: string,
): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      buttonsStyling: true,
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-700 text-white font-bold",
        cancelButton: "bg-emerald-300 hover:bg-emerald-500 text-white font-bold",
      }
    });
}
