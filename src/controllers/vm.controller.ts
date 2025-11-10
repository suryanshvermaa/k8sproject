import {Response,NextFunction } from "express";
import { createVm, deleteVm } from "../k8s/operations/create.and.delete.vm";
import { response } from "../middlewares/response";
import { AppError } from "../middlewares/error";
import { AuthRequest } from "../middlewares/authorisation";
import prisma from "../config/db";
import "dotenv/config";

 
export const launchVM=async(req:AuthRequest,res:Response,next:NextFunction)=>{
   try {
    const {image,password,duration,vm}=req.body;
    const vmId="vm"+Date.now()+req.user;
    if(!vmId || !password||!duration||!vm||!image){
        return next(new AppError("Please provide all required fields",400));
    }
    //random unique subdomain mapping only containing lowercase letters and numbers
    const subdomain=Math.random().toString(36).substring(2,10);
    const devLoacalMapping:{
        [key:string]:string
    }={
        "suryanshvermaa/vs-code:1.0.1":`vs-code-${subdomain}`,
        "suryanshvermaa/ubuntu:1.0.0":`ubuntu-${subdomain}`,
        "suryanshvermaa/chrome:1.0.0":`chrome-${subdomain}`,
        "suryanshvermaa/centos:1.0.0":`centos-${subdomain}`,
    };
    let url=`http://${devLoacalMapping["suryanshvermaa/vs-code:1.0.1"]}.suryanshverma.live:3000`;
    let ingressPath=`${devLoacalMapping["suryanshvermaa/vs-code:1.0.1"]}.suryanshverma.live`;
    // const url=`https://${vmId}.suryanshverma.site:6901`; //for production
    // const ingressPath=${vmId}.suryanshverma.site // for production
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