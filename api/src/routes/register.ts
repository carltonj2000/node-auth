import { Router } from "express";

import { registerSchema } from "../validation";
import { User } from "../models";
import { logIn } from "../auth";
import { guest } from "../middleware";
const router = Router();

router.post("/register", guest, async (req, res) => {
  //router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
    const { email, name, password } = req.body;
    const found = await User.exists({ email });

    if (found) throw new Error("Invalid email");

    const user = await User.create({ email, name, password });

    logIn(req, user.id);

    res.json({ msg: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ msg: "fail", error: err.message });
  }
});

export default router;
