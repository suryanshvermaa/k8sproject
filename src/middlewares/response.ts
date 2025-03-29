import { Response } from "express";

export const response=(res:Response,status:number,message:string,data:object)=>{
    return res.status(status).json({
        success:true,
        message,
        data
    })
}