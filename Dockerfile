# Build stage
FROM node:18-alpine AS builder

# Define build arguments
ARG NEXT_PUBLIC_API_URL

# Set environment variables from build args
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies) for build
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Clear Next.js cache
RUN rm -rf .next/cache

# Build application
RUN npm run build

# Clear npm cache to reduce image size
RUN rm -rf ~/.npm

# Run stage
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Set non-root user for security and setup cache directory
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && mkdir -p /app/.next/cache/images \
    && chown -R appuser:appgroup /app/.next
USER appuser

# Expose port 3005
EXPOSE 3005

# Run application with next start on port 3005
CMD ["npx", "next", "start", "-p", "3005"]