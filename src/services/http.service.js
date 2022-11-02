import axios from 'axios';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

export const httpService = {
  get: axios.get,
  post: axios.post
}