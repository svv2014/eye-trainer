/**
 * Google Analytics event tracking utility.
 * Provides a clean API for tracking custom events throughout the app.
 * Only sends events if gtag is available (analytics is configured).
 */

// Check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

/**
 * Send a custom event to Google Analytics
 * @param {string} eventName - The name of the event
 * @param {object} params - Additional parameters for the event
 */
export const trackEvent = (eventName, params = {}) => {
    if (isGtagAvailable()) {
        window.gtag('event', eventName, params);
    }
};

// ============ Exercise Events ============

/**
 * Track when a user starts an exercise
 * @param {string} difficulty - Exercise difficulty level (beginner, intermediate, advanced, advanced2)
 */
export const trackExerciseStart = (difficulty) => {
    trackEvent('exercise_start', {
        event_category: 'exercise',
        event_label: difficulty,
        difficulty_level: difficulty
    });
};

/**
 * Track when a user completes an exercise
 * @param {string} difficulty - Exercise difficulty level
 * @param {number} durationSeconds - How long the exercise took
 */
export const trackExerciseComplete = (difficulty, durationSeconds) => {
    trackEvent('exercise_complete', {
        event_category: 'exercise',
        event_label: difficulty,
        difficulty_level: difficulty,
        duration_seconds: durationSeconds
    });
};

/**
 * Track when a user pauses an exercise
 * @param {string} difficulty - Exercise difficulty level
 * @param {string} exerciseName - Name of the current exercise
 */
export const trackExercisePause = (difficulty, exerciseName) => {
    trackEvent('exercise_pause', {
        event_category: 'exercise',
        event_label: difficulty,
        exercise_name: exerciseName
    });
};

/**
 * Track when a user resumes an exercise
 * @param {string} difficulty - Exercise difficulty level
 */
export const trackExerciseResume = (difficulty) => {
    trackEvent('exercise_resume', {
        event_category: 'exercise',
        event_label: difficulty
    });
};

/**
 * Track when a user abandons (leaves) an exercise before completion
 * @param {string} difficulty - Exercise difficulty level
 * @param {string} exerciseName - Name of the exercise when abandoned
 * @param {number} progressPercent - Approximate progress percentage when abandoned
 */
export const trackExerciseAbandon = (difficulty, exerciseName, progressPercent) => {
    trackEvent('exercise_abandon', {
        event_category: 'exercise',
        event_label: difficulty,
        exercise_name: exerciseName,
        progress_percent: progressPercent
    });
};

// ============ Self-Test Events ============

/**
 * Track when a user starts the self-test
 */
export const trackSelfTestStart = () => {
    trackEvent('self_test_start', {
        event_category: 'self_test'
    });
};

/**
 * Track when a user completes the self-test
 * @param {string} result - Test result or score
 */
export const trackSelfTestComplete = (result) => {
    trackEvent('self_test_complete', {
        event_category: 'self_test',
        event_label: result
    });
};

// ============ Preference Events ============

/**
 * Track theme toggle
 * @param {string} newTheme - The theme switched to ('dark' or 'light')
 */
export const trackThemeChange = (newTheme) => {
    trackEvent('theme_change', {
        event_category: 'preferences',
        event_label: newTheme,
        theme: newTheme
    });
};

/**
 * Track audio toggle
 * @param {boolean} enabled - Whether audio is now enabled
 */
export const trackAudioToggle = (enabled) => {
    trackEvent('audio_toggle', {
        event_category: 'preferences',
        event_label: enabled ? 'enabled' : 'disabled',
        audio_enabled: enabled
    });
};

/**
 * Track language change
 * @param {string} language - The language code switched to
 */
export const trackLanguageChange = (language) => {
    trackEvent('language_change', {
        event_category: 'preferences',
        event_label: language,
        language: language
    });
};

// ============ Navigation Events ============

/**
 * Track CTA button clicks
 * @param {string} ctaName - Name/identifier of the CTA
 * @param {string} location - Where on the page the CTA is located
 */
export const trackCtaClick = (ctaName, location) => {
    trackEvent('cta_click', {
        event_category: 'navigation',
        event_label: ctaName,
        cta_location: location
    });
};

export default {
    trackEvent,
    trackExerciseStart,
    trackExerciseComplete,
    trackExercisePause,
    trackExerciseResume,
    trackExerciseAbandon,
    trackSelfTestStart,
    trackSelfTestComplete,
    trackThemeChange,
    trackAudioToggle,
    trackLanguageChange,
    trackCtaClick
};
