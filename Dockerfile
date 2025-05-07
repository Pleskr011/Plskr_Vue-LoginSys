FROM node:23-alpine3.20 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# For production
FROM nginx:stable-alpine AS production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN apk add --no-cache bash
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]