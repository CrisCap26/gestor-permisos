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