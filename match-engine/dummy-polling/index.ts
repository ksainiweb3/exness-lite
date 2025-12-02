import { publisher, subscriber } from "../redis";

const INITIAL_SOL_PRICE = 200;

function dummySolPrice() {
  let currSolPrice = INITIAL_SOL_PRICE;

  setInterval(() => {
    let variance = Math.random();
    let varianceMagnitude = Math.ceil((Math.random() + 1) * 5);
    if (variance > 0.5) currSolPrice += varianceMagnitude;
    else currSolPrice -= varianceMagnitude;

    publisher.publish(
      "SOL_USDC",
      JSON.stringify({
        timestamp: Date.now(),
        value: currSolPrice,
      })
    );
  }, 1000);
}

dummySolPrice();
