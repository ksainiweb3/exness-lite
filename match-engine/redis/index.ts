import { createClient } from "redis";

const subscriber = createClient({
  url: "redis://localhost:6379",
});
const publisher = createClient({
  url: "redis://localhost:6379",
});
await subscriber.connect();
await publisher.connect();

export { subscriber, publisher };
