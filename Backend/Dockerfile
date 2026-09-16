# ============================================================
# LIBRARY SEAT BOOKING SYSTEM - BACKEND DOCKERFILE
# ============================================================

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]