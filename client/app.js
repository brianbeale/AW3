import GameMap from './GameMap.js';
import Controller from './Controller.js';

const testMap = [
  ['plain', 'plain', 'plain', 'plain', ' mtn '],
  ['plain', 'plain', 'plain', 'plain', ' mtn '],
  ['plain', 'plain', 'plain', 'woods', ' mtn '],
  ['plain', 'plain', 'plain', ' mtn ', ' mtn '],
  ['plain', 'plain', 'woods', ' mtn ', ' mtn '],
];

const predeployed = [
  ['red_inf', null, null, 'blue_inf', null],
  [null, null, 'red_inf', null, null],
  ['green_artillery', null, 'yellow_rockets', null, null],
  [null, null, null, null, null],
  ['purple_bomber', null, null, null, null],
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gameMap = new GameMap(ctx, testMap, predeployed);
const controller = new Controller(testMap, predeployed.map((arr) => [...arr]));
controller.gameMap = gameMap;

canvas.onclick = (e) => {
  // console.log('Click!');
  const row = Math.floor((e.pageY - 13) / 16);
  const col = Math.floor((e.pageX - 13) / 16);
  controller.handleClick(row, col);
};

canvas.oncontextmenu = (e) => {
  e.preventDefault();
  console.log('Right Click!');
  const row = Math.floor((e.pageY - 13) / 16);
  const col = Math.floor((e.pageX - 13) / 16);
  gameMap.drawUnit('red', 'bcopter', row, col);
};

canvas.onmousemove = (e) => {
  const row = Math.floor((e.pageY - 13) / 16);
  const col = Math.floor((e.pageX - 13) / 16);
  controller.handleMouseMove(row, col);
};

gameMap.test();
