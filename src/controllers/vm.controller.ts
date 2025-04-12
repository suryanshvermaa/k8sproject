import {Response,NextFunction } from "express";
import { createVm, deleteVm } from "../k8s/operations/create.and.delete.vm";
import { response } from "../middlewares/response";
import { AppError } from "../middlewares/error";
import { AuthRequest } from "../middlewares/authorisation";
import prisma from "../config/db";
import "dotenv/config";

// interface VMTypes={
//     image: "suryanshvermaa/vs-code:1.0.1" | "suryanshvermaa/ubnutu:1.0.0";
//     password: string;
//     url:string;
//     duration:number //in minutes
//     vm: "vscode" | "ubuntu"
//     name:string
// }
 
export const launchVM=async(req:AuthRequest,res:Response,next:NextFunction)=>{
   try {
    const {image,password,duration,vm}=req.body;
    const vmId="vm"+Date.now()+req.user;
    if(!vmId || !password||!duration||!vm||!image){
        return next(new AppError("Please provide all required fields",400));
    }
    const url="https://vscode.suryanshverma.local";
    const ingressPath="vscode.suryanshverma.local";
    // const url=`https://${vmId}.suryanshverma.site:6901`; //for production
    const createdVm=await prisma.vM.create({
        data:{
            name:vmId,
            password,
            status:"active",
            duration,
            userId:Number(req.user),
            url,
            vm:vmId,
        }
    });
    await createVm({vmId,image,password,url:ingressPath});
    setTimeout(async()=>{
        await deleteVm(vmId);
        const deleteVM=await prisma.vM.deleteMany({
            where:{
                name:vmId
            }
        });
        console.log(deleteVM);
    },1000*60*Number(createdVm.duration));
    response(res,201,"vm created successfully",{name:createdVm.id,url:createdVm.url,duration:createdVm.duration,port:6901});
   } catch (error:any) {
    console.log(error.message);
    return next(error);
   }
}