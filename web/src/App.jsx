import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

const App = () => (
  <div className="App">
    <a href={"exerciseBeginner"} className={"start-button"}>{"Beginner"}</a>
  </div>
);

export default hot(module)(App);
