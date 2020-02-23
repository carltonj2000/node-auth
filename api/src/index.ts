import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import mongoose from "mongoose";

import { createApp } from "./app";

import { REDIS_OPTIONS, APP_PORT, MONGO_OPTIONS, MONGO_URI } from "./config";

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const RedisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () =>
    console.log(`Listening on http://localhost:${APP_PORT}`)
  );
})();
