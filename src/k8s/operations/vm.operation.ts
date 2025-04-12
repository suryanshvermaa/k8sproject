import { V1Deployment } from "@kubernetes/client-node";
import { k8sApi, k8sCoreApi, k8sNetworkingApi } from "../../config/kubernetes";
import { vmDeploymentManifest, vmServiceManifest } from "../k8manifests/vm.manifest";
import { ingressManifest } from "../k8manifests/vm.ingress";

interface Deployment{
    vmId: string;
    image: string;
    password: string;
}

interface Service{
    vmId: string;
}

interface Ingress{
    vmId: string;
    url: string;
}

export const createDeployment= async(deployment:Deployment)=>{
    const {vmId,image,password}=deployment;
    const namespace = "vm-namespace";
    const dep:V1Deployment=await vmDeploymentManifest(image, vmId, password);
    const res=await k8sApi.createNamespacedDeployment({namespace:namespace, body:dep});
    console.log("deployment:",res);
}

export const deleteDeployment= async(vmId:string)=>{
    const namespace = "vm-namespace"; 
    const res=await k8sApi.deleteNamespacedDeployment({namespace:namespace,name:vmId});
    console.log("deployment:",res);
}

export const createService=async(service:Service)=>{
    const {vmId}=service;
    const namespace = "vm-namespace";
    const svc=await vmServiceManifest(vmId)
    const res=await k8sCoreApi.createNamespacedService({namespace:namespace,body:svc});
    console.log("service:",res);
}

export const deleteService=async(vmId:string)=>{
    const namespace="vm-namespace";
    const res=await k8sCoreApi.deleteNamespacedService({namespace:namespace,name:vmId});
    console.log("service:",res);
}

export const createIngress=async(ingress:Ingress)=>{
    const {vmId,url}=ingress;
    const namespace="vm-namespace";
    const ing=await ingressManifest(vmId,url);
    const res=await k8sNetworkingApi.createNamespacedIngress({namespace:namespace,body: ing});
    console.log("ingress:",res);    
}

export const deleteIngress=async(vmId:string)=>{
    const namespace="vm-namespace";
    const res=await k8sNetworkingApi.deleteNamespacedIngress({namespace:namespace,name:vmId});
    console.log("ingress:",res);
}