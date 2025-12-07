import Redis from "ioredis";
import WebSocket from "ws";

type Trade = {
  e: string;
  E: number;
  T: number;
  s: string;
  p: string;
  q: string;
  m: boolean;
  M: boolean;
};

type Candle = {
  candel_type: "1m";
  o: number;
  h: number;
  l: number;
  c: number;
  ts: number;
};

const ws = new WebSocket("wss://stream.binance.com:9443/ws/solusdc@trade");
const redis = new Redis();

let currentInterval: number | null = null;
let candle: Candle | null = null;

ws.on("open", () => {
  console.log("Live trade stream connected");
});

ws.on("close", () => {
  console.log("Binance closed connection — reconnecting...");
  setTimeout(() => {}, 1000);
});

ws.on("message", (data) => {
  const trade: Trade = JSON.parse(data.toString());

  const price = parseFloat(trade.p);
  const ts = trade.T;

  const interval = Math.floor(ts / (1000 * 60));

  if (currentInterval === null) {
    console.log("First candle");
    currentInterval = interval;
    candle = {
      candel_type: "1m",
      o: price,
      h: price,
      l: price,
      c: price,
      ts: ts,
    };
    return;
  }

  if (interval !== currentInterval) {
    publishCandle(candle!);

    candle = {
      candel_type: "1m",
      o: price,
      h: price,
      l: price,
      c: price,
      ts: ts,
    };

    currentInterval = interval;
    return;
  }

  if (candle) {
    candle.h = Math.max(candle.h, price);
    candle.l = Math.min(candle.l, price);
    candle.c = price;
  }
});

function publishCandle(candle: Candle) {
  console.log("CANDLE PUSHED:", JSON.stringify(candle));
}
