module.exports = function toRgb(hex) {
  const full = hex.length === 7 ? hex : hex.replace(/[^#]/g, s => s + s);
  return [parse(full, 1), parse(full, 3), parse(full, 5)];
};

function parse(hex, offset) {
  return parseInt(hex.slice(offset, offset + 2), 16);
}
