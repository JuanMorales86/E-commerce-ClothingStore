import axios from 'axios'
// import vestid from '../../../public/assets/json/apis.json'
// import vestid from '../../../public/assets/json/apis.json'

export const ListVestidos = () => {
   return axios.get('../assets/json/apis.json')
   .catch((error) => {
      throw new Error('Error al obtener la data: ' + error.message)
   })
}
