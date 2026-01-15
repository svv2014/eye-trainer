const eyesTrainerState = 'eyesTrainer';
const themeKey = 'eyesTrainer_theme';
const audioKey = 'eyesTrainer_audio';

export const loadState = () => {
    try {
        let appState = localStorage.getItem(eyesTrainerState);
        if (appState === null) {
            return undefined
        }
        return JSON.parse(appState);
    } catch (e) {
        console.error('Can\'t load state', e)
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(eyesTrainerState,serializedState);
    } catch (e) {
        console.error('Can\'t save state', e)
    }
};

// Theme preference (dark/light)
export const getTheme = () => {
    try {
        const theme = localStorage.getItem(themeKey);
        if (theme === null) {
            // Check system preference for first-time visitors
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
            return 'dark';
        }
        return theme;
    } catch (e) {
        console.error('Can\'t load theme', e);
        return 'dark';
    }
};

export const setTheme = (theme) => {
    try {
        localStorage.setItem(themeKey, theme);
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
        console.error('Can\'t save theme', e);
    }
};

export const applyTheme = () => {
    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

// Audio preference (enabled/disabled)
export const getAudioEnabled = () => {
    try {
        const audio = localStorage.getItem(audioKey);
        // Default to disabled (user must opt-in)
        return audio === 'true';
    } catch (e) {
        console.error('Can\'t load audio preference', e);
        return false;
    }
};

export const setAudioEnabled = (enabled) => {
    try {
        localStorage.setItem(audioKey, enabled ? 'true' : 'false');
    } catch (e) {
        console.error('Can\'t save audio preference', e);
    }
};
