const eyesTrainerState = 'eyesTrainer';
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
