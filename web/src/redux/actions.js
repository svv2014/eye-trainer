import {
    SET_EXERCISE
} from "./actionTypes";

export const setExercise = data => ({
    type: SET_EXERCISE,
    payload: {
        data
    }
});