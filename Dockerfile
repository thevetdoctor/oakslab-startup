FROM node:18.19.0 As development

WORKDIR /app

COPY package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18.19.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]
