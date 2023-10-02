export const ActionTypes = {
  GAME_START: 'GAME_START',
  GAME_END: 'GAME_END',
  UPDATE_PAST_SCORE: 'UPDATE_PAST_SCORE',
  SET_HIGH_SCORE: 'SET_HIGH_SCORE',
  RESET_GAME_DATA: 'RESET_GAME_DATA',
}

export function gameStartAction() {
  return {
    type: ActionTypes.GAME_START,
  }
}

export function gameEndAction(lastGameHistory) {
  return {
    type: ActionTypes.GAME_END,
    payload: {
      lastGameHistory,
    },
  }
}

export function updatePastScoreAction(history) {
  return {
    type: ActionTypes.UPDATE_PAST_SCORE,
    payload: {
      history,
    },
  }
}

export function setHighScoreAction(score) {
  return {
    type: ActionTypes.SET_HIGH_SCORE,
    payload: {
      score,
    },
  }
}

export function resetGameDataAction() {
  return {
    type: ActionTypes.RESET_GAME_DATA,
  }
}
