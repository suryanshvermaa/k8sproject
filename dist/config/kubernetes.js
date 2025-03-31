"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.k8sNetworkingApi = exports.k8sCoreApi = exports.k8sApi = void 0;
const client_node_1 = __importDefault(require("@kubernetes/client-node"));
const k8sClient = new client_node_1.default.KubeConfig();
k8sClient.loadFromDefault();
exports.k8sApi = k8sClient.makeApiClient(client_node_1.default.AppsV1Api);
exports.k8sCoreApi = k8sClient.makeApiClient(client_node_1.default.CoreV1Api);
exports.k8sNetworkingApi = k8sClient.makeApiClient(client_node_1.default.NetworkingV1Api);
