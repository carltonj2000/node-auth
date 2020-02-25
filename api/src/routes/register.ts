import { Router, Request, Response, NextFunction } from "express";

import { registerSchema, validate } from "../validation";
import { User } from "../models";
import { logIn } from "../auth";
import { guest, catchAsync } from "../middleware";
import logger from "../config/winston";
import { BadRequest } from "../errors";
const router = Router();

router.post(
  "/register",
  guest,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    logger.info(JSON.stringify(req.body));
    await validate(registerSchema, req.body);
    const { email, name, password } = req.body;
    const found = await User.exists({ email });

    if (found) throw new BadRequest("Invalid email");

    const user = await User.create({ email, name, password });

    logIn(req, user.id);

    res.json({ msg: "ok" });
  })
);

export default router;
