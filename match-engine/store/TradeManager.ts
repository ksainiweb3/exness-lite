import { v4 } from "uuid";
import type { Trade } from "../utils/types";

export class TradeManager {
  static instance: TradeManager;
  public trades: Record<
    string,
    (Trade & {
      positionSize: number;
      quantity: number;
      liquidationPrice: number;
      maintainanePrice: number;
    })[]
  >;
  private constructor() {
    this.trades = {};
  }

  public static getInstance() {
    if (!this.instance) this.instance = new TradeManager();
    return this.instance;
  }

  addTrade(userId: string, trade: Trade) {
    trade.id = v4();
    if (!this.trades[userId]) this.trades[userId] = [];
    this.trades[userId].push(trade);
  }

  closeTrade(userId: string, tradeId: string) {
    if (!this.trades[userId]) return;
    this.trades[userId] = this.trades[userId]?.filter(
      (trade) => trade.id === tradeId
    );
  }

  checkPnL() {}
  liquidateTrade() {}
}
