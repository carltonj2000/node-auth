import express from "express";
import session, { Store } from "express-session";
import morgan from "morgan";

import { SESSION_OPTIONS } from "./config";
import { register } from "./routes";
import logger from "./config/winston";
import { serverError, notFound } from "./middleware";

const createApp = (store: Store) => {
  const app = express();

  app.use(morgan("tiny", { stream: logger.stream }));
  app.use(express.json());
  app.use(session({ ...SESSION_OPTIONS, store }));
  app.use(register);
  app.use(notFound);
  app.use(serverError);

  return app;
};

module.exports = {
  createApp
};
