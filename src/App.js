import React, { Component } from 'react';
import Navigation from './Pages/Navbar/navbar';
import './App.css';
import AppRoutes from './Utils/Routes';
import { connect } from 'react-redux';
import * as actionTypes from './Pages/Store/Actions';

class App extends Component {

  state = {
    value: null,
  }

  handleChangeTheme = (e) => {
    let style = null;

    if(e[0] === 1){
      // Dark
      style = {
        right: "#525252",
        left: "#7a7a7a",
        boxes: "#525252",
        color: "#ffffff",
        nav: "dark",
      };

    }else if (e[0] === 2){
      // Light
      style = {
        right: "#e3e3e3",
        left: "#b8b8b8",
        boxes: "#b8b8b8",
        color: "#000000",
        nav: "light",
      };

    }

    this.props.saveCustomStyle(style);
  }

  render (){

    return (
      <div className="App">
        <Navigation
          handleChange={this.handleChangeTheme}
          value={this.state.value}
          theameBG={this.props.style.nav}
          theameV={this.props.style.nav}

        />
        <div className="application">
          <AppRoutes/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
  };
}

const mapDispachToProps = dispatch => {
return {
  saveCustomStyle: (params) => dispatch({type: actionTypes.STYLE, params})
}
};

export default connect(mapStateToProps, mapDispachToProps)(App);
