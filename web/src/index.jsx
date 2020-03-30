import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import  store from "./redux/store";
import LendingPage from "./LandingPage";

render(
    <Provider store={store}>
        <LendingPage />
    </Provider>,
    document.getElementById('root')
);