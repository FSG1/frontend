FROM teracy/angular-cli

LABEL maintainer="Tobias Derksen <tobias.derksen@student.fontys.nl>"

RUN mkdir -p /usr/src/fmms
COPY . /usr/src/fmms

WORKDIR /usr/src/fmms
RUN npm i

EXPOSE 4200

STOPSIGNAL SIGTERM

ENTRYPOINT ["ng"]

# Execute ng to listen on all adresses
CMD ["serve", "--host=0.0.0.0"]
