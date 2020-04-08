import React from 'react';
import './Exercise.css';
import {connect} from "react-redux";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {exerciseLeftRight, startExercise} from "../tools/ExersiseUtils";
import {unsubscribeIfCan} from "../tools/rxTools";
import Eyes from "../components/Eyes";


const winSize = 'winSize';

class Exercise extends React.Component {
    stateSub = new Subject();
    resultDebounce = this.stateSub.pipe(debounceTime(300));
    subscription;
    exerciseSubscription;

    constructor(props) {
        super(props);

        this.state = {windowSize: props.windowSize};
        this.subscription = this.resultDebounce.subscribe(x => {
            if (x.action === winSize) {
                this.setState({windowSize: this.props.windowSize})
            }
        })
    }

    componentDidMount() {
        this.exerciseSubscription = startExercise(exerciseLeftRight).subscribe((x) => {
            if (x === 'terminate') {
                unsubscribeIfCan(this.exerciseSubscription);
            }
            this.setState({eyeAction: x})
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevState) !== JSON.stringify(this.props)) {
            this.stateSub.next({action: winSize, data: {windowSize: this.props.windowSize}})
        }
    }

    componentWillUnmount() {
        unsubscribeIfCan(this.subscription);
        unsubscribeIfCan(this.exerciseSubscription);
    }

    render() {
        return (
            <Eyes eyeAction={this.state.eyeAction} windowSize={this.state.windowSize}/>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        windowSize: state.windowSize,
    };
};

export default connect(
    mapStateToProps,
    null
)(Exercise);
