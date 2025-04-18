# Imagem única para build e produção
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Instalar todas as dependências (incluindo dev)
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

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