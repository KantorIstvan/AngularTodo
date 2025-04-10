# Stage 1: Build Angular app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Updated path to include the browser subdirectory
COPY --from=build /app/dist/todo-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf