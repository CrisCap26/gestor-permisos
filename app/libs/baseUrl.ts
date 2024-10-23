export const baseUrl = 
    process.env.NODE_ENV === 'development'
        ? "https://nominally-thankful-narwhal.ngrok-free.app"
        : "https://gestor-permisos-dxnc.vercel.app";

export const urlBot = 
    process.env.NODE_ENV === 'development'
        ? "http://bot.jrpaqueteria.mx/nodejs/apibot"
        : "http://bot.jrpaqueteria.mx/nodejs/apibot";

export const accesoValidarRH = 42;