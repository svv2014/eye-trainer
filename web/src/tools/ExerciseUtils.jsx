import { of, ReplaySubject } from "rxjs";
import { concatMap, delay } from "rxjs/operators";
import {
    ACTION_CENTER,
    ACTION_DOWN,
    ACTION_LEFT,
    ACTION_RELAX,
    ACTION_RIGHT,
    ACTION_UP,
    ACTION_UP_RIGHT,
    ACTION_DOWN_LEFT,
    ACTION_UP_LEFT, ACTION_DOWN_RIGHT
} from "./EyeActions";
import { strings } from "../languages/localizationStrings";

export const ACTIVITY_TYPE_EXERCISE = "exercise"
export const ACTIVITY_TYPE_DELAY = "delay"
export const ACTIVITY_TYPE_FINISH = "finish"


export const exerciseLeftRight = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.leftRight,
        delay: 700,
        moves: [ACTION_LEFT, ACTION_CENTER, ACTION_RIGHT, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseUpDown = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10;
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.upAndDown,
        delay: 700,
        moves: [ACTION_UP, ACTION_CENTER, ACTION_DOWN, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseDelay = (delay, message) => {
    return {
        type: ACTIVITY_TYPE_DELAY,
        name: message,
        delay: 1000,
        moves: [ACTION_CENTER],
        repeat: delay
    }
}


export const exerciseFinished = (message) => {
    return {
        type: ACTIVITY_TYPE_FINISH,
        name: message,
        delay: 1000,
        moves: [ACTION_RELAX],
        repeat: 1
    }
}

export const exerciseUpRightDownLeft = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.upRight + " <-> " + strings.downLeft,
        delay: 700,
        moves: [ACTION_UP_RIGHT, ACTION_CENTER, ACTION_DOWN_LEFT, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseUpLeftDownRight = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.upLeft + " <-> " + strings.downRight,
        delay: 700,
        moves: [ACTION_UP_LEFT, ACTION_CENTER, ACTION_DOWN_RIGHT, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseRoundLeft = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.circleLeft,
        delay: 500,
        moves: [ACTION_UP, ACTION_UP_LEFT, ACTION_LEFT, ACTION_DOWN_LEFT,
            ACTION_DOWN, ACTION_DOWN_RIGHT, ACTION_RIGHT, ACTION_UP_RIGHT,
            ACTION_UP, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseRoundRight = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.circleRight,
        delay: 500,
        moves: [ACTION_UP, ACTION_UP_RIGHT, ACTION_RIGHT, ACTION_DOWN_RIGHT,
            ACTION_DOWN, ACTION_DOWN_LEFT, ACTION_LEFT, ACTION_UP_LEFT,
            ACTION_UP, ACTION_CENTER],
        repeat: repeats
    }
};

export const delayCounter = (delaySeconds) => {
    console.log("delay: ", delaySeconds);
    let replaySubject = new ReplaySubject();
    let mapDelay = replaySubject.pipe(concatMap(i => of(i).pipe(delay(1000))));

    for (let i = delaySeconds; i > -1; i--) {
        replaySubject.next({ count: i });
    }
    replaySubject.complete();
    return mapDelay;
}

/**
 * Calculate the total duration of an exercise set in minutes.
 * Each activity's duration = delay * moves.length * repeat
 * @param {Array} activities - Array of exercise activity objects
 * @returns {number} Total duration in minutes (rounded)
 */
export const calculateExerciseDuration = (activities) => {
    const totalMs = activities.reduce((sum, activity) => {
        return sum + (activity.delay * activity.moves.length * activity.repeat);
    }, 0);
    return Math.round(totalMs / 60000); // Convert to minutes
};

export const startExercise = (exercise, startFrom) => {
    console.log("start: ", exercise);
    let replaySubject = new ReplaySubject();
    let mapDelay = replaySubject.pipe(concatMap(i => of(i).pipe(delay(exercise.delay))));

    if (exercise.type === ACTIVITY_TYPE_EXERCISE) {
        for (let i = 0; i < exercise.repeat; i++) {
            for (let x of exercise.moves) {
                if (startFrom && startFrom.id !== undefined && !isNaN(startFrom.id)) {
                    if (startFrom.id >= i) {
                        replaySubject.next({ id: i, exercise: x });
                    }
                } else {
                    replaySubject.next({ id: i, exercise: x });
                }
            }
        }
    }
    // reverse id for DELAY
    else if (exercise.type === ACTIVITY_TYPE_DELAY) {
        for (let i = exercise.repeat; i > -1; i--) {
            for (let x of exercise.moves) {
                if (startFrom && startFrom.id !== undefined && !isNaN(startFrom.id)) {
                    if (startFrom.id <= i) {
                        replaySubject.next({ id: i, exercise: x });
                    }
                } else {
                    replaySubject.next({ id: i, exercise: x });
                }
            }
        }
    }

    replaySubject.complete();

    return mapDelay;
}