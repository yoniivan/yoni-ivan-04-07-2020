import * as actionTypes from './Actions';

const initialState = {
    
    cityCode: 215854,
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
    
    favoritesList: [],
    searchList: [],
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
            console.log(action.fav)
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