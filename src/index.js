import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';

//Рендер страницы

ReactDOM.render(
    //BrowserRouter - обертка для использования компонента Route
    <BrowserRouter>
        <Provider store = {store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root')
);

serviceWorker.unregister();