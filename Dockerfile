# build client
FROM node as client-build
WORKDIR /app/client

COPY /client/package.json .
COPY /client/package-lock.json .
RUN npm i

COPY /client .
RUN npm run build

# build and init Go server
FROM golang:1.14

ENV GO111MODULE=on
WORKDIR /app/server

COPY --from=client-build /app/client/build client

COPY /server/go.mod .

RUN go mod download
COPY /server .

RUN go build

EXPOSE 80
ENTRYPOINT ["/app/server/nothing"]