import { Request, Response } from "express";

import { SESSION_NAME } from "./config";
import logger from "./logger";

export const logIn = (req: Request, useId: string) => {
  req.session!.userId = useId;
};

export const isLoggedIn = (req: Request) => {
  logger.warn(req.session ? req.session.userId : "no session id");
  return !!req.session!.userId;
};

export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, rej) => {
    req.session!.destroy((err: Error) => {
      if (err) return rej(err);
      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
