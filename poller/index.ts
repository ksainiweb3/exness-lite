import Redis from "ioredis";
import WebSocket from "ws";
import type { Candle, Trade } from "./types";

const redis = new Redis();

function connectToBinance() {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/solusdc@trade");

  ws.on("open", () => console.log("Live trade stream connected"));
  ws.on("close", () => setTimeout(connectToBinance, 1000));

  let currentInterval: number | null = null;
  let candle: Candle | null = null;

  ws.on("message", (data) => {
    const trade: Trade = JSON.parse(data.toString());
    const price = parseFloat(trade.p);
    const ts = trade.T;

    redis.set("price.SOL_USDC", JSON.stringify({ price, ts }));

    const interval = Math.floor(ts / (60 * 1000));

    if (currentInterval === null) {
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
      redis.publish("trade.SOL_USDC", JSON.stringify(candle));
      console.log("Published" + JSON.stringify(candle));
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
}

connectToBinance();
