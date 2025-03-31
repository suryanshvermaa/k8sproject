FROM node:22-alpine AS builder

WORKDIR /app 

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma/ /app/prisma/

RUN npm install --omit=dev

EXPOSE 3000
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

USER nodejs

ENTRYPOINT [ "npm","start" ]