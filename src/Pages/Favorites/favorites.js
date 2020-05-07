import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../Store/Actions';
import './favorites.css';
import FavList from './favList';


class Favorites extends Component {

    componentDidMount(){
    }

    loadFavHandler = (index) => {
      const favLoad = this.props.favoritesList[index]

      const params = {
        cityCode: favLoad.cityCode,
        cityName: favLoad.cityName,
      }
      this.props.favoritesLoad(params)
      this.props.history.push('/');
    }

    deleteFavHandler = (index) => {
      this.props.favRemove(index);

    }

    render(){

        return (
              <FavList
                list={this.props.favoritesList}
                loadFav={this.loadFavHandler}
                deleteFav={this.deleteFavHandler}
                cardBG={this.props.style.boxes}
                cardColor={this.props.style.color}
              />
        );
    }
}

const mapStateToProps = state => {
    return {
        favoritesList: state.favoritesList,
        cityName: state.cityName,
        style: state.style,
    };
}

const mapDispachToProps = dispatch => {
  return {
    searchListAdd: (search) => dispatch({type: actionTypes.SEARCH_LIST_ADD, search}),
    favRemove: (fav) => dispatch({type: actionTypes.FAVORITES_DELETE_ITEM, fav}),
    favoritesLoad: (params) => dispatch({type: actionTypes.FAVORITES_LOAD, params}),
  }
};

export default connect(mapStateToProps, mapDispachToProps)(Favorites);