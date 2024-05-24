# Stage 1: Build the React application
FROM node:20-alpine3.20 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json .

RUN npm set registry https://registry.npmmirror.com/

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

ENV NODE_ENV production

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]