export function formattedDate(date) {
    const options = { year: '2-digit', month: '2-digit', day: 'numeric'}
    return new Date(date).toLocaleDateString('es-AR', options)
}