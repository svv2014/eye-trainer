import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

const App = () => (
  <div className="App">
      <h1 className={"programName"}>Eyes Trainer</h1>
      <h3>Disclaimer: Please check with your Eye Doctor fist before starting exercises.
          Contact lenses cannot be worn before, during, after doing exercises.
          By continuing you agree to use this website at your own risk.</h3>
      <br/>
      <h2>Start exercising by choosing difficulty </h2>
      <h3>Beginners should start with Easy level once a day during one week. After then moderate as you feel.
          You can pause any time by clicking on pause button or pressing 'space'.</h3>
      <br/>
    <a href={"exerciseBeginner"} className={"start-button"}>{"Easy"}</a>
    <a href={"exerciseIntermediate"} className={"start-button"}>{"Medium"}</a>
    <a href={"exerciseAdvanced"} className={"start-button"}>{"Tough"}</a>
  </div>
);

export default hot(module)(App);
