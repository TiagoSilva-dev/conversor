import axios from 'axios';

const apiconversor = axios.create({
  baseURL: 'https://api-conversor.herokuapp.com'
})

export default apiconversor;