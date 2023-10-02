import { fireEvent, render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { ScoreTracker } from '../components/ScoreTracker/index.jsx'
import { GameContext, GameContextProvider } from '../contexts/GameContext.jsx'

function CustomTest() {
  const { gameState, startGame } = useContext(GameContext)

  return (
    <div>
      <div data-testid="game-state">{gameState.state}</div>
      <ScoreTracker />
      <button onClick={() => startGame()} aria-label="start-button">
        Start
      </button>
    </div>
  )
}

test('Should decrease timer', async () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )
  const startButton = screen.getByRole('button', { name: 'start-button' })

  fireEvent.click(startButton)
  expect(screen.getByTestId('game-state')).toHaveTextContent('inGame')

  await new Promise((resolve) => setTimeout(resolve, 1000))
  expect(screen.getByTestId('remaining-time')).not.toBe('30')
})

test('Should restart game', async () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )
  const startButton = screen.getByRole('button', { name: 'start-button' })
  const restartButton = screen.getByRole('button', { name: 'restart-button' })

  fireEvent.click(startButton)
  expect(screen.getByTestId('game-state')).toHaveTextContent('inGame')

  await new Promise((resolve) => setTimeout(resolve, 1000))
  fireEvent.click(restartButton)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  expect(screen.getByTestId('remaining-time')).toHaveTextContent('30')
})
