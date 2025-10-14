import axios from 'axios'

export const fetchProducts = () => {

    const data = axios.get('https://dummyjson.com/products')
    return data
}