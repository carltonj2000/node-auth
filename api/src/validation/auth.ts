import Joi from "@hapi/joi";

import { BCRYPT_MAX_BYTES } from "../config";

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();

const name = Joi.string()
  .min(2)
  .max(BCRYPT_MAX_BYTES, "utf8")
  .trim()
  .required();

const password = Joi.string()
  .min(8)
  .max(128)
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label} must contain one uppercase, lowercase and digit')
  .required();

const passwordConfirmation = Joi.valid(Joi.ref("password")).required();

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation
});
