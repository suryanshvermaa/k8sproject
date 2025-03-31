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
exports.ingressManifest = void 0;
require("dotenv/config");
const ingressManifest = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    const ingManifest = {
        apiVersion: "networking.k8s.io/v1",
        kind: "Ingress",
        metadata: {
            name: vmId,
            namespace: "vm-namespace"
        },
        spec: {
            ingressClassName: "nginx",
            rules: [
                {
                    host: `vm.${process.env.hostName}`, //this is only for local testing, in production it will be the dynamic domain name of the server like ${vmId}.example.com
                    http: {
                        paths: [
                            {
                                path: '/',
                                pathType: "Prefix",
                                backend: {
                                    service: {
                                        name: vmId,
                                        port: {
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
    };
    return ingManifest;
});
exports.ingressManifest = ingressManifest;
