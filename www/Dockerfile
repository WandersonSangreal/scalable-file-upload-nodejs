FROM nginx:1.20.0-alpine

RUN apk add --no-cache bash

RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d

# RUN mkdir /var/www/html -p && touch /var/www/html/index.html
