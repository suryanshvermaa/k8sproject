import { createDeployment, createIngress, createService, deleteDeployment, deleteIngress, deleteService } from "./vm.operation";

interface VM{
    vmId: string
    image: string
    password: string
}

export const createVm= async (vm:VM) =>{
    const {vmId,image,password}=vm;
    await createDeployment({
        image,
        password,
        vmId
    });
    await createService({vmId})
    await createIngress({vmId});
}

export const deleteVm=async(vmId:string)=>{
    await deleteIngress(vmId);
    await deleteService(vmId);
    await deleteDeployment(vmId).catch((err:any)=>{
        console.log(err.message);
    })
}