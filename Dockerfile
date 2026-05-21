## Build stage
FROM node:22-slim AS build-stage

WORKDIR /app

# Pin pnpm to match `packageManager` in package.json.
# Avoid `npm i -g pnpm` + `pnpm self-update`: deja la toolchain no reproducible
# y un bump puede cambiar el formato de allowBuilds.
RUN npm install -g pnpm@11.0.9

# Copy ALL pnpm config files BEFORE install:
#   - pnpm-workspace.yaml lleva `allowBuilds: { esbuild, @tailwindcss/oxide }`
#     (sin esto pnpm 11 aborta con ERR_PNPM_IGNORED_BUILDS).
#   - .npmrc lleva `node-linker=hoisted` (necesario para los binarios nativos).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install with frozen lockfile (modo CI).
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

## Production stage
FROM nginx:stable-alpine AS production-stage

RUN apk add --no-cache bash
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
