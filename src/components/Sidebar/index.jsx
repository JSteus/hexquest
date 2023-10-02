import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { sidebarSorting } from '../../utils'
import styles from './Sidebar.module.scss'
import { QuestionTag } from './components/QuestionTag/QuestionTag'

export function Sidebar() {
  const { gameData, gameState } = useContext(GameContext)
  const { lastGameHistory } = gameData
  const { state, currentGameHistory } = gameState
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (state === 'standBy') {
      setHistory(lastGameHistory)
    }
    if (state === 'inGame') {
      setHistory(currentGameHistory)
    }
  }, [state, lastGameHistory, currentGameHistory])

  return (
    <section className={styles.container}>
      <h2>Current / Lastest Game</h2>
      {history.length > 0 && (
        <div className={styles.scoreBoard}>
          <div className={styles.listHead}>
            <span>Guessed Color</span>
            <span>Correct Color</span>
            <span>Time</span>
          </div>
          <div className={styles.listBody}>
            {sidebarSorting(history).map((i) => {
              return (
                <QuestionTag
                  key={i.answer}
                  guess={i.guess}
                  correctOption={i.answer}
                  time={i.time}
                />
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
