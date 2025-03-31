import { V1Ingress } from "@kubernetes/client-node"
import "dotenv/config"

export const ingressManifest=async(vmId:string)=>{
    const ingManifest:V1Ingress={
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata:{
            name: vmId,
            namespace:"vm-namespace"
        },
        spec:{
            ingressClassName: "nginx",
            rules: [
                {
                    host: `vm.${process.env.hostName!}`, //this is only for local testing, in production it will be the dynamic domain name of the server like ${vmId}.example.com
                    http:{
                        paths:[
                            {
                                path:'/',
                                pathType:"Prefix",
                                backend:{
                                    service:{
                                        name:vmId,
                                        port:{
                                            number: 6901
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }

    }
    return ingManifest;
}
