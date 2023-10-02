import { fireEvent, render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { ColorSelection } from '../components/ColorSelection'
import { GameContext, GameContextProvider } from '../contexts/GameContext'

function CustomTest() {
  const { gameState } = useContext(GameContext)

  return (
    <div>
      <div data-testid="game-state">{gameState.state}</div>
      <ColorSelection />
    </div>
  )
}

test('Should render guess options and progress bar', async () => {
  render(
    <GameContextProvider>
      <CustomTest />
    </GameContextProvider>,
  )

  const startButton = screen.getByRole('button', { name: 'start-button' })

  fireEvent.click(startButton)

  expect(screen.getByTestId('game-state')).toHaveTextContent('inGame')

  expect(screen.getByTestId('progress-bar')).toBeInTheDocument()

  expect(
    screen.getByRole('button', { name: 'guess-option-1' }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'guess-option-2' }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'guess-option-3' }),
  ).toBeInTheDocument()
})
