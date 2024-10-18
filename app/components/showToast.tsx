import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'info' | 'error', timeClose: number) => {
    toast[type](message, {
        position: "top-center",
        autoClose: timeClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};
