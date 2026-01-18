import React from 'react';
import './css/common.css';
import './App.css';
import { languages, strings } from "./languages/localizationStrings";
import LanguageSwitch from "./components/LanguageSwitch";
import { Cookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { getTheme, setTheme, applyTheme, getAudioEnabled, setAudioEnabled } from "./tools/localStorage";
import audioGuide from "./tools/AudioGuide";
import iconImg from './icon.png';
import { exerciseDurations, exerciseCounts, exerciseGroups } from './config/exerciseConfig';
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
            audioEnabled: audioEnabled,
            openGroups: { basics: true, progressive: false, specialized: false }
        }
        this.changeLanguage = this.changeLanguage.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.handleExerciseClick = this.handleExerciseClick.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
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
        // Unlock audio on user interaction
        if (newAudioState) {
            audioGuide.unlockAudio();
        }
    }

    // Handle click on exercise cards to unlock audio before navigation
    handleExerciseClick(e) {
        // Unlock audio on this user gesture before navigation
        if (this.state.audioEnabled) {
            audioGuide.unlockAudio();
        }
        // Allow default navigation to continue
    }

    // Toggle accordion group open/closed
    toggleGroup(groupName) {
        this.setState(prevState => ({
            openGroups: {
                ...prevState.openGroups,
                [groupName]: !prevState.openGroups[groupName]
            }
        }));
    }

    // Render exercise card for a level
    renderExerciseCard(level, index, groupName) {
        const levelIcons = ['🌱', '💪', '🔥', '⚡', '🎯', '🧘', '👁️'];
        const icon = levelIcons[index % levelIcons.length];
        const duration = exerciseDurations[level.key];
        const count = exerciseCounts[level.key];

        return (
            <a
                href={`exercise${level.key.charAt(0).toUpperCase() + level.key.slice(1)}`}
                className="exercise-card"
                key={level.key}
                onClick={this.handleExerciseClick}
            >
                <div className="card-icon">{icon}</div>
                <h3 className="card-title">{level.name}</h3>
                <div className="card-meta">
                    <span className="duration">⏱ ~{duration} min</span>
                    <span className="exercises">{count} exercises</span>
                </div>
            </a>
        );
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

                <a href="exerciseBeginner" className="hero-cta" onClick={this.handleExerciseClick}>
                    {strings.startTrainingCta} →
                </a>
            </div>

            <div className="main-content">
                <div className="section-header">
                    <h2 className="section-title">{strings.startExercise}</h2>
                    <p className="section-description">{strings.startExerciseDescription}</p>
                </div>

                {/* Exercise Groups Accordion */}
                <div className="exercise-groups">
                    {Object.entries(exerciseGroups).map(([groupKey, group]) => {
                        const isOpen = this.state.openGroups[groupKey];
                        const totalLevels = group.levels.length;

                        return (
                            <div key={groupKey} className={`exercise-group ${isOpen ? 'open' : 'closed'}`}>
                                <button
                                    className="group-header"
                                    onClick={() => this.toggleGroup(groupKey)}
                                    aria-expanded={isOpen}
                                >
                                    <div className="group-header-content">
                                        <div className="group-title-row">
                                            <h3 className="group-title">{group.displayName}</h3>
                                            <span className="group-count">{totalLevels} {totalLevels === 1 ? 'level' : 'levels'}</span>
                                        </div>
                                        <p className="group-description">{group.description}</p>
                                    </div>
                                    <span className="group-chevron">{isOpen ? '▼' : '▶'}</span>
                                </button>

                                {isOpen && (
                                    <div className="group-content">
                                        <div className="exercise-grid">
                                            {group.levels.map((level, index) =>
                                                this.renderExerciseCard(level, index, groupKey)
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
