FROM node:16-alpine as dependencies
WORKDIR /tfpers-ui
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /tfpers-ui
COPY . .
# ARG APP_API_BASE_URL
ENV BACKEND_URL=$BACKEND_URL
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
COPY --from=dependencies /tfpers-ui/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /tfpers-ui

COPY --from=builder /tfpers-ui/next.config.js ./
COPY --from=builder /tfpers-ui/public ./public
COPY --from=builder /tfpers-ui/.next ./.next
COPY --from=builder /tfpers-ui/node_modules ./node_modules
COPY --from=builder /tfpers-ui/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]