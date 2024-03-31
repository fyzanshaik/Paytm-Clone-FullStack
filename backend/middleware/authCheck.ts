import { Request,Response ,NextFunction, RequestHandler} from "express";
import JWT_SECRET  from "../config/config";
import jwt from "jsonwebtoken"
import {User} from "../models/User"

interface CustomRequest extends Request{
  userId?: string
}

interface JwtPayload {
  userId : string;
}

const authMiddleware:RequestHandler = async (req:CustomRequest, res:Response, next:NextFunction) => {
  const authHeader:string|undefined = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token:string = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findOne({ userName: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Authorization failed:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware