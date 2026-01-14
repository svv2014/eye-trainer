import React from 'react';
import '../css/common.css';
import './Support.css';
import {strings} from "../languages/localizationStrings";
import {Cookies} from 'react-cookie';

class Support extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let language = strings.getLanguage();
        this.state = {
            language: language
        }
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(lang) {
        strings.setLanguage(lang);
        this.cookies.set('lang', lang, {path: '/'});
        this.setState({
            language: lang
        });
    }

    render() {
        return (<div className="App">
            <h1 className={"pageTitle"}>{strings.support}</h1>
            <br/>
            <h2>{strings.motto}</h2>
            <p className={"textGray"}>{strings.missionStatement}</p>
            <br/>
            <br/>
            <h2 className={"pageTitle"}>{strings.supportEmail}</h2>
        </div>)
    }
}

export default Support;
