import { fireEvent, render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { GameContext, GameContextProvider } from '../contexts/GameContext'

function CustomTest() {
  const { gameData, gameState, startGame, setHighScore, endGame } =
    useContext(GameContext)

  return (
    <div>
      <div data-testid="game-state">{gameState.state}</div>
      <div data-testid="game-start-time">
        {gameState.gameStartTime && gameState.gameStartTime.toString()}
      </div>
      <div data-testid="score">{gameState.score}</div>
      <div data-testid="highscore">{gameData.highScore}</div>
      <button onClick={() => setHighScore(1)} aria-label="setHighScore">
        HighScore
      </button>
      <button onClick={() => startGame()} aria-label="startGame">
        Start
      </button>
      <button onClick={() => endGame()} aria-label="endGame">
        Stop
      </button>
    </div>
  )
}

test('Should render initial values', () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )

  expect(screen.getByTestId('game-state')).toHaveTextContent('standBy')
  expect(screen.getByTestId('score')).toMatch(/\d+/g)
  expect(screen.getByTestId('highscore')).toMatch(/\d+/g)
})

test('Should start game', () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )
  const startButton = screen.getByRole('button', { name: 'startGame' })
  fireEvent.click(startButton)
  expect(screen.getByTestId('game-state')).toHaveTextContent('inGame')
  expect(screen.getByTestId('game-start-time')).toBeTruthy()
})

test('Should end the game', () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )
  const endButton = screen.getByRole('button', { name: 'endGame' })
  fireEvent.click(endButton)
  expect(screen.getByTestId('game-state')).toHaveTextContent('standBy')
})
