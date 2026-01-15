import React from 'react';
import './css/common.css';
import './App.css';
import {languages, strings} from "./languages/localizationStrings";
import LanguageSwitch from "./components/LanguageSwitch";
import {Cookies} from 'react-cookie';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon, faVolumeUp, faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import {getTheme, setTheme, applyTheme, getAudioEnabled, setAudioEnabled} from "./tools/localStorage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let language = strings.getLanguage();

        // Apply theme on load
        const currentTheme = applyTheme();
        const audioEnabled = getAudioEnabled();

        this.state = {
            language: language,
            theme: currentTheme,
            audioEnabled: audioEnabled
        }
        this.changeLanguage = this.changeLanguage.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
    }

    changeLanguage(lang) {
        strings.setLanguage(lang);
        this.cookies.set('lang', lang, {path: '/'});
        this.setState({
            language: lang
        });
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        this.setState({ theme: newTheme });
    }

    toggleAudio() {
        const newAudioState = !this.state.audioEnabled;
        setAudioEnabled(newAudioState);
        this.setState({ audioEnabled: newAudioState });
    }

    render() {
        return (<div className="App">
            <div className="top-nav">
                <div className="nav-brand">{strings.appName}</div>
                <div className="nav-controls">
                    <button
                        className={`nav-icon-btn ${this.state.audioEnabled ? 'active' : ''}`}
                        onClick={this.toggleAudio}
                        title={this.state.audioEnabled ? strings.audioOn : strings.audioOff}
                        aria-label={this.state.audioEnabled ? strings.audioOn : strings.audioOff}
                    >
                        <FontAwesomeIcon icon={this.state.audioEnabled ? faVolumeUp : faVolumeMute} />
                    </button>
                    <button
                        className="nav-icon-btn"
                        onClick={this.toggleTheme}
                        title={this.state.theme === 'dark' ? strings.lightMode : strings.darkMode}
                        aria-label={this.state.theme === 'dark' ? strings.lightMode : strings.darkMode}
                    >
                        <FontAwesomeIcon icon={this.state.theme === 'dark' ? faSun : faMoon} />
                    </button>
                    <LanguageSwitch language={this.state.language} languages={languages}
                                    onLanguageChange={(lang) => this.changeLanguage(lang)}/>
                </div>
            </div>

            <div className="hero-section">
                <h1 className="hero-title">{strings.appName}</h1>
                <p className="hero-subtitle">{strings.motto}</p>
                <p className="hero-tagline">{strings.mottoTagline}</p>
            </div>

            <div className="disclaimer-section">
                <div className="disclaimer-box">
                    <span className="disclaimer-icon">&#9888;&#65039;</span>
                    <p className="disclaimer-text">{strings.formatString(strings.disclaimer, strings.disclaimerTextPart1)}</p>
                </div>
            </div>

            <div className="main-content">
                <div className="section-header">
                    <h2 className="section-title">{strings.startExercise}</h2>
                    <p className="section-description">{strings.startExerciseDescription}</p>
                </div>

                <div className="exercise-grid">
                    <a href="exerciseBeginner" className="exercise-card">
                        <div className="card-icon">&#127793;</div>
                        <h3 className="card-title">{strings.easy}</h3>
                        <p className="card-description">5 repetitions per exercise</p>
                        <div className="card-duration">~5 minutes</div>
                    </a>

                    <a href="exerciseIntermediate" className="exercise-card">
                        <div className="card-icon">&#128170;</div>
                        <h3 className="card-title">{strings.medium}</h3>
                        <p className="card-description">10 repetitions per exercise</p>
                        <div className="card-duration">~8 minutes</div>
                    </a>

                    <a href="exerciseAdvanced" className="exercise-card">
                        <div className="card-icon">&#128293;</div>
                        <h3 className="card-title">{strings.tough}</h3>
                        <p className="card-description">15 repetitions per exercise</p>
                        <div className="card-duration">~12 minutes</div>
                    </a>

                    <a href="exerciseAdvanced2" className="exercise-card card-featured">
                        <div className="card-badge">INTENSIVE</div>
                        <div className="card-icon">&#9889;</div>
                        <h3 className="card-title">{strings.tough} x2</h3>
                        <p className="card-description">30 repetitions per exercise</p>
                        <div className="card-duration">~20 minutes</div>
                    </a>
                </div>

                <div className="divider"></div>

                <a href="selfTest" className="self-test-button">
                    <span className="test-icon">&#128065;&#65039;</span>
                    <div className="test-content">
                        <h3 className="test-title">{strings.selfTestTitle}</h3>
                        <p className="test-description">Test your visual acuity</p>
                    </div>
                    <span className="arrow-icon">&rarr;</span>
                </a>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">{strings.builtInQuebec}</p>
                    <p className="footer-subtext">{strings.peopleDriven}</p>
                </div>
            </footer>
        </div>)
    }
}

export default App;
