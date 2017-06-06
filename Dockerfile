FROM nginx:alpine
MAINTAINER Stepan Kuzmin <to.stepan.kuzmin@gmail.com>

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
