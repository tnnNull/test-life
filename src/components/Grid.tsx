import React from 'react'
import './Grid.css'
import Stage from '../classes/Stage'

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
    <div className="Grid--main" data-status="filling">
      <table className="Grid--table">
        {props.actualGrid.map((rVal, rInd) => (
          <tr className="Row" key={"r" + rInd}>
            {rVal.map((val, ind) => (
              <td
                className="Cell"
                key={"r" + rInd + "c" + ind}
                data-type={val ? 'filled' : 'empty'}
                onMouseDown={() => fillCell(rInd, ind)}

              />
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Grid
