import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';

const App = () => (
  <div className="App">
      <h1 className={"programName"}>Eyes Trainer</h1>
      <h3>Disclaimer: Please check with your Eye Doctor fist before starting exercises.
          Contact lenses cannot be worn before, during, after doing exercises. </h3>

      <br/>
      <h2>Start by choosing your level: </h2>

    <a href={"exerciseBeginner"} className={"start-button"}>{"Beginner"}</a>
  </div>
);

export default hot(module)(App);
