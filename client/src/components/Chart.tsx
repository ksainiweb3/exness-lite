import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import type { Candle } from "../../types";
import type { UTCTimestamp } from "lightweight-charts";

export default function CandleChart({
  candles,
  title,
}: {
  candles: Candle[];
  title: string;
}) {
  const chartContainerRef = useRef<null | HTMLDivElement>(null);
  console.log(candles);
  useEffect(() => {
    if (!chartContainerRef.current || !candles) return;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData(
      candles.map((candle) => {
        const candleData = {
          time: Math.floor(candle.ts / 1000) as UTCTimestamp,
          open: candle.o,
          high: candle.h,
          low: candle.l,
          close: candle.c,
        };
        console.log(candleData);
        return candleData;
      })
    );
    const handleResize = () =>
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candles]);

  return (
    <div className="h-screen">
      <h1>{title}</h1>
      <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
