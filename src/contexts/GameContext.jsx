import { createContext, useEffect, useReducer, useState } from 'react'
import { gameReducer } from '../reducers'
import {
  gameEndAction,
  resetGameDataAction,
  setHighScoreAction,
} from '../reducers/Actions'

export const GameContext = createContext({})

export function GameContextProvider({ children }) {
  const [gameData, dispatch] = useReducer(
    gameReducer,
    {
      timePerQuestion: 10,
      totalTimeLimit: 30,
      highScore: 0,
      lastGameHistory: [],
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@game-state')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )
  const [gameState, setGameState] = useState({
    state: 'standBy',
    score: 0,
    gameStartTime: null,
    currentGameHistory: [],
  })

  function startGame() {
    setGameState((state) => ({
      ...state,
      state: 'inGame',
      restarted: false,
      gameStartTime: new Date(),
    }))
  }

  function restartGame() {
    setGameState((state) => ({
      ...state,
      state: 'inGame',
      score: 0,
      restarted: true,
      gameStartTime: new Date(),
      currentGameHistory: [],
    }))
  }

  function resetGameTimer() {
    setGameState((state) => ({
      ...state,
      restarted: false,
    }))
  }

  function updateScore(score, details) {
    setGameState((state) => ({
      ...state,
      score,
      currentGameHistory: [...state.currentGameHistory, details],
    }))
  }

  function setHighScore(score) {
    dispatch(setHighScoreAction(score))
  }

  function endGame() {
    dispatch(gameEndAction(gameState.currentGameHistory))
    setGameState((state) => ({
      ...state,
      state: 'standBy',
      score: 0,
      currentGameHistory: [],
    }))
  }

  function resetData() {
    const initialState = {
      timePerQuestion: 10,
      totalTimeLimit: 30,
      highScore: 0,
      lastGameHistory: [],
    }

    dispatch(resetGameDataAction())
    localStorage.setItem('@game-state', JSON.stringify(initialState))
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(gameData)

    localStorage.setItem('@game-state', stateJSON)
  }, [gameData])

  return (
    <GameContext.Provider
      value={{
        gameData,
        gameState,
        startGame,
        restartGame,
        resetGameTimer,
        updateScore,
        setHighScore,
        endGame,
        resetData,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
