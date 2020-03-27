import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

let message = "Start";

let start = () => {
    console.log(message);
    if (message === "Start") {
        message = "Stop"
    } else {
        message = "Start"
    }
}

const App = () => (
  <div className="App">
    <div onClick={start} className={"start-button"}>{message}</div>
  </div>
);

export default hot(module)(App);
