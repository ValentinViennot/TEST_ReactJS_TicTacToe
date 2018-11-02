import { State } from './types';

const players: State[] = [State.TAC, State.TOE];

export const getClassNameFromState = (state: State): string => {
    switch (state) {
        case State.TIC:
            return "tic";
        case State.TAC:
            return "tac";
        default:
            return "toe";
    }
}

export const getClassNameFromPlayer = (player: number): string => {
    return getClassNameFromState(getStateFromPlayer(player));
}

export const getPlayerFromState = (state: State): number => {
    return players.indexOf(state);
}

export const getStateFromPlayer = (player: number): State => {
    return players[player];
}