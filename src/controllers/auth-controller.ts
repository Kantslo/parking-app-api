import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "models/User";
import addUserSchema from "../schemas/add-user-schema.js";

export const createUser = async (req: Request, res: Response) => {

  const { body } = req;

  try {
    const validator = await addUserSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { name, email, password } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};