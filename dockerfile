FROM node:18

RUN yarn add -D express

WORKDIR /root/app/

COPY . ./

CMD ["node", "server.js"]

