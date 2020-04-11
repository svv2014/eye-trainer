import { hot } from 'react-hot-loader';
import React from 'react';
import './LandingPage.css';
import {    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation} from "react-router-dom";
import Exercise1 from "./pages/Exercise";
import App from "./App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function goBack() {
    window.history.back();
}

const LandingPage = () =>
     (
        <Router>
            <div>
                <Switch>
                    <Redirect exact from="/" to="/welcome"/>
                    <Route path="/exercise1">
                        <a onClick={goBack} href={"#"} className={"back"}><FontAwesomeIcon icon={faArrowLeft}/></a>
                        <Exercise1/>
                    </Route>
                    <Route path="/welcome"><App/></Route>
                </Switch>
            </div>
        </Router>
    );

export default hot(module)(LandingPage);
