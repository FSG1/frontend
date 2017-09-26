FROM node:alpine

MAINTAINER Tobias Derksen <tobias.derksen@student.fontys.nl>

USER root

RUN apk update \
  && apk add --update alpine-sdk \
  && npm install -g @angular/cli@1.4.3 \
  && ng set --global packageManager=yarn \
  && apk del alpine-sdk

RUN mkdir -p /usr/src/fmms
COPY . /usr/src/fmms

WORKDIR /usr/src/fmms
RUN npm i

EXPOSE 4200

ENTRYPOINT ["ng"]
CMD ["serve"]
