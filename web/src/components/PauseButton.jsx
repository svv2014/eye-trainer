import './PauseButton.css';
import {hot} from "react-hot-loader";
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faPause} from "@fortawesome/free-solid-svg-icons";


class PauseButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: !!this.props.play
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.play !== prevState.play) {
            this.setState({
                play: !!this.props.play
            });
        }
    }

    changeButtonState = () => {

        this.setState({
            play: !this.state.play
        });
        this.props.onStateChage(this.state.play);
    }

    render() {
        let icon = !!this.state.play  ? faPause : faPlay ;
        return (
            <div className={"pauseButtonContainer"}  onClick={this.changeButtonState}>
                <FontAwesomeIcon icon={icon} className={"icon"} />
            </div>)
    };
}

export default hot(module)(PauseButton);