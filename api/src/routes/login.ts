import { Router, Request, Response, NextFunction } from "express";

import { loginSchema, validate } from "../validation";
import { User } from "../models";
import { logIn, logOut } from "../auth";
import { guest, auth, catchAsync } from "../middleware";
import logger from "../logger";
import { Unauthorized } from "../errors";

const router = Router();

router.post(
  "/login",
  guest,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    logger.info(JSON.stringify(req.body));
    await validate(loginSchema, req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password)))
      throw new Unauthorized("Incorrect email or password");

    logIn(req, user.id);

    res.json({ message: "OK" });
  })
);

router.post(
  "/logout",
  auth,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await logOut(req, res);
    res.json({ message: "OK" });
  })
);
export default router;
