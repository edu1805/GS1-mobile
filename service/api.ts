import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP:PORTA/api', // exemplo: http://192.168.0.10:5000/api
});

export default api;