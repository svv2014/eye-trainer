import {of, ReplaySubject} from "rxjs";
import {concatMap, delay} from "rxjs/operators";
import {ACTION_CENTER, ACTION_LEFT, ACTION_RIGHT} from "./EyeActions";


export const exerciseLeftRight = {
    name: "Left <-> Right",
    delay: 700,
    moves: [ACTION_LEFT, ACTION_CENTER, ACTION_RIGHT, ACTION_CENTER],
    repeat: 10
};


export const startExercise = (exercise,startFrom) => {
    console.log("start: ", exercise);
    let moves = new ReplaySubject();
    let movesPipe = moves.pipe(concatMap(i => of(i).pipe(delay(exercise.delay))));

    for (let i = 0; i < exercise.repeat; i++) {
        for (let x of exercise.moves) {
            if (startFrom && startFrom.id !== undefined && !isNaN(startFrom.id)) {
                if (startFrom.id >= i) {
                    moves.next({id: i, exercise: x});
                }
            } else {
                moves.next({id: i, exercise: x});
            }
        }
    }
    moves.complete();

    return movesPipe;
}