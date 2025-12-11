# ==========================
# Stage 1: Build Frontend
# ==========================
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build   # generates dist folder

# ==========================
# Stage 2: Build Backend
# ==========================
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source code
COPY backend/ ./

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copy .env if needed (optional, for production secrets use docker secrets)
# COPY backend/.env ./

# Expose port
EXPOSE 5173  # matches your unified server PORT

# Start server
CMD ["node", "src/index.js"]
