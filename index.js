const assert = require('assert');

require('yargs')
  .command({
    command: 'closest <hex> [max]',
    desc: 'Show [max] of closest to given <hex> color.',
    builder: yargs => {
      yargs.positional('hex', {
        describe: 'Color to match with.',
        type: 'string',
      });
      yargs.positional('max', {
        describe: 'Show material colors.',
        type: 'number',
        default: 10,
      });
    },
    handler: ({ hex, max }) => {
      assert(
        /^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(hex),
        'Hex has invalid format.',
      );
      const target = toRgb(hex);
      const matches = require('./colors')
        .map(color => {
          const offset = toRgb(color.color).reduce(
            (res, val, idx) => res + Math.abs(val - target[idx]),
            0,
          );
          return {
            ...color,
            offset,
          };
        })
        .sort((a, b) => a.offset - b.offset)
        .slice(0, max)
        .forEach((color, i) => {
          console.log(
            `#${i}. ${color.name} - ${color.code} - ${color.color} (${color.offset})`,
          );
        });
    },
  })
  .demandCommand()
  .help()
  .wrap(72).argv;

function toRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}
