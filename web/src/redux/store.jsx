import {createStore} from "redux";
import rootReducer from "./reducers";
import {saveState, loadState} from "../tools/localStorage";
import throttle from "lodash/throttle"
import {setWindowSize} from "./actions";
//load localState
let persistedState = loadState();

let store = createStore(rootReducer, persistedState);
export default store;

store.subscribe(throttle(() => {
    saveState({
        userState: store.getState().userState
    })
}, 500));



function handleResize() {
    store.dispatch(setWindowSize({height:window.innerHeight,width:window.innerWidth}));
}

window.addEventListener('resize', handleResize);

//init current size
store.dispatch(setWindowSize({height:window.innerHeight,width:window.innerWidth}));
