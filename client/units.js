class Unit {
  constructor(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;

    this.active = true;
    this.health = 10;
    this.fuel = 99;
  }
  move(deltaX, deltaY) {
    this.col += deltaX;
    this.row += deltaY;
  }
}

class Infantry extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'inf';
    this.moveRange = 3;
    this.moveType = 'inf';
  }
}
class Mech extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'mech';
    this.moveRange = 2;
    this.moveType = 'mech';
  }
}
class Recon extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'recon';
    this.moveRange = 8;
    this.moveType = 'wheel';
  }
}
class Tank extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'tank';
    this.moveRange = 6;
    this.moveType = 'tread';
  }
}
class MDTank extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'mdtank';
    this.moveRange = 5;
    this.moveType = 'tread';
  }
}
class APC extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'apc';
    this.moveRange = 6;
    this.moveType = 'tread';
  }
}
class Artillery extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'artillery';
    this.moveRange = 5;
    this.moveType = 'tread';
  }
}
class Rockets extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'rockets';
    this.moveRange = 5;
    this.moveType = 'wheel';
  }
}
class AAir extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'aair';
    this.moveRange = 6;
    this.moveType = 'tread';
  }
}
class Missiles extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'missiles';
    this.moveRange = 4;
    this.moveType = 'wheel';
  }
}
class TCopter extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'tcopter';
    this.moveRange = 6;
    this.moveType = 'air';
  }
}
class BCopter extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'bcopter';
    this.moveRange = 6;
    this.moveType = 'air';
  }
}
class Fighter extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'fighter';
    this.moveRange = 9;
    this.moveType = 'air';
  }
}
class Bomber extends Unit {
  constructor(color, row, col) {
    super(color, row, col);
    this.name = 'bomber';
    this.moveRange = 7;
    this.moveType = 'air';
  }
}


const unitClasses = new Map([
  ['inf', Infantry],
  ['mech', Mech],
  ['recon', Recon],
  ['tank', Tank],
  ['mdtank', MDTank],
  ['apc', APC],
  ['artillery', Artillery],
  ['rockets', Rockets],
  ['aair', AAir],
  ['missiles', Missiles],
  ['tcopter', TCopter],
  ['bcopter', BCopter],
  ['fighter', Fighter],
  ['bomber', Bomber],
]);

export default unitClasses;
