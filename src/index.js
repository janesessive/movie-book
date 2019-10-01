import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
axios.defaults.timeout=5*60*1000;

ReactDOM.render(<BrowserRouter>
    <App/>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
