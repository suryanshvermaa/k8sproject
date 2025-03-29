import k8s from "@kubernetes/client-node";

const k8sClient=new k8s.KubeConfig();
k8sClient.loadFromDefault();

export const k8sApi=k8sClient.makeApiClient(k8s.AppsV1Api);
export const k8sCoreApi=k8sClient.makeApiClient(k8s.CoreV1Api);