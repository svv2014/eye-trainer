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

// ===== PROGRESSIVE LEVELS (NEW) - Balanced workouts with 6-8 exercises =====

// Progressive Easy: Basics + Figure-8 patterns (6 exercises)
export const progressiveEasy = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(8),
exerciseDelay(5, strings.blink),
exerciseUpDown(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(6),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(6),
exerciseDelay(5, strings.blink),
exerciseTriangle(5),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(5)
]);

// Progressive Medium: Diagonal tracking + geometric patterns (7 exercises)
export const progressiveMedium = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(10),
exerciseDelay(5, strings.blink),
exerciseUpDown(10),
exerciseDelay(5, strings.blink),
exerciseUpRightDownLeft(10),
exerciseDelay(5, strings.blink),
exerciseUpLeftDownRight(10),
exerciseDelay(5, strings.blink),
exerciseSquareClockwise(8),
exerciseDelay(5, strings.blink),
exerciseStar(6),
exerciseDelay(5, strings.blink),
exerciseRoundLeft(6)
]);

// Progressive Tough: Advanced tracking with spirals (8 exercises)
export const progressiveTough = addFinish([
exerciseDelay(5, strings.getReady),
exerciseLeftRight(12),
exerciseDelay(5, strings.blink),
exerciseUpDown(12),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(10),
exerciseDelay(5, strings.blink),
exerciseSquareCounterClockwise(10),
exerciseDelay(5, strings.blink),
exerciseWavePattern(10),
exerciseDelay(5, strings.blink),
exerciseSpiralOutward(8),
exerciseDelay(5, strings.blink),
exerciseRoundRight(8),
exerciseDelay(5, strings.blink),
exerciseEyeRollComplete(5)
]);

// ===== SPECIALIZED WORKOUTS (NEW) - Focused training sessions =====

// Focus & Relaxation: Eye strain relief and accommodation (6 exercises)
export const focusRelaxation = addFinish([
exerciseDelay(5, strings.getReady),
exerciseNearFar(8),
exerciseDelay(5, strings.blink),
exerciseZoom(6),
exerciseDelay(5, strings.blink),
exerciseAccommodation(8),
exercisePalming(5),
exerciseBlink(8),
exerciseDistanceGaze(5)
]);

// Convergence Training: Exercises for eye coordination (6 exercises)
export const convergenceTraining = addFinish([
exerciseDelay(5, strings.getReady),
exercisePencilPushUp(8),
exerciseDelay(5, strings.blink),
exerciseBarrelCard(8),
exerciseDelay(5, strings.blink),
exerciseDotFusion(10),
exerciseDelay(5, strings.blink),
exerciseLeftRight(10),
exerciseDelay(5, strings.blink),
exerciseUpDown(10),
exerciseDelay(5, strings.blink),
exerciseBlink(5)
]);

// Geometric Patterns: Shape tracking for precision (7 exercises)
export const geometricPatterns = addFinish([
exerciseDelay(5, strings.getReady),
exerciseTriangle(8),
exerciseDelay(5, strings.blink),
exerciseSquareClockwise(8),
exerciseDelay(5, strings.blink),
exerciseSquareCounterClockwise(8),
exerciseDelay(5, strings.blink),
exerciseStar(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Horizontal(8),
exerciseDelay(5, strings.blink),
exerciseFigure8Vertical(8),
exerciseDelay(5, strings.blink),
exerciseWavePattern(8)
]);

// Smooth Pursuit: Circular and flowing movements (6 exercises)
export const smoothPursuit = addFinish([
exerciseDelay(5, strings.getReady),
exerciseRoundLeft(8),
exerciseDelay(5, strings.blink),
exerciseRoundRight(8),
exerciseDelay(5, strings.blink),
exerciseSlowCircleLeft(8),
exerciseDelay(5, strings.blink),
exerciseSlowCircleRight(8),
exerciseDelay(5, strings.blink),
exerciseSpiralOutward(8),
exerciseDelay(5, strings.blink),
exerciseSpiralInward(8)
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
    focusRelaxation: calculateExerciseDuration(focusRelaxation),
    convergenceTraining: calculateExerciseDuration(convergenceTraining),
    geometricPatterns: calculateExerciseDuration(geometricPatterns),
    smoothPursuit: calculateExerciseDuration(smoothPursuit)
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
    focusRelaxation: focusRelaxation.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    convergenceTraining: convergenceTraining.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    geometricPatterns: geometricPatterns.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length,
    smoothPursuit: smoothPursuit.filter(e => e.type === ACTIVITY_TYPE_EXERCISE).length
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
            { key: 'focusRelaxation', name: strings.focusRelaxation || 'Focus & Relaxation', exercises: focusRelaxation },
            { key: 'convergenceTraining', name: strings.convergenceTraining || 'Convergence Training', exercises: convergenceTraining },
            { key: 'geometricPatterns', name: strings.geometricPatterns || 'Geometric Patterns', exercises: geometricPatterns },
            { key: 'smoothPursuit', name: strings.smoothPursuit || 'Smooth Pursuit', exercises: smoothPursuit }
        ]
    }
};
