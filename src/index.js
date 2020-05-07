import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './Pages/Store/Reducer'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }catch(err){}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedStore = loadFromLocalStorage();
const store = createStore(reducer, persistedStore, composeEnhancers(applyMiddleware()));
store.subscribe(() => saveToLocalStorage(store.getState()));

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined
    return JSON.parse(serializedState);
  }catch(err){
    return undefined;
  }
}

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider> 
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
