export interface Trade {
  id?: string;
  type: "LONG" | "SHORT";
  margin: number;
  leverage: number;

  entryPrice: number;
  market: string;

  timestamp: number;
  status: "open" | "close" | "liquidated";

  PnL: number;
}

export interface User {
  id: string;
  balance: number;
}
