# Kubernetes Cluster Setup and Application Deployment
## Creating a Kubernetes Cluster
```bash
 kind create cluster --name=suryansh-cluster --config=./cluster.yaml
 ```
 ## installing NGINX Ingress Controller
```bash
kubectl apply -f ./nginx_controller.yaml -f ./namespace.yaml
```

## pods status
```bash
kubectl get pods -n ingress-nginx --watch
```

 ## port-forwarding to access services
```bash
kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 3000:80
```

## Testing Ingress
### deploying application manifests
```bash
kubectl apply -f ../testk8smanifests/ -f ../testk8smanifests/app
```
### checking deployed pods
```bash
kubectl get pods --watch
```

## deleting the cluster
```bash
 kind delete cluster --name=suryansh-cluster
 ```