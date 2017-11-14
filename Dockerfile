FROM teracy/angular-cli

LABEL maintainer="Tobias Derksen <tobias.derksen@student.fontys.nl>"

ENV APPLICATION_ENV=develop

RUN mkdir -p /usr/src/fmms
COPY . /usr/src/fmms

WORKDIR /usr/src/fmms
RUN npm i

EXPOSE 4200

STOPSIGNAL SIGTERM

ENTRYPOINT ["ng", "serve", "--host=0.0.0.0"]

# Execute ng to listen on all adresses
CMD ["--env=dev"]
