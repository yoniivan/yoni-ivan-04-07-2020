import React, { Component } from 'react';
import HomePage from '../Pages/Home/Home'
import FavoritesPage from '../Pages/Favorites/favorites';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NoMatch from './PageNotFound';

class AppRoutes extends Component {

    render(){
  
        return(
             <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/favorites" component={FavoritesPage} />
                <Route component={NoMatch} />
            </Switch>
          
        );
      }
    }

  const mapStateToProps = state => {
      return {};
  }
  
  const mapDispachToProps = dispatch => {
    return {};
  };
  
export default connect(mapStateToProps, mapDispachToProps)(AppRoutes);