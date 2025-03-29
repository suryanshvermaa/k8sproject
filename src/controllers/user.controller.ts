import { NextFunction, Request,Response } from "express";
import { AppError } from "../middlewares/error";
import prisma from "../config/db";
import { response } from "../middlewares/response";
import { comparePassword, generateAuthToken } from "../auth/tokens";

/**
 * @desc    Signup a new user
 * @route   POST /api/v1/user/signup
 * @access  Public
 */
export const signup=async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const {email,name,password}=req.body;
    if(!email||!name||!password) throw new AppError("All fields are required",400);
    if(String(password).length<8)  throw new AppError("Password length should be 8 more that 8",400);
    const emailExist=await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(emailExist) throw new AppError("Email already exists",400);
    const user=await prisma.user.create({
        data:{
            name,
            email,
            password,
            
        }
    })
    const token=await generateAuthToken({
        id:user.id,
        email:user.email
    });
    response(res,201,"User created successfully",{
        id:user.id,
        name:user.name,
        email:user.email,
        authToken:token
    });
   } catch (error:any) {
        next(error);
   }
}


/**
 * @desc    Login a user
 * @route   POST /api/v1/user/login
 * @access  Public
 * */
export const login=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password) throw new AppError("All fields are required",400);
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user) throw new AppError("Invalid credentials",401);
        const isAuthenticated=comparePassword(password,user.password);
        if(!isAuthenticated) throw new AppError("Invalid credentials",401);
        const token=await generateAuthToken({
            id:user.id,
            email:user.email
        });
        response(res,200,"User logged in successfully",{
            id:user.id,
            name:user.name,
            email:user.email,
            authToken:token
        });
    } catch (error) {
        next(error);
    }
}