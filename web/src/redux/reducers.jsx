import { combineReducers } from "redux";
import currentExercise from "./reducer/currentExercise";
import windowSize from "./reducer/windowSize";
export default combineReducers({ currentExercise, windowSize });
