import { blueActiveImages, blueDormantImages }
  from './blue/units/blue_units.js';
import { greenActiveImages, greenDormantImages }
  from './green/units/green_units.js';
import { purpleActiveImages, purpleDormantImages }
  from './purple/units/purple_units.js';
import { redActiveImages, redDormantImages }
  from './red/units/red_units.js';
import { yellowActiveImages, yellowDormantImages }
  from './yellow/units/yellow_units.js';

const activeUnitImages = new Map([
  ...blueActiveImages,
  ...greenActiveImages,
  ...purpleActiveImages,
  ...redActiveImages,
  ...yellowActiveImages,
]);

const dormantUnitImages = new Map([
  ...blueDormantImages,
  ...greenDormantImages,
  ...purpleDormantImages,
  ...redDormantImages,
  ...yellowDormantImages,
]);

export {
  activeUnitImages,
  dormantUnitImages,
};
