# Symphonia-Back-end

![Symphonia logo]('./assets/icons/icon.png')

The back end of Symphonia website (a spotify-like music streaming application)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- you need to clone the project, then open a terminal in the root directory and write the following command:

      npm i

- then you will need a file called `.env` without a name only an extension to exist in the root directory you should find it in the delivered folder in google drive or you should contact us as this file contains all our secrets.

- we use npm package `winston` for logging so, you need to make a folder called `logs` in the root directory and make 3 files:

  1. `exceptions.log` this file will have any erros with the error stack that prevented the project from running or made the server go down.

  2. `error.log` this file will contain any erros that happen with packages or responses to invalid or malformed requests.

  3. `combined.log` this contains same content as `error.log` but has more data like the links visited tracked by npm package `morgan` and any thing we want to debug.

- for running the project you can `npm i -g nodemon` then type `nodemon` it will run the project and refresh at any change of code on saving .

### Note about the database

- we are running the project on an online database whose link is in the `.env` file contained in `DATABASE` variable this variable in the `.env` determines the connected database when you run the project, so if you add a link to a local mongodb it will work normally.

### migrations & seeds

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

- to run the unit test type `npm test` that will run a script written to run test of npm package `jest`.
- to have coverage report you should go to package.json and modify `npm test` script by adding `--coverage` if it doesn't exsit to the script, then running a test automatically generates a coverage report named coverage in folder `./coverage`.

### development vs production

- to run in developer env you should go to the root directory and find the `.env` file which has a variable with name `NODE_ENV` you can give it value `production` or `development` according to your needs.

### functional documentation

- run the script `npm i -g jsdoc` then to generate documentation write `npm run doc` which is a script to generate documentation of all files generating files in a folder named `./docs`.

### api documentation

- we used postman documentation you can find the post man collection in the root of the repo in json format you can import it in postman application also if you the link of the current documentation, updated with real time example responses from seeds, but description of the returned objects to be updated.
  <https://documenter.getpostman.com/view/10629897/SzRw3C6L?version=latest>
