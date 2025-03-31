"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmServiceManifest = exports.vmDeploymentManifest = void 0;
/* Deployment manifest for a VM in Kubernetes
* @param image - The image to use for the VM
* @param vmId - The ID of the VM
* @param password - The password for the VM
* @return - The deployment manifest for the VM
*/
const vmDeploymentManifest = (image, vmId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const deployment = {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
            name: vmId,
            labels: {
                app: vmId,
            },
            namespace: "vm-namespace",
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {
                    app: vmId,
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: vmId,
                    }
                },
                spec: {
                    containers: [
                        {
                            name: "vm-container",
                            image: image,
                            ports: [
                                {
                                    containerPort: 6901,
                                }
                            ],
                            env: [
                                {
                                    name: "VNC_PW",
                                    value: password,
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };
    return deployment;
});
exports.vmDeploymentManifest = vmDeploymentManifest;
/* Service manifest for a VM in Kubernetes
* @param vmId - The ID of the VM
* @return - The service manifest for the VM
*/
const vmServiceManifest = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: vmId,
            labels: {
                app: vmId,
            },
            namespace: "vm-namespace",
        },
        spec: {
            selector: {
                app: vmId,
            },
            ports: [
                {
                    protocol: "TCP",
                    port: 6901,
                    targetPort: 6901,
                }
            ]
        }
    };
    return service;
});
exports.vmServiceManifest = vmServiceManifest;
