# Symphonia-Back-end

![logo](./assets/icons/TheLogo.png)

The back end of Symphonia website (a spotify-like music streaming application)

[![GitHub contributors](https://img.shields.io/github/contributors/Etshawy1/Symphonia-Back-end)](https://github.com/Etshawy1/Symphonia-Back-end/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/Etshawy1/Symphonia-Back-end)](https://github.com/Etshawy1/Symphonia-Back-end/issues)
[![GitHub forks](https://img.shields.io/github/forks/Etshawy1/Symphonia-Back-end)](https://github.com/Etshawy1/Symphonia-Back-end/network/members)
[![GitHub stars](https://img.shields.io/github/stars/Etshawy1/Symphonia-Back-end)](https://github.com/Etshawy1/Symphonia-Back-end/stargazers)
[![GitHub license](https://img.shields.io/github/license/Etshawy1/Symphonia-Back-end)](https://github.com/Etshawy1/Symphonia-Back-end/blob/master/License)

## Tools used

- Server: [NodeJs](https://nodejs.org/en/download/) with [Express](https://expressjs.com/) as framework.
- database: [mongoDB](https://www.mongodb.com/).
- Unit testing: [jest](https://jestjs.io/).
- Function documentation: [jsdoc](https://jsdoc.app/).
- API documentation: [postman](https://documenter.getpostman.com/view/10629897/SzRw3C6L?version=latest)
- Code Style: [airbnb](https://github.com/airbnb/javascript)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- you need to clone the project, then open a terminal in the root directory and write the following command:

      npm i

- then you will need a file called `.env` without a name only an extension to exist in the root directory the file `example.env` has the kind of variables you need to have, also you will need a file called `symphonia.json` in the root directory for the notifications there is an example provided with the name `example-symphonia.json` to show the necessary content for the file.

- we use npm package `winston` for logging so, you need to make a folder called `logs` in the root directory and make 3 files:

  1. `exceptions.log` this file will have any erros with the error stack that prevented the project from running or made the server go down.

  2. `error.log` this file will contain any erros that happen with packages or responses to invalid or malformed requests.

  3. `combined.log` this contains same content as `error.log` but has more data like the links visited tracked by npm package `morgan` and any thing we want to debug.

- for running the project you can `npm i -g nodemon` then type `nodemon` it will run the project and refresh at any change of code on saving .

### Migrations & Seeds

- to run seeds you need to type those commands:

      cd seeds/

      npm i

      node seed

  you also have to read the comments in file seed in the path `seeds\seed.js` in order to know how to configure the database to be connected when you seed.

- to run migrations after seeding type the following commands:

      cd ..

      migrate-mongo up

  Note: our migrations does one thing it creates a unique index for necessary fields in the created collections.

### Unit testing

- type the following command:

      npm test

- running a test automatically generates a coverage report named coverage in folder `./coverage`.

### Development vs Production

- to run in developer env you should go to the root directory and find the `.env` file which has a variable with name `NODE_ENV` you can give it value `production` or `development` according to your needs.

### Functional documentation

- type the following commadns

       npm i -g jsdoc
       npm run doc

- first command to download the documentating pacakge second command will generate documentation of all files generating files in a folder named `./docs`.

### API documentation

- we used postman documentation you can find the post man collection in the root of the repo in json format you can import it in postman application also if you the link of the current documentation, updated with real time example responses from seeds.
  you can find it [here](https://documenter.getpostman.com/view/10629897/SzRw3C6L?version=latest).

## Authors

- [Muhammad Ahmad Hesham](https://github.com/Etshawy1)
- [Muhammad Alaa Abdel-Khaliq](https://github.com/MuhammeedAlaa)
- [Muhammad Ibrahim Gab-Allah](https://github.com/marait123)
- [Omar Tarek Muhammad](https://github.com/omar9984)
- [Ahmad Attia](https://github.com/A00x40) (devOps)

## License

- Licensed under the [MIT License](./License).

### Note

This product is strictly for educational purposes, the music on the platform is subjected to copyrights and are not to be shared or distributed.

## Acknowledgments

some concepts and some files (`./utils/apiFeatures`, `./utils/appError`, `./utils/catchAsync`, `./controllers/handlerFactory`, `./controllers/errorController`) in the code were adapted from a udemy course provided by [Jonas Schmedtmann](https://github.com/jonasschmedtmann) you can visit the [course repo here](https://github.com/jonasschmedtmann/complete-node-bootcamp). we highly recommend it for those who want to learn back-end Api develpment with [Express](https://expressjs.com/)
