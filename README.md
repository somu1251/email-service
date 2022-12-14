<p align="center">
  Email Service
</p>


## Description

Email delivery service.

## Prerequisites 
* SendGrid account
* Redis server
* Create environment configuration(refer .env.sample file)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Application Host and PORT
application is running on 3000 port

## API documentation
open any browser and enter below url

```
http://localhost:3000/app/docs

```
![alt text](https://github.com/somu1251/email-service/blob/master/docs/swagger.jpg?raw=true)

## License

[MIT licensed](LICENSE).
