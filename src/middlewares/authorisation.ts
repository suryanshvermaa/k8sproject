import { NextFunction, Request,Response } from "express";
import { verifyAndDecodeAuthToken } from "../auth/tokens";
import { AppError } from "./error";

export interface AuthRequest extends Request{
    user?:string
}
export const authMiddleware=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authToken=req.body.authToken||req.query.authToken;
    if(!authToken) return next(new AppError("Unathorised",400));
    const user=await verifyAndDecodeAuthToken(authToken);
    if(!user) return next(new AppError("Unauthorised",401));
    const {userId}=JSON.parse(JSON.stringify(user));
    req.user=userId;
    return next();
}