import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import  store from "./redux/store";
import LendingPage from "./LandingPage";
import { applyTheme } from "./tools/localStorage";

// Apply theme immediately to prevent flash of wrong theme
applyTheme();

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);

                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

render(
    <Provider store={store}>
        <LendingPage />
    </Provider>,
    document.getElementById('root')
);