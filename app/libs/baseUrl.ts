export const baseUrl = 
    process.env.NODE_ENV === 'development'
        ? "http://localhost:3000"
        : process.env.VERCEL_URL;

export const urlBot = 
    process.env.NODE_ENV === 'development'
        ? "http://localhost:3002/nodejs/apibot/multiSendMsg"
        : "http://bot.jrpaqueteria.mx/nodejs/apibot/multiSendMsg";

export const accesoValidarRH = 42;