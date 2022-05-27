FROM node:16-alpine as dependencies
WORKDIR /tfpers-ui
COPY package.json yarn.lock ./
RUN yarn install 

FROM node:16-alpine as builder
WORKDIR /tfpers-ui
COPY . .
COPY ./.env.development /tfpers-ui/.env
COPY --from=dependencies /tfpers-ui/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /tfpers-ui

COPY --from=builder /tfpers-ui/next.config.js ./
COPY --from=builder /tfpers-ui/public ./public
COPY --from=builder /tfpers-ui/.next ./.next
COPY --from=builder /tfpers-ui/node_modules ./node_modules
COPY --from=builder /tfpers-ui/package.json ./package.json

# EXPOSE 3000
# CMD ["yarn", "start"]

FROM nginx:alpine as production-stage

COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]