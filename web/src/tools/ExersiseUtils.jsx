import {of, ReplaySubject} from "rxjs";
import {concatMap, delay} from "rxjs/operators";
import {ACTION_CENTER, ACTION_LEFT, ACTION_RIGHT} from "./EyeActions";


export const exerciseLeftRight = {
    delay: 700,
    moves: [ACTION_LEFT, ACTION_CENTER, ACTION_RIGHT, ACTION_CENTER],
    repeat: 10
};


export const startExercise = (exercise) => {
    console.log("start: ", exercise);
    let moves = new ReplaySubject();
    let movesPipe = moves.pipe(concatMap(i => of(i).pipe(delay(exercise.delay))));

    for (let i = 0; i < exercise.repeat; i++) {
        for (let x of exercise.moves) {
            moves.next(x);
        }
    }
    moves.next('x');

    return movesPipe;
}