FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the frontend
RUN npm run build

# Build the production server (não usando o script padrão para evitar dependências do Vite)
RUN npx esbuild server/production-entry.ts server/routes.ts server/storage.ts server/vite.ts server/db.ts shared/schema.ts --platform=node --bundle --format=esm --outdir=dist

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package.json package-lock.json ./

# Install all dependencies (incluindo as de desenvolvimento necessárias para o Vite)
RUN npm ci

# Copy build artifacts from build stage
COPY --from=build /app/dist /app/dist

# Expose port 5000 (the port used in your server)
EXPOSE 5000

# Default environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Note: Database environment variables should be provided during container runtime:
# - DATABASE_URL=postgresql://username:password@host:port/database
# - PGUSER=username
# - PGPASSWORD=password
# - PGHOST=host
# - PGPORT=port
# - PGDATABASE=database

# Start the application
CMD ["npm", "run", "start"]