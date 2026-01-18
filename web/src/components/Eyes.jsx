import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import './Eyes.css';
import { unsubscribeIfCan } from "../tools/rxTools";
import {
    ACTION_DOWN, ACTION_DOWN_LEFT, ACTION_DOWN_RIGHT,
    ACTION_LEFT,
    ACTION_RELAX,
    ACTION_RIGHT,
    ACTION_UP,
    ACTION_UP_LEFT,
    ACTION_UP_RIGHT
} from "../tools/EyeActions";
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
        this.state = { size: props.size, eyeAction: '', visualHint: props.visualHint };
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
            this.stateSub.next({ action: STATE, data: this.props })
        }
    }

    componentWillUnmount() {
        unsubscribeIfCan(this.subscription);
        unsubscribeIfCan(this.exerciseSubscription);
    }

    render() {
        let padding = 20 * 2;
        let eyeSize = this.state.size.width > this.state.size.height ? this.state.size.height - padding : this.state.size.width - padding;
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
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_UP_RIGHT) {
            classNameEyeMove += ' moveUpRight'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_UP_LEFT) {
            classNameEyeMove += ' moveUpLeft'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_DOWN_LEFT) {
            classNameEyeMove += ' moveDownLeft'
        } else if (this.state.eyeAction && this.state.eyeAction === ACTION_DOWN_RIGHT) {
            classNameEyeMove += ' moveDownRight'
        }

        // Add visual hint classes for special exercises
        let visualHintClass = "";
        if (this.state.visualHint) {
            visualHintClass = ` visualHint-${this.state.visualHint}`;
        }

        return (
            <div className={"eyeHolder"} style={{ width: eyeSize, height: eyeSize / 2 }}>
                <div className="eyeContainer" style={{ width: eyeSize, height: eyeSize }}>
                    <div className={classNameEyeMove + visualHintClass + " eye eyeLeft"} />
                    <div className={classNameEyeMove + visualHintClass + " eye eyeRight"} />
                </div>
            </div>)
    };
}

export default Eyes;