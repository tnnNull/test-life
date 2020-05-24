import React, { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import Grid from './modules/Grid'
import Stage from './utils/Stage'
import * as LU from './utils/LifeUtils'
const INITIAL_SIZE: number = 12
const INITIAL_DELAY: number = 100

function App() {
  const [actualGrid, setGrid] = useState<number[][]>([])
  const [currentStage, setStage] = useState<Stage>(Stage.Fill)
  const [gridSize, setSize] = useState<number>(INITIAL_SIZE)
  const [isIntervalActive, setIntervalActivity] = useState(false)
  let previousWorld: number[][]

  useEffect(() => {
  }, [])

  useEffect(() => {
    clearArea()
  }, [gridSize])

  useEffect( () => {
    if (!isIntervalActive) {
      console.log('null fired')
    } else {
      simulationStep()
    }
  }, [actualGrid])

  const clearArea = () => {
    let pool = []
    for (let i = 0; i < gridSize; i++) {
      pool[i] = new Array(gridSize).fill(0)
    }
    setGrid(pool)
    previousWorld = pool
  }

  const applySize = (element: any) => {
    stopSimulation()
    setSize(Number(element?.value))
  }

  const stopSimulation = () => {
    //setStage(Stage.Fill)
    setIntervalActivity(false)
  }

  const startSimulation = () => {
    //setStage(Stage.Simulate)
    setIntervalActivity(true)
    simulationStep()
  }

  const simulationStep = () => {
    previousWorld = LU.CopyWorld(actualGrid)

    let newGen = LU.GetNextGeneration(previousWorld)
    //console.log(newGen)
    if (JSON.stringify(newGen) === JSON.stringify(previousWorld)) {
      console.log('Stable loop')
      stopSimulation()
    }
    if (LU.CountAlive(newGen) === 0) {
      console.log('all dead')
      stopSimulation()
    }

    setTimeout(() => {setGrid(newGen)}, INITIAL_DELAY);

    return false
  }

  return (
    <div className="App">
      <label>Grid Size</label>
      <input
        type="range"
        min="10"
        max="60"
        value={gridSize}
        onChange={(e: ChangeEvent) => applySize(e.target)}
      />
      <br />

      {isIntervalActive ? (
        <input
          type="button"
          className="startstop_button"
          value="Stop"
          onClick={() => stopSimulation()}
        />
      ) : (
        <input
          type="button"
          value="Simulate"
          className="startstop_button"
          onClick={() => startSimulation()}
        />
      )}
      <input type="button" value="Clear Area" onClick={() => clearArea()} />

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
