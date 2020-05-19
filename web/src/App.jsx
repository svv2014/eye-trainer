import {hot} from 'react-hot-loader';
import React from 'react';
import './css/common.css';
import './App.css';
import {languages, strings} from "./languages/localizationStrings";
import LanguageSwitch from "./components/LanguageSwitch";
import {Cookies} from 'react-cookie';

class App extends React.Component {
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
            <LanguageSwitch language={this.state.language} languages={languages}
                            onLanguegeChange={(lang) => this.changeLanguage(lang)}/>
            <h1 className={"pageTitle"}>{strings.appName}</h1>
            <div className={"storeBadges"}>
                <a href='https://play.google.com/store/apps/details?id=ca.eyefitness.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <img alt='Get it on Google Play' className={"googlePlayLogoImage"}
                         src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
                <a href='https://apps.apple.com/ca/app/eye-fitness-app/id1513814492'>
                    <img alt='Get it on App Store' className={"appStoreImage"}
                         src='res/AppStoreBalck.png'/></a>
            </div>
            <h3 className={"textGray"}>{strings.formatString(strings.disclaimer, strings.disclaimerTextPart1)}</h3>
            <br/>
            <h2>{strings.startExercise}</h2>
            <h3 className={"textGray"}> {strings.startExerciseDescription}</h3>
            <br/>
            <a href={"exerciseBeginner"} className={"start-button"}>{strings.easy}</a>
            <a href={"exerciseIntermediate"} className={"start-button"}>{strings.medium}</a>
            <a href={"exerciseAdvanced"} className={"start-button"}>{strings.tough}</a>
            <a href={"exerciseAdvanced2"} className={"start-button"}>{strings.tough + " x2"}</a>
            <h2><a href={"selfTest"} className={"start-button"}>{strings.selfTestTitle}</a></h2>

        </div>)
    }
}

export default hot(module)(App);
