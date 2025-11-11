# Stage 1: build the production bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies based on package-lock for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy the rest of the project and create the optimized build
COPY . .
RUN npm run build

# Stage 2: serve the build with Nginx
FROM nginx:1.27-alpine AS runner

# Copy a custom Nginx configuration tailored for a Vite SPA
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production build output to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Use the default Nginx start command
CMD ["nginx", "-g", "daemon off;"]
