export type Trade = {
  e: string;
  E: number;
  T: number;
  s: string;
  p: string;
  q: string;
  m: boolean;
  M: boolean;
};

export type Candle = {
  candel_type: "1m";
  o: number;
  h: number;
  l: number;
  c: number;
  ts: number;
};
