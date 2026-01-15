import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import  store from "./redux/store";
import LendingPage from "./LandingPage";
import { applyTheme } from "./tools/localStorage";

// Apply theme immediately to prevent flash of wrong theme
applyTheme();

render(
    <Provider store={store}>
        <LendingPage />
    </Provider>,
    document.getElementById('root')
);