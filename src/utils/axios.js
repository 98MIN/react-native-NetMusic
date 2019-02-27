import axios from 'axios'

const baseUrl = 'http://118.24.90.238:3000/'

function setAxios(url){
  return new Promise((resolve, reject) => {
    axios.post(baseUrl+url).then(v=>{
      resolve(v.data)
    })
  })
}

export default setAxios
