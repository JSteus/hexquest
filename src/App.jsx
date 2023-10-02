import React from 'react'
import ReactDOM from 'react-dom/client'
import { GameContextProvider } from './contexts/GameContext'
import './global.scss'
import { Main } from './pages/Main'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameContextProvider>
      <Main />
    </GameContextProvider>
  </React.StrictMode>,
)
