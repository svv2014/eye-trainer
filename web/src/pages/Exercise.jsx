import React from 'react';
import './Exercise.css';
import './Animate.css';
import {connect} from "react-redux";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {
    ACTIVITY_TYPE_DELAY,
    ACTIVITY_TYPE_EXERCISE, ACTIVITY_TYPE_FINISH,
    startExercise
} from "../tools/ExerciseUtils";
import {unsubscribeIfCan} from "../tools/rxTools";
import Eyes from "../components/Eyes";
import PauseButton from "../components/PauseButton";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {strings} from "../languages/localizationStrings";
import audioGuide from "../tools/AudioGuide";
import {getAudioEnabled} from "../tools/localStorage";


const winSize = 'winSize';

class Exercise extends React.Component {
    stateSub = new Subject();
    resultDebounce = this.stateSub.pipe(debounceTime(300));
    subscription;
    exerciseSubscription;
    play = true;
    currentExerciseSet;
    lastSpokenDelay = null;

    constructor(props) {
        super(props);

        this.state = {
            windowSize: props.windowSize,
            play: this.play,
            currentExercise: undefined,
            exercises: props.activities,
            startDelay: props.startDelay
        };
        this.subscription = this.resultDebounce.subscribe(x => {
            if (x.action === winSize) {
                this.setState({windowSize: this.props.windowSize})
            }
        })
    }

    componentDidMount() {
        // Sync audio enabled state
        audioGuide.setEnabled(getAudioEnabled());
        // Start ambient background music
        audioGuide.startAmbient();
        this.playNext();
    }

    playNext() {
        console.log("Play next current set: ", this.currentExerciseSet)
        unsubscribeIfCan(this.exerciseSubscription);
        if (!this.currentExerciseSet) {
            this.startSet(0);
        } else {
            for (let i = 0; i < this.state.exercises.length; i++) {
                if (i === this.currentSetId + 1) {
                    this.startSet(i);
                    return;
                }
            }
        }
    }

    startSet(setId) {
        console.log("start set", setId)
        this.currentSetId = setId;
        let next = this.state.exercises.length > setId + 1 ? this.state.exercises[setId + 1] : undefined;
        let currentSet = this.state.exercises[setId];

        // Reset audio guide state for new exercise
        audioGuide.resetLastAction();
        this.lastSpokenDelay = null;

        // Announce exercise name for EXERCISE type, or special messages for other types
        if (currentSet.type === ACTIVITY_TYPE_EXERCISE) {
            audioGuide.speakExerciseName(currentSet.name);
        } else if (currentSet.type === ACTIVITY_TYPE_DELAY) {
            // Speak blink or get ready message
            if (currentSet.name === strings.blink) {
                audioGuide.speakBlink();
            } else if (currentSet.name === strings.getReady) {
                audioGuide.speakGetReady();
            }
        } else if (currentSet.type === ACTIVITY_TYPE_FINISH) {
            audioGuide.speakCompletion();
        }

        this.setState({
            currentExerciseSet: currentSet,
            nextExerciseSet: next,
            currentExercise: undefined
        });

        this.startExercise(this.state.exercises[setId])
    }

    startExercise(exercise, lastPosition) {
        console.log('exercise, lastPosition', {exercise: exercise, lastPosition: lastPosition});
        unsubscribeIfCan(this.exerciseSubscription);
        this.currentExerciseSet = exercise;
        this.setState({
            currentExerciseSet: exercise,
            currentExercise: lastPosition
        });
        this.exerciseSubscription = startExercise(exercise, lastPosition).subscribe((x) => {
                // Play direction tone for exercise movements
                if (exercise.type === ACTIVITY_TYPE_EXERCISE) {
                    audioGuide.playDirection(x.exercise);
                }
                // For delay countdowns, play beeps
                else if (exercise.type === ACTIVITY_TYPE_DELAY && x.id !== this.lastSpokenDelay) {
                    // Play beep at 5, 3, 2, 1
                    if (x.id <= 5 && x.id > 0 && (x.id === 5 || x.id <= 3)) {
                        audioGuide.playCountdownBeep(x.id);
                        this.lastSpokenDelay = x.id;
                    }
                }

                this.setState({
                    eyeAction: x.exercise,
                    currentExercise: x
                });
            },
            (e) => console.error('Error on exercise: ', e),
            () => {
                setTimeout(() => {
                    this.playNext();
                }, 0);
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
        // Stop audio when leaving
        audioGuide.cancel();
        audioGuide.stopAmbient();
    }

    onPlayButtonChange = (playButtonState) => {
        this.changePlayState(!playButtonState);
    }

    changePlayState = (play) => {
        console.log("change Play State: ", play)
        if (play !== undefined) {
            this.play = play;
        } else {
            this.play = !this.play;
        }
        this.setState({play: this.play});
        if (!this.play) {
            unsubscribeIfCan(this.exerciseSubscription);
            // Cancel speech when paused
            audioGuide.cancel();
        } else {
            let lastPosition = this.state.currentExercise?.id === this.currentExerciseSet?.repeat ? undefined : this.state.currentExercise;
            this.startExercise(this.currentExerciseSet, lastPosition);
        }
    }

    keyPressed = (key) => {
        this.changePlayState();
    }

    render() {

        let count = this.state.currentExercise?.id === undefined ? 1 : this.state.currentExercise.id + 1;
        let delay = this.state.currentExercise?.id === undefined ? this.state.currentExerciseSet?.repeat : this.state.currentExercise.id;
        let status = '' + count + '/' + this.state.currentExerciseSet?.repeat;
        let displayCount = <div className={"displayCount"}>{this.state.delayCount}</div>;
        let next = <div className={"displayNext"}>{strings.next + ": "} {this.state.nextExerciseSet?.name}</div>;

        return (
            <div className={"exerciseContainer"}>
                {this.state.delayCount !== undefined &&
                displayCount
                }

                {this.state.currentExerciseSet?.type === ACTIVITY_TYPE_DELAY &&
                <div className={"displayCount"}>{this.state.currentExerciseSet?.name} {delay}</div>
                }

                {this.state.currentExerciseSet?.type === ACTIVITY_TYPE_FINISH &&
                <div className={"displayCount"}>{this.state.currentExerciseSet?.name}</div>
                }

                {this.state.currentExerciseSet &&
                this.state.currentExerciseSet?.type === ACTIVITY_TYPE_EXERCISE &&
                <div className={"statusHolder"}>
                    <div className={"currentStep"}>{this.state.currentExerciseSet?.name}</div>
                    <div className={"currentStep"}>{status}</div>
                </div>
                }
                {next}

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
