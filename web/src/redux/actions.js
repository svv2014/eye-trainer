import {
    SET_EXERCISE, SET_WINDOW_SIZE
} from "./actionTypes";

export const setExercise = data => ({
    type: SET_EXERCISE,
    payload: {
        data
    }
});


export const setWindowSize = data => ({
    type: SET_WINDOW_SIZE,
    payload: {
        data
    }
});