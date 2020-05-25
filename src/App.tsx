import React, { useState, useEffect } from 'react'
import './App.css'
import Grid from './components/Grid'
import Stage from './classes/Stage'
import * as LU from './classes/LifeUtils'

function App() {
  const [actualGrid, setGrid] = useState<number[][]>([])
  const [currentStage, setStage] = useState<Stage>(Stage.Fill)
  const [gridSize, setSize] = useState<number>(12)
  const [isIntervalActive, setIntervalActivity] = useState(false)
  let previousWorld: number[][]
  let intervalDelay: number = 100

  const createArea = (size: number) => {
    let pool = []
    for (let i = 0; i < size; i++) {
      pool[i] = new Array(size).fill(0)
    }
    setGrid(pool)
    previousWorld = [...pool]
  }

  const applySize = (newSize: number) => {
    stopSimulation()
    setSize(newSize)
    createArea(newSize)
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

    setTimeout(() => {
      setGrid(newGen)
    }, intervalDelay)

    return false
  }

  useEffect(() => {
    createArea(gridSize)
  }, [])


  useEffect(() => {
    if (isIntervalActive) {
      simulationStep()
    } else {
      console.log('null fired')
    }
  }, [actualGrid])


  return (
    <div className="App">
      <label>Size</label>
      <input
        type="range"
        min="8"
        max="32"
        value={gridSize}
        onChange={(e) => applySize(Number(e.target.value))}
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
      <input type="button" value="Clear Area" onClick={() => createArea(gridSize)} />

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
