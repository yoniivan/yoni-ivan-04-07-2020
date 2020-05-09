import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../Store/Actions';
import './home.css'
import SearchCity from './SearchCity';
import CountriesList from './CountryList';
import AlertPopUP from '../Error/errorPopUp';
import ForcastBox from './forcastBox';
import LeftRightDivs from './leftRightDivs';
import ToastMsg from '../../Utils/Toast';
import { Spinner } from 'react-bootstrap';
import * as API from '../../Utils/services'; 

class HomePage extends Component{

    componentDidMount(){
        if(this.props.cityName === ""){
            this.get_lat_long();
        }
        this.iconWeatherCondition()
        this.get_weather(this.props.cityCode);
        this.get_forcast(this.props.cityCode); 
    }

    state = {
        formValue: '',

        alert: true,
        alertMsg: null,

        unit: null,
        degree: null,
        icon: null,

        toastMsg: false,
        toastText: null,
    }

    get_countries = (param) => {
        this.props.searchListEmpty();
        const api = API.GET_COUNTRIES(param).then(res => {
            res.data.map(param => {
                const listParams = {
                    cityCode: param.Key,
                    text: param.LocalizedName, 
                }
                this.props.searchListAdd(listParams);
                return null;
            });
        }).catch(err => {
            this.errorHandle(err.message, false);
        });
        return api;
    }

    get_forcast = (param) => {
        const forcastArr = [];
        const api = API.GET_FORCAST(param).then(res => {
            res.data.DailyForecasts.map(arr => {
                const params = {
                    date: arr.Date,
                    iconDay: arr.Day.Icon,
                    iconNight: res.data.DailyForecasts[0].Night.Icon,
                    iconPhraseDay: arr.Day.IconPhrase,
                    iconPhraseNight: arr.Night.IconPhrase,
                    temperatureMin: Number((arr.Temperature.Maximum.Value -32) * 5/9).toFixed(1),
                    temperatureMinUnit: arr.Temperature.Maximum.Unit,
                    temperatureMinUnitType: arr.Temperature.Maximum.UnitType,
                    temperatureMax: arr.Temperature.Minimum.Value,
                    temperatureMaxUnit: arr.Temperature.Minimum.Unit,
                    temperatureMaxUnitType: arr.Temperature.Minimum.UnitType,
                    unit: this.props.unit,
                }
                
                forcastArr.push(params);
                return null;
            });
            this.props.forcastListAdd(forcastArr);
        }).catch(err => {
            this.errorHandle(err.message, false);
        });
        return api;
    }

    get_lat_long = () => {
        const api = API.GET_LAT_LONG().then(res => {
            const params = {
                cityName: res.data.LocalizedName,
            }
            this.props.cityNameInit(params)
        }).catch(err => {
            this.errorHandle(err.message, false);
        });
        return api;
    }

    get_weather = (key) => {
        const api = API.GET_WEATHER(key).then(res => {
            const params = {
                temp: res.data[0].Temperature.Metric.Value,
                Unit: res.data[0].Temperature.Metric.Unit,
                WeatherText: res.data[0].WeatherText,
                iconNumber: res.data[0].WeatherIcon,
            }
            this.props.searchListEmpty();
            this.props.searchSaveParams(params); 
        }).catch(err => {
            this.errorHandle(err.message, false);
        });
        return api
    }

    errorHandle = (msg, flag) => {
        this.setState({alertMsg: msg})
        this.setState({alert: flag});
    };

    formHandler = (e) => {
        let value = e.target.value.replace(/[^A-Za-z]/ig, '')
        this.setState({formValue: value});

        if(e.target.value.length > 1){
            const country = "&q=" + e.target.value;
            this.props.searchListEmpty();
            this.get_countries(country);
        }
    }

    handleItemClick = (item) => {
        const countyKey = this.props.searchList[0].cityCode;
        const country = "&q=" + item;
        this.props.searchListEmpty();
        this.get_countries(country);
        const params = {
            cityName: item,
            cityCode: countyKey,
        };
        this.props.searchSaveCity(params);
        this.setState({formValue: item});
        this.get_weather(countyKey);
        this.get_forcast(countyKey);
    }

