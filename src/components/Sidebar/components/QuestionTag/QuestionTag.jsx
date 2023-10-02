import { CheckCircle, XCircle } from 'phosphor-react'
import { getContrast } from 'polished'
import styles from './QuestionTag.module.scss'

export function QuestionTag({ guess, correctOption, time }) {
  function formatTime(seconds) {
    const secondsString = seconds.toString()
    if (secondsString.includes('.')) {
      return secondsString.slice(0, 3)
    }

    return '0.0'
  }

  return (
    <div className={styles.container}>
      <div className={styles.guessContainer}>
        {guess && correctOption !== guess && (
          <span
            data-testid="guess"
            style={{
              backgroundColor: guess,
              color: getContrast(guess, '#FFF') < 3.5 ? '#000' : '#FFF',
            }}
          >
            {guess}
          </span>
        )}
        <span
          data-testid="correct-option"
          style={{
            backgroundColor: correctOption,
            color: getContrast(correctOption, '#FFF') < 3.5 ? '#000' : '#FFF',
          }}
        >
          {correctOption}
        </span>
      </div>
      <div className={styles.timeContainer}>
        {correctOption === guess && <CheckCircle color="green" size={25} />}
        {correctOption !== guess && <XCircle color="red" size={25} />}
        <span data-testid="time">{formatTime(time)}s</span>
      </div>
    </div>
  )
}
