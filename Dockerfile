FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

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