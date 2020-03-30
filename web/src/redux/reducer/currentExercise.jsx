import {SET_EXERCISE} from "../actionTypes";

const initialState = {};

const currentExercise = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXERCISE: {
            return action.payload.data;
        }
        default: {
            return state;
        }
    }
};

export default currentExercise;