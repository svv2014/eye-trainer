import './PauseButton.css';
import React from 'react';
import './LanguageSwitch.css';


class LanguageSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            languages: this.props.languages,
            isOpen: false
        };
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevState.language) {
            this.setState({
                language: this.props.language
            });
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    toggleDropdown = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    changeButtonState = (lang, langName) => {
        if (this.props.onLanguageChange && lang !== this.state.language) {
            this.props.onLanguageChange(lang);
            this.announceLanguageChange(langName);
        }
        this.setState({ isOpen: false });
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
            <nav role="navigation" aria-label="Choose language" ref={this.wrapperRef}>
                <div className={`langContainer ${this.state.isOpen ? 'open' : ''}`} role="group">
                    {/* Mobile Trigger */}
                    <button
                        className="lang-trigger"
                        onClick={this.toggleDropdown}
                        aria-expanded={this.state.isOpen}
                        aria-label="Select language"
                    >
                        <span className="lang-icon" aria-hidden="true">🌐</span>
                        <span className="current-lang-code">{this.state.language.toUpperCase()}</span>
                    </button>

                    {/* Language List */}
                    <div className="lang-list">
                        <span className="lang-icon desktop-only" aria-hidden="true">🌐</span>
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
                </div>
            </nav>
        )
    };
}

export default LanguageSwitch;