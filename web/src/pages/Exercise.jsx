import React from 'react';
import './Exercise.css';
import {connect} from "react-redux";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {exerciseLeftRight, startExercise} from "../tools/ExersiseUtils";
import {unsubscribeIfCan} from "../tools/rxTools";
import Eyes from "../components/Eyes";
import PauseButton from "../components/PauseButton";
import KeyboardEventHandler from 'react-keyboard-event-handler';

const winSize = 'winSize';

class Exercise extends React.Component {
    stateSub = new Subject();
    resultDebounce = this.stateSub.pipe(debounceTime(300));
    subscription;
    exerciseSubscription;
    play = true;
    currentExerciseSet;

    constructor(props) {
        super(props);

        this.state = {
            windowSize: props.windowSize,
            play: this.play,
            currentExercise: undefined
        };
        this.subscription = this.resultDebounce.subscribe(x => {
            if (x.action === winSize) {
                this.setState({windowSize: this.props.windowSize})
            }
        })
    }

    componentDidMount() {
        this.startExercise(exerciseLeftRight);
    }

    startExercise(exercise, lastPosition) {
        console.log('exercise, lastPosition', {exercise: exercise, lastPosition: lastPosition});
        unsubscribeIfCan(this.exerciseSubscription);
        this.currentExerciseSet = exercise;
        this.setState({currentExerciseSet: exercise});
        this.exerciseSubscription = startExercise(exercise, lastPosition).subscribe((x) => {
            if (x === 'terminate') {
                this.changePlayState(false);
            }
            this.setState({
                eyeAction: x.exercise,
                currentExercise: x
            });
        }, undefined, () => {
            unsubscribeIfCan(this.exerciseSubscription);
            this.changePlayState(false);
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

    onPlayButtonChange = (playButtonState) => {
        this.changePlayState(!playButtonState);
    }

    changePlayState = (play) => {
        if (play !== undefined) {
            this.play = play;
        } else {
            this.play = !this.play;
        }
        this.setState({play: this.play});
        if (!this.play) {
            unsubscribeIfCan(this.exerciseSubscription);
        } else {
            let lastPosition = this.state.currentExercise?.id === this.currentExerciseSet?.repeat ? undefined : this.state.currentExercise;
            this.startExercise(this.currentExerciseSet, lastPosition);
        }
    }

    keyPressed = (key) => {
        this.changePlayState();
    }

    render() {
        let done = this.state?.currentExercise?.id === this.state.currentExerciseSet?.repeat - 1;
        let status = done ? 'Done' : '' + this.state.currentExercise?.id + '/' + this.state.currentExerciseSet?.repeat;
        return (
            <div className={"exerciseContainer"}>
                <div className={"currentStep"}>{this.state.currentExerciseSet?.name}: {status} </div>
                <Eyes eyeAction={this.state.eyeAction} size={this.state.windowSize}/>
                <PauseButton onStateChage={this.onPlayButtonChange} play={this.state.play}/>
                <KeyboardEventHandler
                    handleKeys={['space']}
                    onKeyEvent={this.keyPressed}/>

            </div>
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
