import styles from './Main.module.scss'

import { useContext } from 'react'
import { ColorSelection } from '../../components/ColorSelection'
import { ScoreTracker } from '../../components/ScoreTracker'
import { Sidebar } from '../../components/Sidebar'
import { GameContext } from '../../contexts/GameContext'

export function Main() {
  const { resetData } = useContext(GameContext)

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.body}>
        <h1>HEXQUEST</h1>
        <h3>Guess the color</h3>
        <ScoreTracker />
        <ColorSelection />
        <a onClick={resetData}>Reset all data</a>
      </div>
    </div>
  )
}
