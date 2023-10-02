import { differenceInMilliseconds } from 'date-fns'
import { useCallback, useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { gameRound, scoreKeeping } from '../../utils'
import styles from './ColorSelection.module.scss'
import { ProgressBar } from './components/ProgressBar'

export function ColorSelection() {
  const {
    gameData,
    gameState,
    startGame,
    resetGameTimer,
    updateScore,
    setHighScore,
  } = useContext(GameContext)
  const { state, score, restarted, currentGameHistory } = gameState

  const [currentQuestion, setCurrentQuestion] = useState({
    gameOptions: [],
    correctOption: null,
    questionStart: null,
  })
  const [millisecondsPassed, setMillisecondsPassed] = useState(0)

  function getQuestion() {
    setCurrentQuestion(gameRound())
    startGame()
  }

  const answerQuestion = useCallback(
    (selectedAnswer, timeOut) => {
      const answer = currentQuestion.gameOptions[currentQuestion.correctOption]
      const { highScore, timePerQuestion } = gameData
      const order = !currentGameHistory.length
        ? 0
        : currentGameHistory[currentGameHistory.length - 1].order + 1

      const questionScore = {
        guess: selectedAnswer,
        answer,
        time: timeOut ? 0 : (millisecondsPassed - timePerQuestion) / 1000,
        order,
      }

      const updatedScore = scoreKeeping(answer, selectedAnswer, score)

      if (updatedScore > highScore) {
        setHighScore(updatedScore)
      }

      updateScore(updatedScore, questionScore)
      setCurrentQuestion(gameRound())
    },
    [
      currentQuestion.gameOptions,
      currentQuestion.correctOption,
      currentGameHistory,
      millisecondsPassed,
      gameData,
      score,
      updateScore,
      setHighScore,
    ],
  )

  useEffect(() => {
    let interval

    if (state === 'inGame') {
      interval = setInterval(() => {
        const msDifference = differenceInMilliseconds(
          new Date(),
          new Date(currentQuestion.questionStart),
        )

        if (msDifference >= gameData.timePerQuestion * 1000) {
          answerQuestion(null, true)

          setMillisecondsPassed(gameData.timePerQuestion)
          clearInterval(interval)
        } else {
          setMillisecondsPassed(msDifference)
        }
      }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [state, gameData.timePerQuestion, currentQuestion, answerQuestion])

  useEffect(() => {
    if (restarted) {
      resetGameTimer()
      setCurrentQuestion(gameRound())
    }
  }, [restarted, resetGameTimer])

  return (
    <div className={styles.container}>
      {state === 'standBy' && (
        <>
          <div
            className={`${styles.colorPreview} ${styles.colorPreviewDefault}`}
          >
            <button aria-label="start-button" onClick={getQuestion}>
              Start
            </button>
          </div>
        </>
      )}
      {state === 'inGame' && (
        <>
          <ProgressBar time={millisecondsPassed} />
          <div
            style={{
              backgroundColor:
                currentQuestion.gameOptions[currentQuestion.correctOption],
            }}
            className={styles.colorPreview}
          />
          <div className={styles.optionsButtonContainer}>
            {currentQuestion.gameOptions.map((item, index) => {
              return (
                <button
                  key={item}
                  aria-label={`guess-option-${index + 1}`}
                  onClick={() => answerQuestion(item)}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
