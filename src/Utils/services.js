import axios from './Axios';

let API_KEY = "?apikey=DvHOnCEuTEC9bTbQYY0ekGPllp93RkYO";
const API_URL_AUTO = "/locations/v1/cities/autocomplete";
const API_URL_WEATHER = "/currentconditions/v1/";
const API_URL_FORCAST = "/forecasts/v1/daily/5day/";
const API_URL_GEOLOCATION = "/locations/v1/cities/geoposition/search"


export const GET_API_WEATHER = async(key) => {
    const api = await axios.get(API_URL_WEATHER + key + API_KEY);
    return api;
}

export const GET_API_LAT_LONG = async() => {
    const position = await this.getPosition();
    const api = await axios.get(API_URL_GEOLOCATION + API_KEY + "&q=" + position.coords.latitude + "%2C%20" + position.coords.longitude)
    return api;
}

export const GET_API_FORCAST = async(param) => {
    const api = await axios.get(API_URL_FORCAST + param + API_KEY);
    return api;
}

export const GET_API_COUNTRIES = async(param) => {
    const api = await axios.get(API_URL_AUTO + API_KEY + param);
    return api;
}

// GET_API_COUNTRIES = (param) => {
//     this.props.searchListEmpty();
//     axios.get(this.API_URL_AUTO + this.API_KEY + param).then(res => {
//         res.data.map(param => {
//             const listParams = {
//                 cityCode: param.Key,
//                 text: param.LocalizedName, 
//             }
//             this.props.searchListAdd(listParams);
//             return null;
//         });
//     }).catch(err => {
//         this.errorHandle(err.message, false);
//     });
// }


// GET_API_FORCAST = (param) => {
//     const forcastArr = [];
//     axios.get(this.API_URL_FORCAST + param + this.API_KEY).then(res => {
//         res.data.DailyForecasts.map(arr => {
//             const params = {
//                 date: arr.Date,
//                 iconDay: arr.Day.Icon,
//                 iconNight: res.data.DailyForecasts[0].Night.Icon,
//                 iconPhraseDay: arr.Day.IconPhrase,
//                 iconPhraseNight: arr.Night.IconPhrase,
//                 temperatureMin: Number((arr.Temperature.Maximum.Value -32) * 5/9).toFixed(1),
//                 temperatureMinUnit: arr.Temperature.Maximum.Unit,
//                 temperatureMinUnitType: arr.Temperature.Maximum.UnitType,
//                 temperatureMax: arr.Temperature.Minimum.Value,
//                 temperatureMaxUnit: arr.Temperature.Minimum.Unit,
//                 temperatureMaxUnitType: arr.Temperature.Minimum.UnitType,
//                 unit: this.props.unit,
//             }

//             forcastArr.push(params);
//             return null;
//         });
//         this.props.forcastListAdd(forcastArr);
//     }).catch(err => {
//         this.errorHandle(err.message, false);
//     })
// }

// GET_API_LAT_LONG = async() => {
//     const position = await this.getPosition();
//     axios.get(this.API_URL_GEOLOCATION + this.API_KEY + "&q=" + position.coords.latitude + "%2C%20" + position.coords.longitude).then(res => {
//         const params = {
//             cityName: res.data.LocalizedName,
//         }
//         this.props.cityNameInit(params)
//         console.log(params);
//     }).catch(err => {
//         console.log(err);
//     });
// }



    // GET_API_WEATHER = (key) => {
    //     axios.get(this.API_URL_WEATHER + key + this.API_KEY).then(res => {
    //         const params = {
    //             temp: res.data[0].Temperature.Metric.Value,
    //             Unit: res.data[0].Temperature.Metric.Unit,
    //             WeatherText: res.data[0].WeatherText,
    //         }
    //         this.props.searchListEmpty();
    //         this.props.searchSaveParams(params);

    //     }).catch(err => {
    //         this.errorHandle(err.message, false);
    //     });
    // }


    // GET_API_COUNTRIES = (param) => {
    //     this.props.searchListEmpty();
    //     axios.get(this.API_URL_AUTO + this.API_KEY + param).then(res => {
    //         res.data.map(param => {
    //             const listParams = {
    //                 cityCode: param.Key,
    //                 text: param.LocalizedName, 
    //             }
    //             this.props.searchListAdd(listParams);
    //             return null;
    //         });
    //     }).catch(err => {
    //         this.errorHandle(err.message, false);
    //     });
    // }