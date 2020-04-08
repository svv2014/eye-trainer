import {SET_WINDOW_SIZE} from "../actionTypes";

const initialState = {height:0,width:0};

const windowSize = (state = initialState, action) => {
    switch (action.type) {
        case SET_WINDOW_SIZE: {
            return action.payload.data;
        }
        default: {
            return state;
        }
    }
};

export default windowSize;