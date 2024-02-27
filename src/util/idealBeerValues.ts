import { AlcoholContent, BitternessLevel, Color } from "types/idealBeer";

const alcoholContentLevels = {
  low: [0, 5],
  medium: [5, 7],
  high: [7, 12],
};
const bitternessLevelLevels = {
  low: [0, 35],
  medium: [35, 60],
  high: [60, 100],
};
const colorLevels = {
  pale: [0, 12],
  gold: [12, 18],
  amber: [18, 30],
  red: [30, 80],
  black: [80, 500],
};

export function getBitternessValues(
  bitternessLevel: BitternessLevel
): Array<number> {
  if (bitternessLevel == "low") {
    return bitternessLevelLevels.low;
  }
  if (bitternessLevel == "medium") {
    return bitternessLevelLevels.medium;
  }
  if (bitternessLevel == "high") {
    return bitternessLevelLevels.high;
  }

  return [-1, -1];
}

export function getAlcoholValues(
  alcoholContent: AlcoholContent | undefined
): Array<number> {
  if (alcoholContent == "low") {
    return alcoholContentLevels.low;
  }
  if (alcoholContent == "medium") {
    return alcoholContentLevels.medium;
  }
  if (alcoholContent == "high") {
    return alcoholContentLevels.high;
  }

  return [-1, -1];
}

export function getColorValues(color: Color): Array<number> {
  if (color == "pale") {
    return colorLevels.pale;
  }
  if (color == "gold") {
    return colorLevels.gold;
  }
  if (color == "amber") {
    return colorLevels.amber;
  }
  if (color == "red") {
    return colorLevels.red;
  }
  if (color == "black") {
    return colorLevels.black;
  }

  return [-1, -1];
}
