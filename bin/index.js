const { closest } = require('../lib');

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
      const matches = closest(hex).slice(0, max);
      matches.slice(0, max).forEach((color, i) => {
        console.log(
          `#${i}. ${color.name} - ${color.code} - ${color.color} (${color.offset})`,
        );
      });
    },
  })
  .demandCommand()
  .help()
  .wrap(72).argv;
