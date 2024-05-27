FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .
# This is build time only so it doesn't take compose environments
ENV VITE_BACKEND_URL=api

RUN npm ci

RUN npm run test

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app/ /usr/src/app/

ENV VITE_BACKEND_URL=api

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# if something runs here CMD *** then compose environment works
