import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://db-group5-452710.wl.r.appspot.com', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;