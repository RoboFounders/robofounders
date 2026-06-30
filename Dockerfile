# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package configurations
COPY frontend/package.json frontend/yarn.lock* ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the production assets
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
