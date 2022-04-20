FROM node:16.14-alpine as build
LABEL maintainer="Vuosoft / Ville Nupponen <ville.nupponen@vuosoft.fi"
ENV NODE_ENV=production

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --silent

COPY tsconfig.json /app/
COPY src /app/src
COPY public /app/public

RUN yarn build


FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
