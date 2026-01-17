import {
    exerciseDelay,
    exerciseFinished,
    exerciseLeftRight, exerciseRoundLeft, exerciseRoundRight,
    exerciseUpDown,
    exerciseUpLeftDownRight, exerciseUpRightDownLeft,
    // Phase 1: New exercises
    exerciseFigure8Horizontal,
    exerciseFigure8Vertical,
    exerciseNearFar,
    exerciseZoom,
    exerciseAccommodation,
    exercisePalming,
    exerciseBlink,
    exerciseDistanceGaze,
    exerciseSlowCircleLeft,
    exerciseEyeRollComplete,
    calculateExerciseDuration,
    ACTIVITY_TYPE_EXERCISE
} from "../tools/ExerciseUtils";
import { strings } from "../languages/localizationStrings";

const firstSet = (repetitions) => {
    return [exerciseDelay(5, strings.getReady),
    exerciseLeftRight(repetitions),
    exerciseDelay(5, strings.blink),
    exerciseUpDown(repetitions),
    exerciseDelay(5, strings.blink),
    exerciseUpRightDownLeft(repetitions),
    exerciseDelay(5, strings.blink),
    exerciseUpLeftDownRight(repetitions),
    ];
}

const addFinish = (set) => {
    return [...set,
    exerciseFinished(strings.finishedForToday)];
}

export const beginner = addFinish(firstSet(5));

export const intermediate =
    addFinish([...firstSet(10),
    exerciseDelay(5, strings.blink),
    exerciseRoundLeft(2),
    exerciseDelay(5, strings.blink),
    exerciseRoundRight(2)
    ]);

export const advanced = addFinish([...firstSet(15),
exerciseDelay(5, strings.blink),
exerciseRoundLeft(5),
exerciseDelay(5, strings.blink),
exerciseRoundRight(5),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(8),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(5)
]);

export const advanced2 = addFinish([...firstSet(30),
exerciseDelay(20, strings.blink),
exerciseRoundLeft(10),
exerciseDelay(5, strings.blink),
exerciseRoundRight(10),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(10),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(10),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(8),
exerciseDelay(5, strings.blink),
exerciseEyeRollComplete(5)
]);

// New: Focus Training level - emphasizes accommodation and relaxation
export const focusTraining = addFinish([
exerciseDelay(5, strings.getReady),
exerciseNearFar(10),
exerciseDelay(5, strings.blink),
exerciseZoom(8),
exerciseDelay(5, strings.blink),
exerciseAccommodation(10),
exerciseDelay(5, strings.blink),
exerciseLeftRight(10),
exerciseDelay(5, strings.blink),
exerciseUpDown(10),
exercisePalming(5),
exerciseBlink(10),
exerciseDistanceGaze(5)
]);

// Calculate durations for each exercise set (in minutes)
export const exerciseDurations = {
    beginner: calculateExerciseDuration(beginner),
    intermediate: calculateExerciseDuration(intermediate),
    advanced: calculateExerciseDuration(advanced),
    advanced2: calculateExerciseDuration(advanced2),
    focusTraining: calculateExerciseDuration(focusTraining)
};

// Get exercise counts for each set (active exercises, not delays)
export const exerciseCounts = {
    beginner: beginner.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    intermediate: intermediate.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced: advanced.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced2: advanced2.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    focusTraining: focusTraining.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length
};
