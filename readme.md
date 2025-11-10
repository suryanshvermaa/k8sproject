<div align="center">

# ⚡️ VM Launchpad — Ephemeral Workspaces on Kubernetes

Spin up ephemeral VMs on Kubernetes with a TypeScript/Express API and a modern React frontend. WebSocket‑friendly ingress, Prisma/PostgreSQL persistence, and a slick dark UI. 🚀

![Home Screenshot](./readmeAssets/home-page.png)

</div>


## ✨ Features

- 🔐 Auth: Signup/Login with JWT, cookie storage on the frontend
- 🖥️ VM Launcher: Create short‑lived VM workspaces via Kubernetes API
- 📦 Persistence: PostgreSQL via Prisma ORM
- 🧰 Infra: NGINX Ingress with WebSockets and HTTPS upstream
- 🧭 DX: Vite + React + TypeScript frontend, Tailwind‑style utility classes
- 🐳 Containerized: Dockerfiles for backend; docker‑compose for DB

![VM Page](./readmeAssets/vm-page.png)

---

## 🗂️ Monorepo layout

```
k8sproject/
├─ src/                      # Express API (TypeScript)
│  ├─ controllers/           # user, vm controllers
│  ├─ middlewares/           # auth/error/response
│  ├─ k8s/                   # manifests + operations (create/delete)
│  └─ routes/                # /api/v1, /vm
├─ prisma/                   # Prisma schema + migrations
├─ vm-app-frontend/          # React + Vite frontend
├─ k8s_local/                # Local cluster manifests
├─ testk8smanifests/         # Test ingress/service/deployment
├─ initDbScript/init.sql     # DB bootstrap
├─ docker-compose.yml        # Postgres (and optional Redis)
├─ Dockerfile                # Backend container build
└─ readmeAssets/             # README images
```

---

## 🔧 Backend (Express + Prisma)

- Entry: `src/index.ts`
- Routes:
	- `POST /api/v1/signup`
	- `POST /api/v1/login`
	- `POST /vm/createVM` (Protected)
- Prisma models: `User`, `VM` (see `prisma/schema.prisma`)
- Kubernetes ops: `src/k8s/operations/create.and.delete.vm.ts`

Environment (.env in project root):

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="change-me"
# Optional
REDIS_URL="redis://:password@localhost:6379"
PORT=4000
```

Install + Dev:

```bash
pnpm install
pnpm dev           # runs src/index.ts with nodemon
```

Build + Run:

```bash
pnpm build
node dist/index.js
```

Docker (server listens on PORT, default 4000; Dockerfile EXPOSE is 3000 — set PORT to 3000 or map accordingly):

```bash
docker build -t vm-backend .
docker run -p 3000:3000 -e PORT=3000 --env-file .env vm-backend
```

Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## 🖥️ Frontend (React + Vite)

- Path: `vm-app-frontend/`
- Runtime config via Vite env:

```
# vm-app-frontend/.env
VITE_BACKEND_URI=http://localhost:3000
```

Commands:

```bash
cd vm-app-frontend
pnpm install
pnpm dev
# build
pnpm build && pnpm preview
```

Axios instance reads `VITE_BACKEND_URI` (see `src/lib/api.ts`). UI includes a dark/light toggle and glass/gradient theme.

---

## 🐘 Database (Docker Compose)

Postgres 18+ expects mounting `/var/lib/postgresql` (parent dir). Compose is set to a named `pgdata` volume.

```bash
docker compose up -d postgres
```

If you previously used `./db_data` at `/var/lib/postgresql/data`, see Postgres 18 migration notes. You can move old data out (fresh start) or run `pg_upgrade`.

Init script runs from `initDbScript/init.sql`.

---

## ☸️ Kubernetes & Ingress

- Test manifests: `testk8smanifests/` (Service/Deployment/Ingress)
- Ingress notes:
	- WebSocket ready via `proxy-http-version: "1.1"`, extended timeouts
	- Cluster blocks `configuration-snippet` for security; using standard annotations
	- Backend is HTTPS; ingress proxies with `nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"`

Apply (example):

```bash
kubectl apply -f testk8smanifests/
# forward ingress locally if needed
kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 3000:80
```

---

## 🔑 Auth quick test

```bash
curl -X POST "$VITE_BACKEND_URI/api/v1/signup" \
	-H 'Content-Type: application/json' \
	-d '{"name":"John","email":"john@example.com","password":"Password@123"}'

curl -X POST "$VITE_BACKEND_URI/api/v1/login" \
	-H 'Content-Type: application/json' \
	-d '{"email":"john@example.com","password":"Password@123"}'
```

For `POST /vm/createVM` include the `authToken` from login (frontend stores it in a cookie and sends in body as used by the app).

---

## 🧩 Troubleshooting

- Ingress 502s to backend: ensure `backend-protocol: "HTTPS"` and (for self‑signed) `proxy-ssl-verify: "off"` or provide a CA via `proxy-ssl-secret`.
- Postgres 18 error about `/var/lib/postgresql/data`: switch to `/var/lib/postgresql` (already done in compose) or migrate data as per upstream docs.
- Container port mismatch: backend default `PORT=4000`, Dockerfile `EXPOSE 3000`; set `PORT=3000` in the container or map host accordingly.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit with clear messages
4. Open a PR 🚀

---

Made with ❤️ by Suryansh — happy hacking!

