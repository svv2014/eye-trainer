import './PauseButton.css';
import React from 'react';
import './LanguageSwitch.css';


class LanguageSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            languages: this.props.languages
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevState.language) {
            this.setState({
                language: this.props.language
            });
        }
    }

    changeButtonState = (lang, langName) => {
        if (this.props.onLanguageChange && lang !== this.state.language) {
            this.props.onLanguageChange(lang);
            this.announceLanguageChange(langName);
        }
    }

    announceLanguageChange = (langName) => {
        // Announce language change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Language changed to ${langName}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    render() {
        return (
            <nav role="navigation" aria-label="Choose language">
                <div className="langContainer" role="group">
                    <span className="lang-icon" aria-hidden="true">🌐</span>
                    {this.state.languages.map((lang) =>
                        <button
                            key={lang.locale}
                            onClick={() => this.changeButtonState(lang.locale, lang.name)}
                            className={"lang-button" + (lang.locale === this.state.language ? " active" : "")}
                            aria-label={`Change language to ${lang.name}`}
                            aria-current={lang.locale === this.state.language ? "true" : undefined}
                            disabled={lang.locale === this.state.language}
                            type="button"
                        >
                            {lang.name}
                        </button>
                    )}
                </div>
            </nav>
        )
    };
}

export default LanguageSwitch;