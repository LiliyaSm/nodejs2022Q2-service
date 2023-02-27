FROM node:18-alpine As build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD ["sh", "-c",  "npm run start:dev"]
EXPOSE 4000