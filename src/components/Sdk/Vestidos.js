import axios from 'axios'
// import vestid from '../../../public/assets/json/apis.json'
// import vestid from '../../../public/assets/json/apis.json'

export const ListVestidos = () => {
   return axios.get('../assets/json/apis.json')
   .catch((error) => {
      throw new Error('Error al obtener la data: ' + error.message)
   })

   // return fetch(`../assets/json/apis.json`)
}


// export const ListVestidos = (search) => {
//    return axios.get('../assets/json/apis.json')
//      .then((response) => {
//        const data = response.data;
//        if (search) {
//          // Realizar la búsqueda en los datos según el valor de search
//          const filteredData = data.filter(item => item.title.toUpperCase().includes(search.toUpperCase()));
//          return filteredData;
//        } else {
//          return data;
//        }
//      })
//      .catch((error) => {
//        throw new Error('Error al obtener la data: ' + error.message);
//      });
//  }