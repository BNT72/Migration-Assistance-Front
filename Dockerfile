FROM node:16-alpine

RUN apk add git && git clone https://github.com/BNT72/Migration-Assistance-Front.git && cd Migration-Assistance-Front && yarn

WORKDIR ./Migration-Assistance-Front

EXPOSE 8081

CMD yarn start