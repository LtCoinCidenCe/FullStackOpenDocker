FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --force

USER node

CMD ["npm", "run", "start"]
