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
import Exercise1 from "./Exercise1";
import App from "./App";

function goBack() {
    window.history.back();
}

const LandingPage = () =>
     (
        <Router>
            <div>
                <a onClick={goBack} href={"#"} className={"back"}>Back Button</a>
                <Switch>
                    <Redirect exact from="/" to="/welcome"/>
                    <Route path="/exercise1"><Exercise1/></Route>
                    <Route path="/welcome"><App/></Route>
                </Switch>
            </div>
        </Router>
    );

export default hot(module)(LandingPage);
