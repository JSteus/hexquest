import styles from './ProgressBar.module.scss'

export function ProgressBar({ time }) {
  return (
    <div data-testid="progress-bar" className={styles.container}>
      <div
        style={{
          width: `${time / 100}%`,
          backgroundColor: time < 8000 ? 'green' : 'red',
        }}
      ></div>
    </div>
  )
}
