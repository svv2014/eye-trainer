import {createStore} from "redux";
import rootReducer from "./reducers";
import {saveState, loadState} from "../tools/localStorage";
import throttle from "lodash/throttle"
//load localState
let persistedState = loadState();

let store = createStore(rootReducer, persistedState);
export default store;

store.subscribe(throttle(() => {
    saveState({
        userState: store.getState().userState
    })
}, 500));
