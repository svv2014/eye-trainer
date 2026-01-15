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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { beginner, intermediate, advanced, advanced2 } from "./config/exerciseConfig";
import SelfTest from "./pages/SelfTest";
import AppPolicy from "./pages/AppPolicy";
import Support from "./pages/Support";

function goBack() {
    window.history.back();
}


const LandingPage = () =>
(
    <Router>
        <div>
            <Switch>
                <Redirect exact from="/" to="/welcome" />
                <Route path="/selfTest">
                    <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft} /></a>
                    <SelfTest />
                </Route>
                <Route path="/exerciseBeginner">
                    <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft} /></a>
                    <Exercise1 activities={beginner} difficulty="beginner" />
                </Route>
                <Route path="/exerciseIntermediate">
                    <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft} /></a>
                    <Exercise1 activities={intermediate} difficulty="intermediate" />
                </Route>
                <Route path="/exerciseAdvanced">
                    <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft} /></a>
                    <Exercise1 activities={advanced} difficulty="advanced" />
                </Route>
                <Route path="/exerciseAdvanced2">
                    <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft} /></a>
                    <Exercise1 activities={advanced2} difficulty="advanced2" />
                </Route>
                <Route path="/policy">
                    <AppPolicy />
                </Route>
                <Route path="/support">
                    <Support />
                </Route>
                <Route path="/welcome"><App /></Route>
            </Switch>
        </div>
    </Router>
);

export default LandingPage;
