import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";

export const generateAuthToken=(data:object):Promise<string|string>=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const token=await jwt.sign(data,process.env.JWT_SECRET!,{expiresIn:'1d'});
            resolve(token);
        } catch (error:any) {
            reject(error);
        }
    })
}

export const verifyAndDecodeAuthToken=(token:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET!);
            resolve(decodedToken);
        } catch (error:any) {
            reject(error);
        }
    })
}

export const hashedPassword=(password:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const hash=await bcrypt.hash(password,10);
            resolve(hash);
        } catch (error:any) {
            reject(error);
        }
    })
}

export const comparePassword=async(password:string,hashedPassword:string):Promise<boolean>=>{
    return await bcrypt.compare(password,hashedPassword);
}