import {Response,NextFunction } from "express";
import { createVm, deleteVm } from "../k8s/operations/create.and.delete.vm";
import { response } from "../middlewares/response";
import { AppError } from "../middlewares/error";
import { AuthRequest } from "../middlewares/authorisation";
import prisma from "../config/db";
import "dotenv/config";

// Only for local env----------------------
const devLoacalMapping={
    "suryanshvermaa/centos:1.0.0" : "centos.suryanshverma.local",
    "suryanshvermaa/vs-code:1.0.1": "vscode.suryanshverma.local",
    "suryanshvermaa/chrome:1.0.0": "chrome.suryanshverma.local",
    "suryanshvermaa/ubuntu:1.0.0": "ubuntu.suryanshverma.local",
}
//------------------------------------------
 
export const launchVM=async(req:AuthRequest,res:Response,next:NextFunction)=>{
   try {
    const {image,password,duration,vm}=req.body;
    const vmId="vm"+Date.now()+req.user;
    if(!vmId || !password||!duration||!vm||!image){
        return next(new AppError("Please provide all required fields",400));
    }
    //for only dev environment
    let url=`https://${devLoacalMapping["suryanshvermaa/vs-code:1.0.1"]}:6901`;
    let ingressPath=devLoacalMapping["suryanshvermaa/vs-code:1.0.1"];
    switch(image){
        case "suryanshvermaa/vs-code:1.0.1":
            url=`https://${devLoacalMapping["suryanshvermaa/vs-code:1.0.1"]}:6901`;
            ingressPath=devLoacalMapping["suryanshvermaa/vs-code:1.0.1"]
            break;
        case "suryanshvermaa/ubuntu:1.0.0":
            url=`https://${devLoacalMapping["suryanshvermaa/ubuntu:1.0.0"]}:6901`;
            ingressPath=devLoacalMapping["suryanshvermaa/ubuntu:1.0.0"]
            break;
        case "suryanshvermaa/chrome:1.0.0":
            url=`https://${devLoacalMapping["suryanshvermaa/chrome:1.0.0"]}:6901`;
            ingressPath=devLoacalMapping["suryanshvermaa/chrome:1.0.0"]
            break;
        case "suryanshvermaa/centos:1.0.0":
            url=`https://${devLoacalMapping["suryanshvermaa/centos:1.0.0"]}:6901`;
            ingressPath=devLoacalMapping["suryanshvermaa/centos:1.0.0"]
            break;
        default:
            return next(new AppError("image is not available",400));
    }
    
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