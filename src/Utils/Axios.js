import axios from 'axios';

const accuweather = "http://dataservice.accuweather.com/";

const Instance = axios.create({
    baseURL: accuweather,
    headers: {
      'Accept': 'application/json',
      // 'Content-type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      }
});

export default Instance;