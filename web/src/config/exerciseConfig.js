import {
    exerciseDelay,
    exerciseFinished,
    exerciseLeftRight, exerciseRoundLeft, exerciseRoundRight,
    exerciseUpDown,
    exerciseUpLeftDownRight, exerciseUpRightDownLeft,
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
exerciseRoundRight(5)
]);

export const advanced2 = addFinish([...firstSet(30),
exerciseDelay(20, strings.blink),
exerciseRoundLeft(10),
exerciseDelay(5, strings.blink),
exerciseRoundRight(10)
]);

// Calculate durations for each exercise set (in minutes)
export const exerciseDurations = {
    beginner: calculateExerciseDuration(beginner),
    intermediate: calculateExerciseDuration(intermediate),
    advanced: calculateExerciseDuration(advanced),
    advanced2: calculateExerciseDuration(advanced2)
};

// Get exercise counts for each set (active exercises, not delays)
export const exerciseCounts = {
    beginner: beginner.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    intermediate: intermediate.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced: advanced.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced2: advanced2.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length
};
