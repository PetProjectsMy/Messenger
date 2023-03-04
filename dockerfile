FROM node:18

EXPOSE 3000

WORKDIR /root/app;

COPY yarn.lock ./

RUN yarn

CMD ["tail", "-f", "/dev/null"]
