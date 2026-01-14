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

    changeButtonState = (lang) => {

        if (this.props.onLanguageChange && lang !== this.state.language) {
            this.props.onLanguageChange(lang);
        }
    }

    render() {
        let selectedLang = this.state.language;
        return (
            <div className={"langContainer"}>
                {this.state.languages.map((lang) =>
                    <a key={lang.locale} onClick={() => this.changeButtonState(lang.locale)}
                       className={"lang " + (lang.locale === this.state.language ? " currentLang" : "")}>{lang.name}</a>
                )}
            </div>)
    };
}

export default LanguageSwitch;