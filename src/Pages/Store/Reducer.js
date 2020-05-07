import * as actionTypes from './Actions';

const initialState = {
    
    cityCode: 215854,
    //cityCode: "",
    cityName: "",
    iconNumber: 1,
    temp: "38",
    Unit: "c",
    WeatherText: "Scattered clouds",

    style: {
        right: "#525252",
        left: "#7a7a7a",
        boxes: "#525252",
        color: "#ffffff",
        nav: "dark",
    },
    
    favoritesList: [
        // {
        //     id: 234566,
        //     cityName: "Tel Aviv",
        //     temp: 38,
        //     unit: "c",
        //     text: "Sunny",
        //     icon: 23,
        // },
        // {
        //     id: 234566,
        //     cityName: "Toronto",
        //     temp: 26,
        //     unit: "c",
        //     text: "Sunny",
        //     icon: 42,
        // },
    ],
    forcastList: [
        // {
        //     date: "2020-05-08T07:00:00+04:30",
        //     iconDay: 18,
        //     iconNight: 12,
        //     iconPhraseDay: 12,
        //     iconPhraseNight: 12,
        //     temperatureMin: Number((78 -32) * 5/9).toFixed(1),
        //     temperatureMinUnit: 78,
        //     temperatureMinUnitType: 78,
        //     temperatureMax: 78,
        //     temperatureMaxUnit: 78,
        //     temperatureMaxUnitType: 78,
        //     unit: "c",
        // },
        // {
        //     date: "2020-05-08T07:00:00+04:30",
        //     iconDay: 18,
        //     iconNight: 12,
        //     iconPhraseDay: 12,
        //     iconPhraseNight: 12,
        //     temperatureMin: Number((78 -32) * 5/9).toFixed(1),
        //     temperatureMinUnit: 78,
        //     temperatureMinUnitType: 78,
        //     temperatureMax: 78,
        //     temperatureMaxUnit: 78,
        //     temperatureMaxUnitType: 78,
        //     unit: "c",
        // },
        // {
        //     date: "2020-05-08T07:00:00+04:30",
        //     iconDay: 18,
        //     iconNight: 12,
        //     iconPhraseDay: 12,
        //     iconPhraseNight: 12,
        //     temperatureMin: Number((78 -32) * 5/9).toFixed(1),
        //     temperatureMinUnit: 78,
        //     temperatureMinUnitType: 78,
        //     temperatureMax: 78,
        //     temperatureMaxUnit: 78,
        //     temperatureMaxUnitType: 78,
        //     unit: "c",
        // },
        // {
        //     date: "2020-05-08T07:00:00+04:30",
        //     iconDay: 18,
        //     iconNight: 12,
        //     iconPhraseDay: 12,
        //     iconPhraseNight: 12,
        //     temperatureMin: Number((78 -32) * 5/9).toFixed(1),
        //     temperatureMinUnit: 78,
        //     temperatureMinUnitType: 78,
        //     temperatureMax: 78,
        //     temperatureMaxUnit: 78,
        //     temperatureMaxUnitType: 78,
        //     unit: "c",
        // },
        // {
        //     date: "2020-05-08T07:00:00+04:30",
        //     iconDay: 18,
        //     iconNight: 12,
        //     iconPhraseDay: 12,
        //     iconPhraseNight: 12,
        //     temperatureMin: Number((78 -32) * 5/9).toFixed(1),
        //     temperatureMinUnit: 78,
        //     temperatureMinUnitType: 78,
        //     temperatureMax: 78,
        //     temperatureMaxUnit: 78,
        //     temperatureMaxUnitType: 78,
        //     unit: "c",
        // }
    ],
    searchList: [
        // {cityCode:'299429',text:'Jeddah'},
        // {cityCode:'213225',text:'Jerusalem'},
        // {cityCode:'223078',text:'Jeonju'},
        // {cityCode:'224209',text:'Jeju'},
        // {cityCode:'203179',text:'Jember'},
        // {cityCode:'306735',text:'Jerez de la Frontera'},
        // {cityCode:'223116',text:'Jecheon'},
        // {cityCode:'223080',text:'Jeongeup'},
        // {cityCode:'171709',text:'Jena'},
        // {cityCode:'3431691',text:'Jebres'},
    ],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.SEARCH_LIST_ADD:
            return {
                ...state,
                searchList: [...state.searchList, action.search],
            };

        case actionTypes.FORCAST_LIST:
            return {
                ...state,
                forcastList: action.params,
            };

        case actionTypes.SEARCH_LIST_EMPTY:
            return {
                ...state,
                searchList: [],
            };

        case actionTypes.SEARCH_LIST_SAVE_PARAMS:
            return {
                ...state,
                temp: action.params.temp,
                Unit: action.params.Unit,
                WeatherText: action.params.WeatherText,
                iconNumber: action.params.iconNumber,
            };

        case actionTypes.SEARCH_LIST_SAVE_CITY:
            return {
                ...state,
                cityName: action.params.cityName,
                cityCode: action.params.cityCode,
            };
        
        case actionTypes.FAVORITES_SAVE:
            return {
                ...state,
                favoritesList: [...state.favoritesList, action.fav],
            };
        
        case actionTypes.FAVORITES_DELETE_ITEM:
            const favRemoved = state.favoritesList.filter((_, i) => i !== action.fav);
            return {
                ...state,
                favoritesList: favRemoved,
            };

        case actionTypes.FAVORITES_LOAD:
            return {
                ...state,
                cityCode: action.params.cityCode,
                cityName: action.params.cityName,
            };

        case actionTypes.CHANGE_TEMP_UNIT:
            return {
                ...state,
                temp: action.params.temp,
                Unit: action.params.Unit,
            };
        
        case actionTypes.FORCAST_FC_UPDATE:
            return {
                ...state,
                forcastList: action.params
            };
        
        case actionTypes.FAVORITES_FC_UPDATE:
            return {
                ...state,
                favoritesList: action.params,
            };
        
        case actionTypes.STYLE:
            return {
                ...state,
                style: action.params,
            };
        
        case actionTypes.SAVE_INIT_CITY_NAME:
            return {
                ...state,
                cityName: action.params.cityName,
            };

        case actionTypes.CHANGE_ICON:
            return {
                ...state,
                iconNumber: action.params.iconNumber,
            };

            default:
                return state;  
        }  
    };
    export default reducer;