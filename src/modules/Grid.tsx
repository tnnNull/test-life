import React from 'react'
import './Grid.css'
import Stage from '../utils/Stage'

interface IProps {
  actualGrid: number[][]
  setGrid: (grid: number[][]) => void
  currentStage: Stage
  setStage: (stage: Stage) => void
}

const Grid = (props: IProps) => {
  const fillCell = (rInd: number, ind: number) => {
    console.log('Took on [' + rInd + ';' + ind + ']')
    if (props.currentStage !== Stage.Fill) return false
    let copy = [...props.actualGrid]
    //copy[rInd][ind] = Math.abs(props.actualGrid[ind][rInd] - 1)
    copy[rInd][ind] = copy[rInd][ind] ? 0 : 1
    props.setGrid(copy)
    return false
  }

  return (
    <div className="Grid--main">
      <table className="Grid--table">
        {props.actualGrid.map((rVal, rInd) => (
          <tr className="Row">
            {rVal.map((val, ind) => (
              <td
                className="Cell"
                data-type={val ? 'filled' : 'empty'}
                onClick={() => fillCell(rInd, ind)}
              />
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Grid
