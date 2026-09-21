# ============================================================
# LIBRARY SEAT BOOKING SYSTEM - BACKEND DOCKERFILE
# ============================================================

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (nodemon needed for start script fallback)
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]