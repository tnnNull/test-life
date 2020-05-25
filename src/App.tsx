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
  const [intervalDelay, setDelay] = useState<number>(100)

  const createArea = (size: number) => {
    let pool = []
    for (let i = 0; i < size; i++) {
      pool[i] = new Array(Math.round(size*1.42)).fill(0)
    }
    setGrid(pool)
    previousWorld = [...pool]
  }

  const applyDelay = (newDelay: number) => {
    setDelay(newDelay)
  }

  const applySize = (newSize: number) => {
    stopSimulation()
    setSize(newSize)
    createArea(newSize)
  }

  const stopSimulation = () => {
    setStage(Stage.Fill)
    setIntervalActivity(false)
  }

  const startSimulation = () => {
    setStage(Stage.Simulate)
    setIntervalActivity(true)
    simulationStep()
  }

  const simulationStep = () => {
    previousWorld = LU.CopyWorld(actualGrid)

    let newGen = LU.GetNextGeneration(previousWorld)

    if (JSON.stringify(newGen) === JSON.stringify(previousWorld)) {
      stopSimulation()
    }
    if (LU.CountAlive(newGen) === 0) {
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
    }
  }, [actualGrid])

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-controllers">
          <div className="slider-box">
            <label>Size</label>
            <br />
            <input
              type="range"
              min="8"
              max="36"
              value={gridSize}
              onChange={(e) => applySize(Number(e.target.value))}
            />
            <br />
          </div>
          <div className="slider-box">
            <label>Delay</label>
            <br />
            <input
              type="range"
              min="20"
              max="1000"
              value={intervalDelay}
              onChange={(e) => applyDelay(Number(e.target.value))}
            />
            <br />
          </div>
          <div className="slider-box">
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
            <br />
            <input
              type="button"
              value="Clear Area"
              onClick={() => createArea(gridSize)}
            />
          </div>
        </div>

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
