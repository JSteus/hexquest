import { produce } from 'immer'
import { ActionTypes } from './Actions'

export function gameReducer(state, action) {
  switch (action.type) {
    case ActionTypes.GAME_END:
      return produce(state, (draft) => {
        draft.lastGameHistory = action.payload.lastGameHistory
      })
    case ActionTypes.SET_HIGH_SCORE:
      return produce(state, (draft) => {
        draft.highScore = action.payload.score
      })
    case ActionTypes.RESET_GAME_DATA:
      return produce(state, (draft) => {
        draft.highScore = 0
        draft.lastGameHistory = []
      })

    default:
      return state
  }
}
