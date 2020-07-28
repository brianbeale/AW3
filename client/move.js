import { terrainStats } from '../assets/terrain/terrains.js';

function isArrInArr(a, b) {
  let result = false;
  b.forEach((arr) => {
    if (arr[0] === a[0] && arr[1] === a[1]) {
      result = true;
    }
  });
  return result;
}

function neighbors(x, y, grid) {
  const left = x > 0 ? [x - 1, y] : null;
  const right = x < grid[0].length - 1 ? [x + 1, y] : null;
  const up = y > 0 ? [x, y - 1] : null;
  const down = y < grid.length - 1 ? [x, y + 1] : null;
  const result = [];
  [left, right, up, down].forEach((neighbor) => {
    if (neighbor) {
      result.push(neighbor);
    }
  });
  return result;
}

class Path {
  constructor(history, grid) {
    this.history = history;
    this.moveCost = 0;
    history.slice(1).forEach((point) => {
      this.moveCost += grid[point[0]][point[1]];
    });
  }
}

function findPaths(unit, terrainMatrix, unitMatrix) {
  const costGrid = [];
  terrainMatrix.forEach((row, rowNum) => {
    const newRow = [];
    row.forEach((tile, colNum) => {
      const occupyingUnit = unitMatrix[rowNum][colNum];
      if (occupyingUnit && occupyingUnit.color !== unit.color) {
        newRow.push(99);
      } else {
        newRow.push(terrainStats.get(tile.trim()).moveCosts[unit.moveType]);
      }
    });
    costGrid.push(newRow);
  });
  const paths = [];
  const coordinates = [unit.row, unit.col];
  let basePaths = [new Path([coordinates], costGrid)];
  for (let i = 0; i < unit.moveRange; i += 1) {
    const newBasePaths = [];
    basePaths.forEach((path) => {
      neighbors(...path.history[path.history.length - 1], costGrid).forEach((n) => {
        if (!isArrInArr(n, path.history)) {
          const newPath = new Path([...path.history, n], costGrid);
          if (newPath.moveCost < unit.moveRange) {
            newBasePaths.push(newPath);
            paths.push(newPath);
          } else if (newPath.moveCost === unit.moveRange) {
            paths.push(newPath);
          }
        }
      });
    });
    basePaths = newBasePaths;
    paths.concat(basePaths);
  }
  paths.forEach((path) => {
    const endPoint = path.history[path.history.length - 1];
    if (unitMatrix[endPoint[0]][endPoint[1]]) {
      path.history = path.history.slice(0, -1);
    }
  });
  return paths;
}

export {
  findPaths,
  isArrInArr,
};
