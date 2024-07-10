const fractionMap = {
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅕": 1 / 5,
  "⅖": 2 / 5,
  "⅗": 3 / 5,
  "⅘": 4 / 5,
  "⅙": 1 / 6,
  "⅚": 5 / 6,
  "⅛": 1 / 8,
  "⅜": 3 / 8,
  "⅝": 5 / 8,
  "⅞": 7 / 8,
};

const parseFraction = (fractionStr) => {
  if (fractionStr in fractionMap) {
    return fractionMap[fractionStr];
  }

  // Custom parsing for other fractions (e.g., "1/3")
  const [numerator, denominator] = fractionStr.split("/");
  if (!denominator || isNaN(numerator) || isNaN(denominator)) {
    throw new Error(`Invalid fraction: ${fractionStr}`);
  }
  return parseInt(numerator, 10) / parseInt(denominator, 10);
};

export default parseFraction;
