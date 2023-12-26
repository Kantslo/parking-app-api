import { Schema, model } from "mongoose";
import { AdminType } from "../types/user-types";
import { v4 as uuid } from "uuid";

const { Boolean } = Schema.Types;

const adminSchema = new Schema<AdminType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    default: uuid,
  },
  admin: {
    type: Boolean,
    default: true,
  }
});

const Admin = model("Admin", adminSchema);

export default Admin;

