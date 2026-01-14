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
            <div className="top-nav">
                <a href="/dashboard" className="nav-link">{strings.dashboard}</a>
                <LanguageSwitch language={this.state.language} languages={languages}
                                onLanguageChange={(lang) => this.changeLanguage(lang)}/>
            </div>
            <h1 className={"pageTitle"}>{strings.appName}</h1>
            <h2 className={"textGray"}>{strings.motto}</h2>
            <p className={"textGray"}><i>{strings.mottoTagline}</i></p>
            <br/>
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

            <div className={"quebec-badge"}>
                <p className={"textGray"}><small>{strings.builtInQuebec}</small></p>
                <p className={"textGray"}><small><i>{strings.peopleDriven}</i></small></p>
            </div>

        </div>)
    }
}

export default App;
