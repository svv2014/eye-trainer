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

// ===== PHASE 1: NEW EXERCISES (Advanced Tracking) =====

export const exerciseFigure8Horizontal = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.figure8Horizontal,
        delay: 800,
        moves: [ACTION_CENTER, ACTION_UP_LEFT, ACTION_LEFT, ACTION_DOWN_LEFT,
            ACTION_CENTER, ACTION_UP_RIGHT, ACTION_RIGHT, ACTION_DOWN_RIGHT, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseFigure8Vertical = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.figure8Vertical,
        delay: 800,
        moves: [ACTION_CENTER, ACTION_UP_LEFT, ACTION_UP, ACTION_UP_RIGHT,
            ACTION_CENTER, ACTION_DOWN_LEFT, ACTION_DOWN, ACTION_DOWN_RIGHT, ACTION_CENTER],
        repeat: repeats
    }
};

// ===== PHASE 1: NEW EXERCISES (Focus & Accommodation) =====

export const exerciseNearFar = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.nearFarFocus,
        delay: 2000, // Slower to allow focus change
        moves: [ACTION_CENTER], // Will be enhanced with visual zoom
        repeat: repeats,
        visualHint: 'zoom' // Hint for Eyes.jsx to show zoom effect
    }
};

export const exerciseZoom = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.zoomInOut,
        delay: 1500,
        moves: [ACTION_CENTER],
        repeat: repeats,
        visualHint: 'pulse' // Gradual size change
    }
};

export const exerciseAccommodation = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.accommodationTraining,
        delay: 1000, // Rapid transitions
        moves: [ACTION_CENTER],
        repeat: repeats,
        visualHint: 'rapidZoom' // Quick near-far-near
    }
};

// ===== PHASE 1: NEW EXERCISES (Relaxation) =====

export const exercisePalming = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 5
    return {
        type: ACTIVITY_TYPE_DELAY,
        name: strings.palmingRest,
        delay: 1000,
        moves: [ACTION_RELAX],
        repeat: repeats // 5 seconds rest
    }
};

export const exerciseBlink = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.blinkExercise,
        delay: 1000,
        moves: [ACTION_CENTER],
        repeat: repeats,
        visualHint: 'blink' // Signal for blink animation
    }
};

export const exerciseDistanceGaze = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 5
    return {
        type: ACTIVITY_TYPE_DELAY,
        name: strings.distanceGaze,
        delay: 1000,
        moves: [ACTION_RELAX],
        repeat: repeats // Hold gaze for 5 seconds
    }
};

// ===== PHASE 1: NEW EXERCISES (Smooth Pursuit) =====

export const exerciseSlowCircleLeft = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 10
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.slowCircleLeft,
        delay: 1000, // 2x slower than regular circle
        moves: [ACTION_UP, ACTION_UP_LEFT, ACTION_LEFT, ACTION_DOWN_LEFT,
            ACTION_DOWN, ACTION_DOWN_RIGHT, ACTION_RIGHT, ACTION_UP_RIGHT,
            ACTION_UP, ACTION_CENTER],
        repeat: repeats
    }
};

export const exerciseEyeRollComplete = (repeat) => {
    let repeats = repeat !== undefined ? repeat : 5
    return {
        type: ACTIVITY_TYPE_EXERCISE,
        name: strings.eyeRollComplete,
        delay: 1200, // Very slow for complete rotation
        moves: [ACTION_UP, ACTION_UP_RIGHT, ACTION_RIGHT, ACTION_DOWN_RIGHT,
            ACTION_DOWN, ACTION_DOWN_LEFT, ACTION_LEFT, ACTION_UP_LEFT,
            ACTION_UP, ACTION_DOWN, ACTION_CENTER], // Full cycle
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