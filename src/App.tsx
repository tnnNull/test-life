import React, {useState, useEffect} from 'react'
import './App.css'
import Grid from './modules/Grid'
import Stage from './utils/Stage'

function App() {
  const [actualGrid, setGrid] = useState<number[][]>([])
  const [currentStage, setStage] = useState<Stage>(Stage.Fill)
  const [gridSize, setSize] = useState<number>(12)

  useEffect(() => {
  }, [])

  useEffect(() => {
    let pool = []
    for (let i = 0; i < gridSize; i++) {
      pool[i] = new Array(gridSize).fill(0)
    }
    console.log(pool)
    setGrid(pool)
  }, [gridSize])

  const applySize = (element: any) => {
    setSize(element?.value)
    console.log(gridSize)
  }

  return (
    <div className="App">
      <label>Grid Size</label>
      <input type="range"
             min="6" max="15" value={gridSize} onChange={(e) => applySize(e.target)}
      />
      <main className="App-main">

        <Grid
          setGrid={setGrid}
          actualGrid={actualGrid}
          setStage={setStage}
          currentStage={currentStage}
        />
      </main>
    </div>
  )
}

export default App
