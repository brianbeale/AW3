// const bridge64 = require('./bridge.png');
// const mtn64 = require('./mtn.png');
// const pipe64 = require('./pipe.gif');
// const pipeseam64 = require('./pipeseam.gif');
// const plain64 = require('./plain.png');
// const reef64 = require('./reef.png');
// const river64 = require('./river.png');
// const road64 = require('./road.png');
// const sea64 = require('./sea.png');
// const shoal64 = require('./shoal.png');
// const woods64 = require('./woods.png');
//
// const terrainImages = new Map([
//   ['bridge', require('./bridge.png')],
//   ['mtn', require('./mtn.png')],
//   ['pipe', require('./pipe.gif')],
//   ['pipeseam', pipeseam64],
//   ['plain', plain64],
//   ['reef', reef64],
//   ['river', river64],
//   ['road', road64],
//   ['sea', sea64],
//   ['shoal', shoal64],
//   ['woods', woods64],
// ]);

const terrainImages = new Map([
  ['mtn', require('./elementals/mtn.png')],
  ['plain', require('./elementals/plain.png')],
  ['woods', require('./elementals/woods.png')],
]);

const Mtn = {
  name: 'mtn',
  moveCosts: {
    inf: 2,
    mech: 1,
  },
  defense: 4,
};
const Plain = {
  name: 'plain',
  moveCosts: {
    inf: 1,
    mech: 1,
    tread: 1,
    wheel: 2,
  },
  defense: 1,
};
const Woods = {
  name: 'woods',
  moveCosts: {
    inf: 1,
    mech: 1,
    tread: 2,
    wheel: 3,
  },
  defense: 2,
};

const terrainStats = new Map([
  ['mtn', Mtn],
  ['plain', Plain],
  ['woods', Woods],
]);

export {
  terrainImages,
  terrainStats,
};
