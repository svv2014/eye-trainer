import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import './Eyes.css';
import {unsubscribeIfCan} from "../tools/rxTools";
import {ACTION_DOWN, ACTION_LEFT, ACTION_RELAX, ACTION_RIGHT, ACTION_UP} from "../tools/EyeActions";
import {hot} from "react-hot-loader";
import React from 'react';


const STATE = 'state';

/**
 * has in parameters size and eyeAction
 */
class Eyes extends React.Component {
    stateSub = new Subject();
    resultDebounce = this.stateSub.pipe(debounceTime(300));
    subscription;
    exerciseSubscription;

    constructor(props) {
        super(props);
        this.state = {size: props.size, eyeAction: ''};
        this.subscription = this.resultDebounce.subscribe(state => {
            if (state.action === STATE) {
                this.setState(state.data)
            }
        })
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevState) !== JSON.stringify(this.props)) {
            this.stateSub.next({action: STATE, data: this.props})
        }
    }

    componentWillUnmount() {
        unsubscribeIfCan(this.subscription);
        unsubscribeIfCan(this.exerciseSubscription);
    }

    render() {
        let eyeSize = this.state.size.width > this.state.size.height ? this.state.size.height -5 : this.state.size.width -5;
        let classNameEyeMove = "";
        if (this.state.eyeAction && this.state.eyeAction === ACTION_LEFT) {
            classNameEyeMove += ' moveLeft'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_RIGHT) {
            classNameEyeMove += ' moveRight'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_UP) {
            classNameEyeMove += ' moveUp'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_DOWN) {
            classNameEyeMove += ' moveDown'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_RELAX) {
            classNameEyeMove += ' relax'
        }

        return (
            <div className={"eyeHolder"} style={{width: eyeSize, height: eyeSize/2}}>
                <div className="eyeContainer" style={{width: eyeSize, height: eyeSize}}>
                    <div className={classNameEyeMove + " eye eyeLeft"}/>
                    <div className={classNameEyeMove + " eye eyeRight"}/>
                </div>
            </div>)
    };
}

export default hot(module)(Eyes);