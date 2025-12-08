import { useEffect, useState } from "react";
import { type INCOMMING_MESSAGE, type Candle } from "../types";

const App = () => {
  const [candles, setCandles] = useState<Record<string, Candle[]>>({});
  const [socket, setSocket] = useState<null | WebSocket>(null);
  useEffect(() => {
    function connectToWS() {
      const ws = new WebSocket("ws://localhost:8080");
      ws.onmessage = (event) => {
        const parsedData: INCOMMING_MESSAGE = JSON.parse(event.data);
        switch (parsedData.type) {
          case "init":
            setCandles((prev) => ({
              ...prev,
              [parsedData.market]: parsedData.payload.candles,
            }));
            break;

          case "update": {
            const market = parsedData.payload.market;
            const parsedCandle: Candle = JSON.parse(parsedData.payload.candle);

            setCandles((prev) => {
              const current = prev[market] || [];
              return {
                ...prev,
                [market]: [...current, parsedCandle],
              };
            });

            break;
          }
        }
      };
      setSocket(ws);
    }
    connectToWS();
  }, []);

  return <div>{JSON.stringify(candles)}</div>;
};

export default App;
