import { V1Ingress } from "@kubernetes/client-node"
import "dotenv/config"

export const ingressManifest=async(vmId:string,url:string)=>{
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
                    host: url,
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
