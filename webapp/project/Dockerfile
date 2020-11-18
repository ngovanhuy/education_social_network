# base image
FROM node:9.8.0 AS builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
RUN npm run build

# start app
# CMD ["npm", "start"]

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /usr/src/app/build .
# Containers run nginx with global directives and daemon off
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

