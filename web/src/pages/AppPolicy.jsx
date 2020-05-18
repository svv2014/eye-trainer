import {hot} from 'react-hot-loader';
import React from 'react';
import '../css/common.css';
import './AppPolicy.css';
import {strings} from "../languages/localizationStrings";
import {Cookies} from 'react-cookie';

class AppPolicy extends React.Component {
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
            <h1 className={"pageTitle"}>{strings.privacyPolicy}</h1>
            <h2 className={"pageTitle"}>{strings.privacyPolicyPersonal}</h2>
            <h3 className={"textGray"}>{strings.privacyPolicyPersonalText}</h3>
            <h2 className={"pageTitle"}>{strings.privacyPolicyNonPersonal}</h2>
            <h3 className={"textGray"}>{strings.privacyPolicyNonPersonalText}</h3>
        </div>)
    }
}

export default hot(module)(AppPolicy);
