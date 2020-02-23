import { Request } from "express";

export const logIn = (req: Request, useId: string) => {
  req.session!.userId = useId;
};

export const isLoggedIn = (req: Request) => !!req.session!.userId;
