export type Candle = {
  candel_type: "1m";
  o: number;
  h: number;
  l: number;
  c: number;
  ts: number;
};

export type INCOMMING_MESSAGE =
  | {
      type: "init";
      market: "SOL_USDC";
      payload: {
        candles: Candle[];
      };
    }
  | {
      type: "update";
      payload: {
        market: string;
        candle: string;
      };
    };
