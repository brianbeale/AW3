import unitClasses from './units.js';
import { findPaths, isArrInArr } from './move.js';

export default class Controller {
  constructor(terrainMatrix, unitMatrix) {
    this.terrainMatrix = terrainMatrix;
    this.unitMatrix = unitMatrix;
    // Create unit objects to replace string reprs of predeployeds
    unitMatrix.forEach((row, rowNum) => {
      row.forEach((value, colNum) => {
        if (value) {
          const color = value.split('_')[0];
          const UnitClass = unitClasses.get(value.split('_')[1]);
          const unit = new UnitClass(color, rowNum, colNum);
          this.unitMatrix[rowNum][colNum] = unit;
        }
      });
    });
    this.match = false;
  }
  selectUnit(unit) {
    // console.log(unit);
    // console.log(`Move Type: ${unit.moveType}`);
    const g = this.gameMap;
    this.highlightPoints = [[unit.row, unit.col]];
    this.paths = findPaths(unit, this.terrainMatrix, this.unitMatrix);
    this.paths.forEach((path) => {
      path.history.forEach((point) => {
        let match = false;
        this.highlightPoints.forEach((saved) => {
          if (point[0] === saved[0] && point[1] === saved[1]) {
            match = true;
          }
        });
        if (!match) {
          this.highlightPoints.push(point);
        }
      });
    });
    this.highlightPoints.forEach((point) => {
      g.highlightMove(...point);
    });
    g.drawUnit(unit.color, unit.name, unit.row, unit.col);
  }

  moveAlong(path) {
    console.log(path);
    const dest = path.history[path.history.length - 1];
    const unit = this.selected;
    unit.fuel -= path.moveCost;
    unit.active = false;
    this.unitMatrix[unit.row][unit.col] = null;
    unit.row = dest[0];
    unit.col = dest[1];
    this.unitMatrix[unit.row][unit.col] = unit;
    this.gameMap.redraw(this.terrainMatrix, this.unitMatrix);
  }

  handleClick(row, col) {
    console.log('Click!');
    console.log(`Row: ${row}; Col: ${col}`);
    this.gameMap.redraw(this.terrainMatrix, this.unitMatrix);
    if (this.selected) {
      if (isArrInArr([row, col], this.highlightPoints)) {
        this.moveAlong(this.match);
      }
    }

    if (this.unitMatrix[row][col]) {
      const unit = this.unitMatrix[row][col];
      this.selectUnit(unit);
      this.selected = unit;
      this.arrowPath = [[row, col]];
    } else {
      this.selected = false;
      this.match = false;
    }
    // const terrainObject = terrainStats.get(this.terrainMatrix[row][col].trim());
    // console.log(`Defense: ${terrainObject.defense}`);
  }

  handleMouseMove(row, col) {
    // console.log(`Row: ${row}; Col: ${col}`);
    if (this.selected) {
      if (this.selected.row !== row || this.selected.col !== col) {
      // const lastPoint = this.arrowPath[this.arrowPath.length - 1];
        this.arrowPath.slice(0, -1).forEach((point, index) => {
          if (point[0] === row && point[1] === col) {
            this.arrowPath = this.arrowPath.slice(0, index);
          }
        });
        // this.match = false;
        this.paths.forEach((path) => {
          if (JSON.stringify(this.arrowPath.concat([[row, col]]))
           === JSON.stringify(path.history)) {
            this.match = path;
          }
        });
        if (this.match) {
          this.arrowPath.push([row, col]);
          this.gameMap.redraw(this.terrainMatrix, this.unitMatrix);
          const unit = this.selected;
          this.selectUnit(unit);
          this.gameMap.drawArrow(this.match);
          this.gameMap.drawUnit(unit.color, unit.name, unit.row, unit.col);
        }
      } else {
        this.gameMap.redraw(this.terrainMatrix, this.unitMatrix);
        this.selectUnit(this.selected);
        this.arrowPath = [[row, col]];
      }
    }
  }
}
