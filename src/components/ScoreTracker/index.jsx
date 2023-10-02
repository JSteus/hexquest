import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import styles from './ScoreTracker.module.scss'

export function ScoreTracker() {
  const { gameData, gameState, restartGame, endGame } = useContext(GameContext)
  const { totalTimeLimit, highScore } = gameData
  const { state, score, gameStartTime } = gameState
  const [secondsPassed, setSecondsPassed] = useState(totalTimeLimit)

  useEffect(() => {
    let interval

    if (state === 'inGame') {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), gameStartTime)

        if (secondsDifference >= totalTimeLimit) {
          endGame()

          setSecondsPassed(totalTimeLimit)
          clearInterval(interval)
        } else {
          setSecondsPassed(totalTimeLimit - secondsDifference)
        }
      }, 500)
    }

    return () => {
      clearInterval(interval)
    }
  }, [state, gameStartTime, totalTimeLimit, endGame])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.timeBox}>
          <span>
            REMAINING <br /> TIME (S)
          </span>
          <span data-testid="remaining-time">
            <strong>{secondsPassed}</strong>
          </span>
        </div>
      </div>
      <button
        aria-label="restart-button"
        disabled={state === 'standBy'}
        onClick={() => restartGame()}
      >
        RESTART
      </button>
      <div className={styles.box}>
        <div className={styles.scoreBox}>
          <span>HIGH SCORE</span>
          <span>
            <strong>{highScore}</strong>
          </span>
        </div>
        <hr className={styles.divider}></hr>
        <div className={styles.scoreBox}>
          <span>SCORE</span>
          <span>
            <strong>{score}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
