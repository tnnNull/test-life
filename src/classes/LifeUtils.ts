const CountAlive = (world: number[][]) => {
  let count: number = 0
  for (let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[0].length; j++) {
      if (world[i][j] === 1) {
        count++
      }
    }
  }
  return count
}

const GetNearOf = (x: number, y: number) => {
  let k: number = 0
  let nb: number[][] = new Array(8)

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) {
        continue
      }
      nb[k] = [i, j]
      k++
    }
  }
  return nb
}

const GetNearAliveOf = (world: number[][], x: number, y: number) => {
  let count = 0
  let nb: number[][]
  let _x: number, _y: number

  nb = GetNearOf(x, y)

  for (let i = 0; i < 8; i++) {
    ;[_x, _y] = nb[i]

    if (_x < 0 || _y < 0) {
      _x = (world.length + _x) % world.length
      _y = (world[0].length + _y) % world[0].length
    }

    if (_x >= world.length || _y >= world[0].length) {
      _x = (world.length + _x) % world.length
      _y = (world[0].length + _y) % world[0].length
    }

    if (world[_x][_y] === 1) {
      count++
    }
  }

  return count
}

const GetNextGeneration = (pworld: number[][]) => {
  let nearAlive: number, tempCell: number
  let world = CopyWorld(pworld)

  for (let i = 0; i < pworld.length; i++) {
    for (let j = 0; j < pworld[0].length; j++) {
      tempCell = pworld[i][j]
      nearAlive = GetNearAliveOf(pworld, i, j)

      if (tempCell === 0) {
        if (nearAlive === 3) {
          world[i][j] = 1
        }
      } else {
        if (nearAlive <= 1 || nearAlive >= 4) {
          world[i][j] = 0
        }
      }
    }
  }
  return world
}

const CopyWorld = (pworld: number[][]) => {
  let world: number[][] = new Array(pworld.length)
  for (let i = 0; i < pworld.length; i++) {
    world[i] = new Array(pworld[0].length)
    for (let j = 0; j < pworld[0].length; j++) {
      world[i][j] = pworld[i][j]
    }
  }
  return world
}

export { CountAlive, GetNearOf, GetNearAliveOf, GetNextGeneration, CopyWorld }
