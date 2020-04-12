import {hot} from 'react-hot-loader';
import React from 'react';
import './App.css';
import {strings} from "./languages/localizationStrings";


const App = () => (
    <div className="App">
        <h1 className={"programName"}>{strings.appName}</h1>
        <h3>{strings.formatString(strings.disclaimer, strings.disclaimerTextPart1)}</h3>
        <br/>
        <h2>{strings.startExercise}</h2>
        <h3>{strings.startExerciseDescription}</h3>
        <br/>
        <a href={"exerciseBeginner"} className={"start-button"}>{strings.easy}</a>
        <a href={"exerciseIntermediate"} className={"start-button"}>{strings.medium}</a>
        <a href={"exerciseAdvanced"} className={"start-button"}>{strings.tough}</a>
    </div>
);

export default hot(module)(App);
