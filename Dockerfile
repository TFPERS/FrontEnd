FROM node:16-alpine as dependencies
WORKDIR /tfpers-ui
COPY package.json yarn.lock ./
RUN yarn install 

FROM node:16-alpine as builder
WORKDIR /tfpers-ui
COPY . .
# COPY ./.env.development /tfpers-ui/.env
COPY --from=dependencies /tfpers-ui/node_modules ./node_modules
RUN  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_API_KEY \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_APP_ID \
  --mount=type=secret,id=NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID \
   export NEXT_PUBLIC_FIREBASE_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_API_KEY) && \
   export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) && \
   export NEXT_PUBLIC_FIREBASE_PROJECT_ID=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_PROJECT_ID) && \
   export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) && \
   export NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) && \
   export NEXT_PUBLIC_FIREBASE_APP_ID=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_APP_ID) && \
   export NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$(cat /run/secrets/NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) && \
   yarn build

FROM node:16-alpine as runner
WORKDIR /tfpers-ui

COPY --from=builder /tfpers-ui/next.config.js ./
COPY --from=builder /tfpers-ui/public ./public
COPY --from=builder /tfpers-ui/.next ./.next
COPY --from=builder /tfpers-ui/node_modules ./node_modules
COPY --from=builder /tfpers-ui/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]

# FROM nginx:alpine as production-stage

# COPY nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]