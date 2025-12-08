type Candle = {
  candel_type: "1m";
  o: number;
  h: number;
  l: number;
  c: number;
  ts: number;
};

export class CandleManager {
  public candles: Candle[];
  private static instance: CandleManager;

  private constructor() {
    this.candles = [];
  }
  addCandle(candle: Candle) {
    this.candles.push(candle);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CandleManager();
    }
    return this.instance;
  }
}
