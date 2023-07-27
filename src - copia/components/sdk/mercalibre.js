import axios from "axios"
export  const getProducts = (search) => {
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`)
}

export const getProductsDetail = (selectedProductId) => {
    return axios.get(`https://api.mercadolibre.com/items/${selectedProductId}`)
}