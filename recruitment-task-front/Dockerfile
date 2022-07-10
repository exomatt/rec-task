FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY  ./recruitment-task-front/docker-build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

