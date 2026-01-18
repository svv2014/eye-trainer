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
    // Phase 2: Intermediate exercises
    exerciseSquareClockwise,
    exerciseSquareCounterClockwise,
    exerciseTriangle,
    exerciseStar,
    exercisePencilPushUp,
    exerciseBarrelCard,
    exerciseDotFusion,
    exerciseSlowCircleRight,
    exerciseSpiralOutward,
    exerciseSpiralInward,
    exerciseWavePattern,
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

// ===== PROGRESSIVE LEVELS (NEW) - Enhanced with Phase 1 exercises =====

// Progressive Easy: Basics + Figure-8 patterns + simple geometric patterns
export const progressiveEasy = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(8),
exerciseDelay(5, strings.blink),
exerciseUpDown(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(5),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(5),
exerciseDelay(5, strings.blink),
exerciseTriangle(5),
exerciseDelay(5, strings.blink),
exerciseSquareClockwise(5),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(3)
]);

// Progressive Medium: More variety with tracking, circles, and geometric patterns
export const progressiveMedium = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(12),
exerciseDelay(5, strings.blink),
exerciseUpDown(12),
exerciseDelay(5, strings.blink),
exerciseUpRightDownLeft(12),
exerciseDelay(5, strings.blink),
exerciseUpLeftDownRight(12),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(8),
exerciseDelay(5, strings.blink),
exerciseSquareClockwise(8),
exerciseDelay(5, strings.blink),
exerciseSquareCounterClockwise(8),
exerciseDelay(5, strings.blink),
exerciseTriangle(8),
exerciseDelay(5, strings.blink),
exerciseStar(6),
exerciseDelay(5, strings.blink),
exerciseRoundLeft(5),
exerciseDelay(5, strings.blink),
exerciseRoundRight(5),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(5),
exerciseDelay(5, strings.blink),
exerciseSlowCircleRight(5),
exerciseDelay(5, strings.blink),
exerciseWavePattern(8)
]);

// Progressive Tough: Full workout with Phase 1 and Phase 2 exercises
export const progressiveTough = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(15),
exerciseDelay(5, strings.blink),
exerciseUpDown(15),
exerciseDelay(5, strings.blink),
exerciseUpRightDownLeft(15),
exerciseDelay(5, strings.blink),
exerciseUpLeftDownRight(15),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(10),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(10),
exerciseDelay(5, strings.blink),
exerciseSquareClockwise(10),
exerciseDelay(5, strings.blink),
exerciseSquareCounterClockwise(10),
exerciseDelay(5, strings.blink),
exerciseTriangle(10),
exerciseDelay(5, strings.blink),
exerciseStar(8),
exerciseDelay(5, strings.blink),
exerciseWavePattern(10),
exerciseDelay(5, strings.blink),
exerciseSpiralOutward(8),
exerciseDelay(5, strings.blink),
exerciseSpiralInward(8),
exerciseDelay(5, strings.blink),
exerciseRoundLeft(8),
exerciseDelay(5, strings.blink),
exerciseRoundRight(8),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(8),
exerciseDelay(5, strings.blink),
exerciseSlowCircleRight(8),
exerciseDelay(5, strings.blink),
exerciseEyeRollComplete(5)
]);

// Focus & Relaxation: Specialized training for eye strain relief and convergence
export const focusRelaxation = addFinish([
exerciseDelay(5, strings.getReady),
exerciseNearFar(10),
exerciseDelay(5, strings.blink),
exerciseZoom(8),
exerciseDelay(5, strings.blink),
exerciseAccommodation(10),
exerciseDelay(5, strings.blink),
exercisePencilPushUp(8),
exerciseDelay(5, strings.blink),
exerciseBarrelCard(8),
exerciseDelay(5, strings.blink),
exerciseDotFusion(10),
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
    // Basics Group
    beginner: calculateExerciseDuration(beginner),
    intermediate: calculateExerciseDuration(intermediate),
    advanced: calculateExerciseDuration(advanced),
    advanced2: calculateExerciseDuration(advanced2),
    // Progressive Group
    progressiveEasy: calculateExerciseDuration(progressiveEasy),
    progressiveMedium: calculateExerciseDuration(progressiveMedium),
    progressiveTough: calculateExerciseDuration(progressiveTough),
    // Specialized Group
    focusRelaxation: calculateExerciseDuration(focusRelaxation)
};

// Get exercise counts for each set (active exercises, not delays)
export const exerciseCounts = {
    // Basics Group
    beginner: beginner.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    intermediate: intermediate.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced: advanced.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    advanced2: advanced2.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    // Progressive Group
    progressiveEasy: progressiveEasy.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    progressiveMedium: progressiveMedium.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    progressiveTough: progressiveTough.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    // Specialized Group
    focusRelaxation: focusRelaxation.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length
};

// Exercise groups for accordion UI
export const exerciseGroups = {
    basics: {
        name: 'basics',
        displayName: strings.groupBasics || 'Basics',
        description: strings.groupBasicsDesc || 'Original difficulty levels',
        levels: [
            { key: 'beginner', name: strings.easy, exercises: beginner },
            { key: 'intermediate', name: strings.medium, exercises: intermediate },
            { key: 'advanced', name: strings.tough, exercises: advanced },
            { key: 'advanced2', name: 'Tough x2', exercises: advanced2 }
        ]
    },
    progressive: {
        name: 'progressive',
        displayName: strings.groupProgressive || 'Progressive',
        description: strings.groupProgressiveDesc || 'Enhanced workouts with advanced tracking',
        levels: [
            { key: 'progressiveEasy', name: strings.progressiveEasy || 'Progressive Easy', exercises: progressiveEasy },
            { key: 'progressiveMedium', name: strings.progressiveMedium || 'Progressive Medium', exercises: progressiveMedium },
            { key: 'progressiveTough', name: strings.progressiveTough || 'Progressive Tough', exercises: progressiveTough }
        ]
    },
    specialized: {
        name: 'specialized',
        displayName: strings.groupSpecialized || 'Specialized',
        description: strings.groupSpecializedDesc || 'Targeted training for specific needs',
        levels: [
            { key: 'focusRelaxation', name: strings.focusRelaxation || 'Focus & Relaxation', exercises: focusRelaxation }
        ]
    }
};
