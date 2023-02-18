FROM node:18-alpine As build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine As production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./.env
COPY --from=build /app/doc ./doc
CMD ["sh", "-c",  "node dist/main.js 2>&1 | tee -a /logs/app/app.log"]
EXPOSE 4000