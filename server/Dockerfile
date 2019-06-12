FROM node:10-alpine as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
EXPOSE 3001

FROM base as development
ENV NODE_ENV development
RUN npm install
CMD ["npm", "start"]