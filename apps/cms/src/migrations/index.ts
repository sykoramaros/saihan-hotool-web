import * as migration_20260525_152310 from './20260525_152310';
import * as migration_20260525_194934 from './20260525_194934';
import * as migration_20260525_203737 from './20260525_203737';

export const migrations = [
  {
    up: migration_20260525_152310.up,
    down: migration_20260525_152310.down,
    name: '20260525_152310',
  },
  {
    up: migration_20260525_194934.up,
    down: migration_20260525_194934.down,
    name: '20260525_194934',
  },
  {
    up: migration_20260525_203737.up,
    down: migration_20260525_203737.down,
    name: '20260525_203737'
  },
];
