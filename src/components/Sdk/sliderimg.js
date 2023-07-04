import axios from "axios"



export const getSliderApi = () => {
    return axios.get('../assets/images/slides.json')
}