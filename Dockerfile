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

# Start the application
CMD ["npm", "run", "start"]