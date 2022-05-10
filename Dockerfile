FROM node:lts as dependencies
WORKDIR /tuitionfeepayment
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /tuitionfeepayment
COPY . .

COPY --from=dependencies /tuitionfeepayment/node_modules ./node_modules
RUN yarn build

# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]