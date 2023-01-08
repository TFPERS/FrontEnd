# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
# RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./config/nginx.conf /etc/nginx/conf.d/nginx.conf

# Expose the listening port
EXPOSE 80
EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]