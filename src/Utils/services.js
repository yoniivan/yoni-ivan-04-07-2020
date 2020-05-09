import axios from './Axios';

const API_KEY = "?apikey=DvHOnCEuTEC9bTbQYY0ekGPllp93RkYO";
const API_URL_AUTO = "/locations/v1/cities/autocomplete";
const API_URL_WEATHER = "/currentconditions/v1/";
const API_URL_FORCAST = "/forecasts/v1/daily/5day/";
const API_URL_GEOLOCATION = "/locations/v1/cities/geoposition/search";

const getPosition = () => {
    return new Promise((res, rej) => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(res, rej);
            
        }else{
            // TODO
        }
    });
}

export const GET_COUNTRIES = async(param) => {
    return await axios.get(API_URL_AUTO + API_KEY + param);
}

export const GET_LAT_LONG = async() => {
    const position = await getPosition();
    return await axios.get(API_URL_GEOLOCATION + API_KEY + "&q=" + position.coords.latitude + "%2C%20" + position.coords.longitude);
}

export const GET_FORCAST = async(param) => {
    return await axios.get(API_URL_FORCAST + param + API_KEY);
}

export const GET_WEATHER = async(key) => {
    return await axios.get(API_URL_WEATHER + key + API_KEY);
}