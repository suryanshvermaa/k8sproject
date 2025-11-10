# VM App Frontend (Vite + React + TS)

## Runtime configuration

This app reads its backend base URL from a Vite environment variable. Create a `.env` file in `vm-app-frontend/` (not committed) based on `.env.example`:

```
VITE_BACKEND_URI=http://localhost:3000
```

In code, API calls use a centralized axios instance with `baseURL = import.meta.env.VITE_BACKEND_URI` (see `src/lib/api.ts`). Update the value per environment:

- Local dev (port-forward / docker): `http://localhost:3000`
- Ingress (HTTP): `http://vm.suryanshverma.live`
- Ingress (HTTPS): `https://vm.suryanshverma.live`

## Scripts

```
pnpm dev      # start dev server
pnpm build    # build for production
pnpm preview  # preview production build
```

## Notes

- Only variables prefixed with `VITE_` are exposed to the client bundle.
- If you change `.env`, restart the dev server for changes to take effect.
