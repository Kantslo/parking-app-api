import Joi, { CustomHelpers } from "joi";
import { NewUser } from "../types";
import { User } from "../models";

const ifUserExists = (user: NewUser | null) => (value: string, helpers: CustomHelpers) => {
  if (user) {
    helpers.error("User with this email already exists!");
  }
  return value;
}

const addUserSchema = async (data: NewUser) => {

  const user = await User.findOne({ email: data.email });

  return Joi.object<NewUser>({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().custom(ifUserExists(user)).required(),
    password: Joi.string().min(8).max(20).required(),
  })
};

export default addUserSchema;