FROM golang:1.14

ENV GO111MODULE=on
WORKDIR /server

COPY /client/build client

COPY /server/go.mod .

RUN go mod download
COPY /server .

RUN go build

EXPOSE 8080
ENTRYPOINT ["/server/nothing"]