FROM node:16-alpine as dependencies
WORKDIR /tfpers-ui
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /tfpers-ui
COPY . .
# ARG APP_API_BASE_URL
# ENV BACKEND_URL=http://20.205.128.164:5000
# ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAU-CeTSxBQyLfG0h22FNFWRd2nmA-p_XA
# ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tfpers.firebaseapp.com
# ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=tfpers
# ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tfpers.appspot.com
# ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=351724766872
# ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:351724766872:web:e5c8e0f2bc6277122b32ed
# ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-MVBQHEF7Z1
# ARG APP_API_BASE_URL
# ENV BACKEND_URL=$APP_API_BASE_URL
COPY /tfpers-ui/.env ./.env.development
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