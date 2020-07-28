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

function findPaths(unit, grid) {
  const paths = [];
  const coordinates = [unit.row, unit.col];
  let basePaths = [new Path([coordinates], grid)];
  for (let i = 0; i < 3; i += 1) {
    const newBasePaths = [];
    basePaths.forEach((path) => {
      neighbors(...path.history[path.history.length - 1], grid).forEach((n) => {
        if (!isArrInArr(n, path.history)) {
          const newPath = new Path([...path.history, n], grid);
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
  return paths;
}

const testUnit = {
  moveRange: 2,
  row: 0,
  col: 0,
};
const testGrid = [
    [1, 1, 1, 1],
    [1, 2, 2, 1],
    [2, 1, 1, 1],
];
findPaths(testUnit, testGrid).forEach((path, num) => {
  console.log(`Path ${num}: `);
  path.history.forEach((point) => {
    console.log(point);
  });
});

export default findPaths;
