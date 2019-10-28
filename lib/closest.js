const assert = require('assert');
const colors = require('./colors.json');
const toRgb = require('./to-rgb');

module.exports = function closest(hex) {
  assert(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(hex), 'Hex has invalid format.');
  const target = toRgb(hex);
  const matches = colors
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
    .sort((a, b) => a.offset - b.offset);
  return matches;
};
