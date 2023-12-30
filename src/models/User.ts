import { Schema, model } from "mongoose"
import { UserType } from "../types/user-types";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;
const { Boolean } = Schema.Types;
const { Number } = Schema.Types;

const userSchema = new Schema<UserType>({
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
    default: false
  },
  balance: {
    type: Number,
    default: 100,
  }
});

const User = model("User", userSchema);

export default User;