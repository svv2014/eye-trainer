import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

const App = () => (
  <div className="App">
    <a href={"exercise1"} className={"start-button"}>{"Start"}</a>
  </div>
);

export default hot(module)(App);