    favHandler = () => {
        const fav = {
            cityCode: this.props.cityCode,
            cityName: this.props.cityName,
            temp: this.props.temp,
            Unit: this.props.unit,
            WeatherText: this.props.WeatherText,
            icon: this.props.iconNumber,
        }

        const checkIfFavInList = this.props.favoritesList.map(res => {
            if(res.cityCode === this.props.cityCode){
                return true;
            }
            return null;
        });
        if(this.props.favoritesList.length < 1){
            this.props.favoritesAdd(fav);
            this.setState(
                    {
                        toastMsg: true,
                        toastText: this.props.cityName + " was added to Favorites."
                    },
                );
        }else{
            if(checkIfFavInList.includes(true)){
                this.setState(
                        {
                            toastMsg: true,
                            toastText: this.props.cityName + " is already in Favorites."
                        },
                    );
            }else{
                this.props.favoritesAdd(fav);
                this.setState(
                    {
                        toastMsg: true,
                        toastText: this.props.cityName + "was added to Favorites."
                    }
                    );
            }
        }
    }
    // Fahrenheit / Celsius TOGGLE
    unitHandle = (e) => {
        let cutrrentTemp = null;
        let unit = null
        if(e[0] === 1){
            if(this.props.unit === "c" || this.props.unit === "C"){
                cutrrentTemp = Number((this.props.temp * (9/5)) + 32).toFixed(1);
                unit = "f";

                let forcast = JSON.parse(JSON.stringify(this.props.forcastList));
                forcast.map(res => {
                    res.temperatureMin = Number((res.temperatureMin * (9/5)) + 32).toFixed(1); 
                    res.unit = unit
                    return null;
                });

                let favorites = JSON.parse(JSON.stringify(this.props.favoritesList));
                favorites.map(res => {
                    res.temp = Number((res.temp * (9/5)) + 32).toFixed(1); 
                    res.unit = unit
                    return null;
                });

                this.props.favoritesFCUpdate(favorites)
                this.props.forcastFCUpdate(forcast);
            }
        }else if (e[0] === 2){
            if(this.props.unit === "f" || this.props.unit === "F"){
                cutrrentTemp = Number((this.props.temp - 32) * 5/9).toFixed(1);
                unit = "c"
                
                let forcast = JSON.parse(JSON.stringify(this.props.forcastList));
                forcast.map(res => {
                    res.temperatureMin = Number((res.temperatureMin - 32) * 5/9).toFixed(1);
                    res.unit = unit
                    return null;
                });

                let favorites = JSON.parse(JSON.stringify(this.props.favoritesList));
                favorites.map(res => {
                    res.temp = Number((res.temp - 32) * 5/9).toFixed(1);
                    res.unit = unit
                    return null;
                });

                this.props.favoritesFCUpdate(favorites)
                this.props.forcastFCUpdate(forcast);
            }
        }
        if(cutrrentTemp != null && unit != null){
            const params = {
                Unit: unit,
                temp: cutrrentTemp,
            }
            this.props.changeTempUnit(params);
        }
    }

    iconWeatherCondition = () => {
        let icon = this.props.iconNumber;
        const params = {
            iconNumber: icon,
        }

        this.props.changeIconNumber(params);
        if(icon > 9){
            icon = icon + "-s.png";
        }else{
            icon = "0" + icon + "-s.png";
        }
        this.setState({icon: icon});
    }

    render(){
        let toast = null;
        if(this.state.toastMsg){
            toast = (
                <ToastMsg 
                    text={this.state.toastText}
                />
            );
            setTimeout(() => {
                this.setState({toastMsg: false});
            }, 3000)
        }
        return(
            <div>
                {!this.state.alert ? 
                <AlertPopUP
                    alertMessage={this.state.alertMsg}
                /> : 
                <div>
                <div className="searchCity">
                    <SearchCity
                        formValue={this.state.formValue}
                        formChange={this.formHandler}
                        />
                    {this.props.searchList.length > 2 ? 
                    <CountriesList
                    list={this.props.searchList}
                    itemClick={this.handleItemClick}
                    />
                    : null}
            </div>
    
            <div className="selectedCity">
                {toast}
                <div>
                    {/* firs */}
                    <LeftRightDivs 
                        city={this.props.cityName}
                        temp={this.props.temp}
                        addFav={this.favHandler}
                        value={this.state.unit}
                        handleChange={this.unitHandle}
                        leftBG={this.props.style.left}
                        rightBG={this.props.style.right}
                        boxesBG={this.props.style.boxes}
                        img={this.state.icon}
                        unit={this.props.unit}
                        />
                </div>
                    
                <div className="selectedSecond">
                    {this.props.WeatherText ? <h1>{this.props.WeatherText}</h1> : <Spinner animation="border" variant="primary" />}
                </div>
                    <ForcastBox
                        list={this.props.forcastList}
                        boxesBG={this.props.style.boxes}
                    />
                </div>
            </div>
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cityCode: state.cityCode,
        searchList: state.searchList,
        favoritesList: state.favoritesList,
        cityName: state.cityName,
        temp: state.temp,
        unit: state.Unit,
        WeatherText: state.WeatherText,
        forcastList: state.forcastList,
        style: state.style,
        iconNumber: state.iconNumber,
    };
}

const mapDispachToProps = dispatch => {
  return {
    searchListAdd: (search) => dispatch({type: actionTypes.SEARCH_LIST_ADD, search}),
    searchListEmpty: () => dispatch({type: actionTypes.SEARCH_LIST_EMPTY}),
    searchSaveParams: (params) => dispatch({type: actionTypes.SEARCH_LIST_SAVE_PARAMS, params}),
    changeTempUnit: (params) => dispatch({type: actionTypes.CHANGE_TEMP_UNIT, params}),
    searchSaveCity: (params) => dispatch({type: actionTypes.SEARCH_LIST_SAVE_CITY, params}),
    favoritesAdd: (fav) => dispatch({type: actionTypes.FAVORITES_SAVE, fav}),
    forcastListAdd: (params) => dispatch({type: actionTypes.FORCAST_LIST, params}),
    forcastFCUpdate: (params) => dispatch({type: actionTypes.FORCAST_FC_UPDATE, params}),
    favoritesFCUpdate: (params) => dispatch({type: actionTypes.FAVORITES_FC_UPDATE, params}),
    cityNameInit: (params) => dispatch({type: actionTypes.SAVE_INIT_CITY_NAME, params}),
    changeIconNumber: (params) => dispatch({type: actionTypes.CHANGE_ICON, params}),
  }
};

export default connect(mapStateToProps, mapDispachToProps)(HomePage);