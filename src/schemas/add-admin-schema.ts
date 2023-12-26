import Joi, { CustomHelpers } from "joi";
import Admin from "../models/Admin.js";
import { AdminType } from "../types/user-types";

const ifAdminExists = (admin: AdminType | null) => (value: string, helpers: CustomHelpers) => {
  if (admin) {
    helpers.error("User with this email already exists!");
  }
  return value;
}

const addAdminSchema = async (data: AdminType) => {

  const admin = await Admin.findOne({ email: data.email, admin: true });

  return Joi.object<AdminType>({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().custom(ifAdminExists(admin)).required(),
    password: Joi.string().min(8).max(20).required(),
  })
};

export default addAdminSchema;