FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
# Includes .env / .env.local when present — `next build` loads them itself and
# inlines the NEXT_PUBLIC_* values into the client bundle.
COPY . .

# Fallback for builds without .env (it is gitignored, so Dokploy's git-based
# build will not have it): pass these as build args instead.
ARG NEXT_PUBLIC_STRAPI_URL=""
ARG NEXT_PUBLIC_SITE_URL=""

ENV NODE_ENV=production

# Empty args are unset rather than exported: Next gives real process env
# precedence over .env files, so an empty var would shadow the .env value.
RUN set -e; \
    [ -n "$NEXT_PUBLIC_STRAPI_URL" ] || unset NEXT_PUBLIC_STRAPI_URL; \
    [ -n "$NEXT_PUBLIC_SITE_URL" ] || unset NEXT_PUBLIC_SITE_URL; \
    npm run build

FROM base AS runner
ENV NODE_ENV=production
# Default port; override at runtime with -e PORT=... or PORT in .env.
ARG PORT=3000
ENV PORT=${PORT}
# Must bind 0.0.0.0 or the standalone server is unreachable from the proxy.
ENV HOSTNAME=0.0.0.0
WORKDIR /app

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Next's standalone output bundles .env; drop it so no secret ships in the
# image. Runtime values come from the container environment instead.
RUN rm -f .env .env.local .env.production

USER nextjs
EXPOSE ${PORT}
CMD ["node", "server.js"]
