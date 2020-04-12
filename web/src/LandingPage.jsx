import {hot} from 'react-hot-loader';
import React from 'react';
import './LandingPage.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Exercise1 from "./pages/Exercise";
import App from "./App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {exerciseDelay, exerciseFinished, exerciseLeftRight, exerciseUpDown} from "./tools/ExersiseUtils";
import {strings} from "./languages/localizationStrings";

function goBack() {
    window.history.back();
}

const fistSet = (repetitions) => {
    return [exerciseDelay(5, strings.beginIn),
        exerciseLeftRight(repetitions),
        exerciseDelay(5, strings.rest),
        exerciseUpDown(repetitions),
        exerciseDelay(5, strings.rest),
        exerciseLeftRight(repetitions),
        exerciseDelay(5, strings.rest),
        exerciseUpDown(repetitions),
        exerciseFinished(strings.finishedForToday),
    ];
}


const beginner = fistSet(5);

const intermediate = fistSet(10)

const advanced = fistSet(15);


const LandingPage = () =>
    (
        <Router>
            <div>
                <Switch>
                    <Redirect exact from="/" to="/welcome"/>
                    <Route path="/exerciseBeginner">
                        <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft}/></a>
                        <Exercise1 activities={beginner}/>
                    </Route>
                    <Route path="/exerciseIntermediate">
                        <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft}/></a>
                        <Exercise1 activities={intermediate}/>
                    </Route>
                    <Route path="/exerciseAdvanced">
                        <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft}/></a>
                        <Exercise1 activities={advanced}/>
                    </Route>
                    <Route path="/welcome"><App/></Route>
                </Switch>
            </div>
        </Router>
    );

export default hot(module)(LandingPage);
