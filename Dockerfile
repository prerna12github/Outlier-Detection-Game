# ==========================================
# Multi-stage Dockerfile for OUTLIER HUNT
# ==========================================

# ------------------------------------------
# Stage 1: Build the application
# ------------------------------------------
FROM docker.io/oven/bun:1-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package.json bun.lock* bunfig.toml* ./

# Install project dependencies
RUN bun install --frozen-lockfile

# Copy application source files
COPY . .

# Build the standalone production server bundle (using Nitro node-server preset)
ENV NITRO_PRESET=node-server
RUN bun run build

# ------------------------------------------
# Stage 2: Minimal Production Runtime
# ------------------------------------------
FROM docker.io/library/node:22-alpine AS runner

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
LABEL org.opencontainers.image.source="https://github.com/prerna12github/Outlier-Detection-Game"
LABEL org.opencontainers.image.description="OUTLIER HUNT - Spot the Odd. Master the Data."

# Run container as non-root user for security
USER node

# Copy only the compiled standalone output from builder stage
COPY --from=builder --chown=node:node /app/.output ./.output

# Expose default application port
EXPOSE 3000

# Built-in health check using Node.js native fetch API
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 3000)).then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start the standalone server
CMD ["node", ".output/server/index.mjs"]
