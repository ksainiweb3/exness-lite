import Redis from "ioredis";
import { WebSocketServer } from "ws";
import { CandleManager } from "./store/CandleManager";

const wss = new WebSocketServer({ port: 8080 });
const redis = new Redis();

wss.on("connection", (ws) => {
  console.log("Connected to WS server");
  ws.send(
    JSON.stringify({
      type: "init",
      market: "SOL_USDC",
      payload: {
        candles: CandleManager.getInstance().candles,
      },
    })
  );

  redis.subscribe("trade.SOL_USDC");
  redis.on("message", (channel, message) => {
    CandleManager.getInstance().addCandle(JSON.parse(message));
    ws.send(
      JSON.stringify({
        type: "update",
        payload: {
          market: "SOL_USDC",
          candle: message,
        },
      })
    );
  });
});
