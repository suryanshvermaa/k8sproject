import { Request,Response } from "express";
import { AppError } from "../middlewares/error";
import prisma from "../config/db";
import { response } from "../middlewares/response";

export const signup=async(req:Request,res:Response)=>{
   try {
    const {email,name,password}=req.body;
    if(!email||!name||!password) throw new AppError("All fields are required",400);
    if(String(password).length<8) throw new AppError("Password length should be 8 more that 8",400);
    const user=await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    })
    response(res,201,"User created successfully",{
        
    });

   } catch (error:any) {
    
   }
}