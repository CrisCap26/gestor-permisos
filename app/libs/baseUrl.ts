export const baseUrl = 
    process.env.NODE_ENV === 'development'
        ? "https://f50f-200-92-209-202.ngrok-free.app/"
        : "https://gestor-permisos-dxnc.vercel.app";

export const urlBot = 
    process.env.NODE_ENV === 'development'
        ? "http://bot.jrpaqueteria.mx/nodejs/apibot"
        : "http://bot.jrpaqueteria.mx/nodejs/apibot";

export const accesoValidarRH = 42;