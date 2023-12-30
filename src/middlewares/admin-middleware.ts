import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  admin: boolean;
}

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: "Authorization header missing!"});
  }

  const [, token ] = authorization.trim().split(' ');

  if (!token) {
    return res.status(401).json({error: "Token missing!"});
  }

  try {
    const verified = jwt.verify( token, process.env.JWT_SECRET!);

    const user = jwt.decode(token) as DecodedUser;

    console.log(user)

    if (verified && user.admin) {
      next();
    }
  } catch (error) {
    return res.status(401).json(error);
  }
}

export default adminMiddleware;