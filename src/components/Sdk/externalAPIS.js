import axios from "axios";


export const ListApiFaked = () => {
    return axios.get('https://fakestoreapi.com/products?limit=15&sort=desc')
    .catch((error) => {
        throw new Error('Error al obtener la base de datos apifake: ' + error.message)
    })
} 