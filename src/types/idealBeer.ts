export const levels = ["low", "medium", "high"] as const;
export const colors = ["pale", "gold", "amber", "red", "black"] as const;

export type AlcoholContent = (typeof levels)[number];
export type BitternessLevel = (typeof levels)[number];
export type Color = (typeof colors)[number];

export const isAlcoholContent = (v: any): v is AlcoholContent =>
  levels.includes(v);

export const isBitternessLevel = (v: any): v is BitternessLevel =>
  levels.includes(v);

export const isColor = (v: any): v is Color => colors.includes(v);
