// export const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     console.log(date)
//     const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son de 0-11, así que sumamos 1
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`; // Devuelve la fecha en formato DD/MM/YYYY
// };

// export const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);

//     const day = String(date.getUTCDate()).padStart(2, '0');
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Recuerda sumar 1
//     const year = date.getUTCFullYear();

//     return `${day}/${month}/${year}`; // Devuelve la fecha en formato DD/MM/YYYY
//   };

export const formatDate = (dateString: string): string => {
    // Dividir la fecha y la hora
    if(dateString !== undefined) {
        const [datePart] = dateString.split('T'); 
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year}`;
    } else {
        return 'Fecha vacía'
    }
};