import React, { useState, useEffect } from 'react'
import './App.css'
import Grid from './modules/Grid'
import Stage from './utils/Stage'

function App() {
  const [actualGrid, setGrid] = useState<number[][]>([])
  const [currentStage, setStage] = useState<Stage>(Stage.Fill)

  useEffect(() => {
    if (actualGrid.length === 0) {
      let SIZE = 12
      let pool = []
      for (let i = 0; i < SIZE; i++)
          pool[i] = new Array(SIZE).fill(0)
      setGrid(pool)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Grid
          setGrid={setGrid}
          actualGrid={actualGrid}
          setStage={setStage}
          currentStage={currentStage}
        />
      </header>
    </div>
  )
}

export default App
