#FROM node:latest as node
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build

FROM nginx:alpine
COPY deployServer/default.conf /etc/nginx/conf.d/
COPY dist/meinmusikapp /usr/share/nginx/html