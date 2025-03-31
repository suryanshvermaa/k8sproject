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
exports.deleteIngress = exports.createIngress = exports.deleteService = exports.createService = exports.deleteDeployment = exports.createDeployment = void 0;
const kubernetes_1 = require("../../config/kubernetes");
const vm_manifest_1 = require("../k8manifests/vm.manifest");
const vm_ingress_1 = require("../k8manifests/vm.ingress");
const createDeployment = (deployment) => __awaiter(void 0, void 0, void 0, function* () {
    const { vmId, image, password } = deployment;
    const namespace = "vm-namespace";
    const dep = yield (0, vm_manifest_1.vmDeploymentManifest)(image, vmId, password);
    const res = yield kubernetes_1.k8sApi.createNamespacedDeployment({ namespace: namespace, body: dep });
    console.log("deployment:", res);
});
exports.createDeployment = createDeployment;
const deleteDeployment = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    const namespace = "vm-namespace";
    const res = yield kubernetes_1.k8sApi.deleteNamespacedDeployment({ namespace: namespace, name: vmId });
    console.log("deployment:", res);
});
exports.deleteDeployment = deleteDeployment;
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const { vmId } = service;
    const namespace = "vm-namespace";
    const svc = yield (0, vm_manifest_1.vmServiceManifest)(vmId);
    const res = yield kubernetes_1.k8sCoreApi.createNamespacedService({ namespace: namespace, body: svc });
    console.log("service:", res);
});
exports.createService = createService;
const deleteService = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    const namespace = "vm-namespace";
    const res = yield kubernetes_1.k8sCoreApi.deleteNamespacedService({ namespace: namespace, name: vmId });
    console.log("service:", res);
});
exports.deleteService = deleteService;
const createIngress = (ingress) => __awaiter(void 0, void 0, void 0, function* () {
    const { vmId } = ingress;
    const namespace = "vm-namespace";
    const ing = yield (0, vm_ingress_1.ingressManifest)(vmId);
    const res = yield kubernetes_1.k8sNetworkingApi.createNamespacedIngress({ namespace: namespace, body: ing });
    console.log("ingress:", res);
});
exports.createIngress = createIngress;
const deleteIngress = (vmId) => __awaiter(void 0, void 0, void 0, function* () {
    const namespace = "vm-namespace";
    const res = yield kubernetes_1.k8sNetworkingApi.deleteNamespacedIngress({ namespace: namespace, name: vmId });
    console.log("ingress:", res);
});
exports.deleteIngress = deleteIngress;
