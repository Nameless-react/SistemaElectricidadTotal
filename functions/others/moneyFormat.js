export function formatNumberToColones(number) {
    if (isNaN(number)) {
        throw new Error('El valor proporcionado no es un número válido.');
    }


    const formatter = new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2  
    });

    return formatter.format(number);
}
