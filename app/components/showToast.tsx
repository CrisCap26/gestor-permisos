import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'info' | 'error', timeClose: number,options?: any) => {
    toast[type](message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        ...options // Permite pasar opciones adicionales
    });
};
