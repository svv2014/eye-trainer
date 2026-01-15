import React from 'react';
import './css/common.css';
import './App.css';
import { languages, strings } from "./languages/localizationStrings";
import LanguageSwitch from "./components/LanguageSwitch";
import { Cookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { getTheme, setTheme, applyTheme, getAudioEnabled, setAudioEnabled } from "./tools/localStorage";
import iconImg from './icon.png';
import { exerciseDurations, exerciseCounts } from './config/exerciseConfig';
import { trackThemeChange, trackAudioToggle, trackLanguageChange } from './tools/analytics';

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
        this.cookies.set('lang', lang, { path: '/' });
        this.setState({
            language: lang
        });
        trackLanguageChange(lang);
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        this.setState({ theme: newTheme });
        trackThemeChange(newTheme);
    }

    toggleAudio() {
        const newAudioState = !this.state.audioEnabled;
        setAudioEnabled(newAudioState);
        this.setState({ audioEnabled: newAudioState });
        trackAudioToggle(newAudioState);
    }

    render() {
        return (<div className="App">
            <div className="top-nav">
                <div className="nav-brand">
                    <img src={iconImg} alt="" className="nav-logo" />
                    <span>{strings.appName}</span>
                </div>
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
                        onLanguageChange={(lang) => this.changeLanguage(lang)} />
                </div>
            </div>

            <div className="hero-section">
                <div className="hero-icon">
                    <img src={iconImg} alt="Eye Fitness" />
                </div>
                <h1 className="hero-title">{strings.appName}</h1>
                <p className="hero-subtitle">{strings.motto}</p>

                <div className="social-proof">
                    <span className="proof-item">
                        <span className="proof-icon">🌍</span>
                        {strings.socialProofUsers}
                    </span>
                    <span className="proof-item">
                        <span className="proof-icon">⭐</span>
                        {strings.socialProofFree}
                    </span>
                    <span className="proof-item">
                        <span className="proof-icon">🔒</span>
                        {strings.socialProofPrivacy}
                    </span>
                </div>

                <a href="exerciseBeginner" className="hero-cta">
                    {strings.startTrainingCta} →
                </a>
            </div>

            <div className="main-content">
                <div className="section-header">
                    <h2 className="section-title">{strings.startExercise}</h2>
                    <p className="section-description">{strings.startExerciseDescription}</p>
                </div>

                <div className="exercise-grid">
                    <a href="exerciseBeginner" className="exercise-card">
                        <div className="card-level">Level 1</div>
                        <div className="card-icon">&#127793;</div>
                        <h3 className="card-title">{strings.easy}</h3>
                        <p className="card-benefit">{strings.easyBenefit}</p>
                        <div className="card-meta">
                            <span className="duration">⏱ ~{exerciseDurations.beginner} min</span>
                            <span className="exercises">{exerciseCounts.beginner} {strings.exerciseCount ? strings.formatString(strings.exerciseCount, exerciseCounts.beginner).replace(`${exerciseCounts.beginner} `, '') : 'exercises'}</span>
                        </div>
                        <div className="difficulty-bar">
                            <span className="filled"></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>

                    <a href="exerciseIntermediate" className="exercise-card">
                        <div className="card-level">Level 2</div>
                        <div className="card-icon">&#128170;</div>
                        <h3 className="card-title">{strings.medium}</h3>
                        <p className="card-benefit">{strings.mediumBenefit}</p>
                        <div className="card-meta">
                            <span className="duration">⏱ ~{exerciseDurations.intermediate} min</span>
                            <span className="exercises">{exerciseCounts.intermediate} {strings.exerciseCount ? strings.formatString(strings.exerciseCount, exerciseCounts.intermediate).replace(`${exerciseCounts.intermediate} `, '') : 'exercises'}</span>
                        </div>
                        <div className="difficulty-bar">
                            <span className="filled"></span>
                            <span className="filled"></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>

                    <a href="exerciseAdvanced" className="exercise-card">
                        <div className="card-level">Level 3</div>
                        <div className="card-icon">&#128293;</div>
                        <h3 className="card-title">{strings.tough}</h3>
                        <p className="card-benefit">{strings.toughBenefit}</p>
                        <div className="card-meta">
                            <span className="duration">⏱ ~{exerciseDurations.advanced} min</span>
                            <span className="exercises">{exerciseCounts.advanced} {strings.exerciseCount ? strings.formatString(strings.exerciseCount, exerciseCounts.advanced).replace(`${exerciseCounts.advanced} `, '') : 'exercises'}</span>
                        </div>
                        <div className="difficulty-bar">
                            <span className="filled"></span>
                            <span className="filled"></span>
                            <span className="filled"></span>
                            <span></span>
                        </div>
                    </a>

                    <a href="exerciseAdvanced2" className="exercise-card card-featured">
                        <div className="card-badge">INTENSIVE</div>
                        <div className="card-level">Level 4</div>
                        <div className="card-icon">&#9889;</div>
                        <h3 className="card-title">{strings.tough} x2</h3>
                        <p className="card-benefit">{strings.tough2Benefit}</p>
                        <div className="card-meta">
                            <span className="duration">⏱ ~{exerciseDurations.advanced2} min</span>
                            <span className="exercises">{exerciseCounts.advanced2} {strings.exerciseCount ? strings.formatString(strings.exerciseCount, exerciseCounts.advanced2).replace(`${exerciseCounts.advanced2} `, '') : 'exercises'}</span>
                        </div>
                        <div className="difficulty-bar">
                            <span className="filled"></span>
                            <span className="filled"></span>
                            <span className="filled"></span>
                            <span className="filled"></span>
                        </div>
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

                <div className="divider"></div>

                {/* Features Section */}
                <div className="features-section">
                    <h2 className="features-title">{strings.featuresTitle}</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <span className="feature-icon">💰</span>
                            <h4 className="feature-title">{strings.featureFreeTitle}</h4>
                            <p className="feature-desc">{strings.featureFreeDesc}</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">🔒</span>
                            <h4 className="feature-title">{strings.featurePrivacyTitle}</h4>
                            <p className="feature-desc">{strings.featurePrivacyDesc}</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">🌐</span>
                            <h4 className="feature-title">{strings.featureUniversalTitle}</h4>
                            <p className="feature-desc">{strings.featureUniversalDesc}</p>
                        </div>
                        <div className="feature-card">
                            <span className="feature-icon">🎯</span>
                            <h4 className="feature-title">{strings.featureScienceTitle}</h4>
                            <p className="feature-desc">{strings.featureScienceDesc}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collapsible Disclaimer */}
            <details className="disclaimer-collapsible">
                <summary className="disclaimer-summary">
                    <span className="disclaimer-icon">ℹ️</span>
                    <span>{strings.healthInfoTitle}</span>
                </summary>
                <div className="disclaimer-content">
                    <p>{strings.formatString(strings.disclaimer, strings.disclaimerTextPart1)}</p>
                </div>
            </details>

            <footer className="footer">
                <div className="footer-brand">
                    <img src={iconImg} alt="" className="footer-logo" />
                    <span>{strings.appName}</span>
                </div>
                <div className="footer-links">
                    <a href="/policy">{strings.privacyPolicy}</a>
                    <a href="/support">{strings.support}</a>
                </div>
                <div className="footer-content">
                    <p className="footer-text">{strings.builtInQuebec}</p>
                    <p className="footer-subtext">{strings.peopleDriven}</p>
                </div>
            </footer>
        </div>)
    }
}

export default App;
