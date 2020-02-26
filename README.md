# Authentication

## History

The code in this repository is based on the following video series.

- [Authentication in Node.js - #1 Intro](https://www.youtube.com/watch?v=kmAzuH2Lzug&list=PLcCp4mjO-z9_HmJ5rSonmiEGfP-kyRMlI)

## Mongo Commands

- `db.users.find({}).pretty()`
- `db.users.deleteMany({})`

## Redis Commands

- `scan 0`
- `ttl <id>`
- `del <id>`

## Setup API

- npm init -y; npm i --save express
- npm i -D typescript @types/node @types/express
- npx tsc --init

## Setup Web

## Video Notes

### Video 7 - Login & Logout

```sh
curl -v -X POST localhost:3000/login \
 -H 'Content-Type: application/json' \
 -d '{"email": "carlton.joseph@gmail.com", "password": "passW0rd"}'
```

```sh
curl -v -X POST localhost:3000/logout -H 'Content-Type: application/json' \
  --cookie ''
```

### Video 4

```sh
curl -v -X POST localhost:3000/register \
 -H 'Content-Type: application/json' \
 -d '{"email": "carlton.joseph@gmail.com", "name": "Carlton", "password": "passW0rd", "passwordConfirmation": "passW0rd" }'
```

Test if the register route is accessible twice.

```sh
curl -v -X POST localhost:3000/register \
 -H 'Content-Type: application/json' \
 --cookie <cookieId>
```
