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
import {
    exerciseDelay,
    exerciseFinished,
    exerciseLeftRight, exerciseRoundLeft, exerciseRoundRight,
    exerciseUpDown,
    exerciseUpLeftDownRight, exerciseUpRightDownLeft
} from "./tools/ExersiseUtils";
import {strings} from "./languages/localizationStrings";

function goBack() {
    window.history.back();
}

const fistSet = (repetitions) => {
    return [exerciseDelay(5, strings.getReady),
        exerciseLeftRight(repetitions),
        exerciseDelay(5, strings.blink),
        exerciseUpDown(repetitions),
        exerciseDelay(5, strings.blink),
        exerciseUpRightDownLeft(repetitions),
        exerciseDelay(5, strings.blink),
        exerciseUpLeftDownRight(repetitions),
    ];
}

const addFinish = (set) => {
    return [...set,
        exerciseFinished(strings.finishedForToday)];
}

const beginner = addFinish(fistSet(5));

const intermediate =
    addFinish([...fistSet(10),
        exerciseDelay(5, strings.blink),
        exerciseRoundLeft(2),
        exerciseDelay(5, strings.blink),
        exerciseRoundRight(2)
    ]);

const advanced = addFinish([...fistSet(15),
    exerciseDelay(5, strings.blink),
    exerciseRoundLeft(5),
    exerciseDelay(5, strings.blink),
    exerciseRoundRight(5)
]);

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
