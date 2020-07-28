import { terrainImages } from '../assets/terrain/terrains.js';
import { activeUnitImages, dormantUnitImages }
  from '../assets/teams/teams.js';
import interactiveImages
  from '../assets/interactives/interactives.js';

export default class GameMap {
  constructor(ctx, terrainMatrix, unitMatrix) {
    this.ctx = ctx;
    this.terrainMatrix = terrainMatrix;
    this.unitMatrix = unitMatrix;

    this.loadImages(terrainImages)
    .then((imgArray) => {
      const imgMap = new Map(imgArray);
      this.terrains = imgMap;
      this.draw(this.terrainMatrix, imgMap);
      return;
    })
    .then(() => this.loadImages(activeUnitImages))
    .then((imgArray) => {
      const imgMap = new Map(imgArray);
      this.activeUnitImages = imgMap;
      this.draw(this.unitMatrix, imgMap);
      return;
    })
    .then(() => this.loadImages(dormantUnitImages))
    .then((imgArray) => {
      const imgMap = new Map(imgArray);
      this.dormantUnitImages = imgMap;
      return;
    })
    .then(() => this.loadImages(interactiveImages))
    .then((imgArray) => {
      const imgMap = new Map(imgArray);
      this.interactives = imgMap;
      return;
    })
    .catch(() => {
      // console.log('Catch!');
      // console.log(err);
    });
  }

  loadImages(imgMap) {
    const names = [...imgMap.keys()];
    const imgs = [];
    const imgPromises = [];
    names.forEach((name, index) => {
      imgs[index] = new Image();
      imgs[index].src = imgMap.get(name);
      imgPromises[index] = new Promise((resolve) => {
        imgs[index].onload = () => resolve([name, imgs[index]]);
      });
    });
    return Promise.all(imgPromises);
  }

  layTile(tile, row, col) {
    this.ctx.drawImage(tile,
      col * 16 + 5, row * 16 + 5);
  }
  draw(matrix, imgMap) {
    matrix.forEach((row, rowNum) => {
      row.forEach((tile, colNum) => {
        if (tile) {
          this.layTile(imgMap.get(tile.trim()), rowNum, colNum);
        }
      });
    });
  }
  drawUnit(color, name, row, col, active = true) {
    const imgMap = active ?
    this.activeUnitImages : this.dormantUnitImages;
    const unitImage = imgMap.get(`${color}_${name}`);
    this.layTile(unitImage, row, col);
    this.unitMatrix[row][col] = `${color}_${name}`;
  }
  redraw(terrainMatrix, unitMatrix) {
    this.draw(terrainMatrix, this.terrains);
    // this.draw(unitMatrix, this.activeUnitImages);
    unitMatrix.forEach((row) => {
      row.forEach((unit) => {
        if (unit) {
          this.drawUnit(unit.color, unit.name, unit.row, unit.col, { active: unit.active });
        }
      });
    });
  }

  drawArrow(path) {
    const points = path.history;
    points.slice(0, -1).forEach((point) => {
      this.layTile(this.interactives.get('arrow_body_horizontal'), point[0], point[1]);
    });
    const endPoint = points[points.length - 1];
    this.layTile(this.interactives.get('arrow_head_right'), endPoint[0], endPoint[1]);
  }

  highlightMove(row, col) {
    this.layTile(this.interactives.get('highlight_move'), row, col);
  }

  test() {
    // console.log('Test!');
  }
}
