FROM node:20-alpine AS base
# NOTE: no libc6-compat. It makes Node report a glibc runtime, so npm installs
# @next/swc-linux-x64-gnu instead of the musl build, and the gnu binary then
# fails to relocate on Alpine ("__register_atfork: symbol not found").
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
# --no-audit/--no-fund skip work that costs memory on small build hosts.
RUN npm ci --no-audit --no-fund

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
# This image is built in GitHub Actions (see .github/workflows/build-image.yml),
# not on the Dokploy VPS, specifically because the VPS doesn't have enough RAM
# to run `next build` (SWC + type-check + static generation) without the
# kernel OOM-killing it mid-build — BuildKit reports that kill as the step
# being CANCELED. Actions runners have far more headroom; don't lower this
# back down to "fit the VPS" without first moving the build back there too.
ENV NODE_OPTIONS=--max-old-space-size=4096

# Empty args are unset rather than exported: Next gives real process env
# precedence over .env files, so an empty var would shadow the .env value.
RUN set -e; \
    [ -n "$NEXT_PUBLIC_STRAPI_URL" ] || unset NEXT_PUBLIC_STRAPI_URL; \
    [ -n "$NEXT_PUBLIC_SITE_URL" ] || unset NEXT_PUBLIC_SITE_URL; \
    if [ -z "$NEXT_PUBLIC_STRAPI_URL" ] && [ ! -f .env ]; then \
      echo "ERROR: NEXT_PUBLIC_STRAPI_URL is not set and no .env file is present."; \
      echo "It is inlined at build time, so the site would ship without a CMS URL."; \
      echo "Set it as a build arg in Dokploy (Build > Build Args)."; \
      exit 1; \
    fi; \
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


RUN rm -f .env .env.local .env.production

USER nextjs
EXPOSE ${PORT}

# Node 20 has a built-in fetch, so no curl/wget needs installing.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
