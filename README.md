# Symphonia-Back-end

<img style ="display:block;magin:0 auto;" src='https://github.com/Etshawy1/Symphonia-Back-end/blob/dev/assets/icons/icon.png?raw=true'></img>

<hr/>
<br/>

The back end of Symphonia website (a spotify-like music streaming application)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- you need to clone the project, then open a terminal in the root directory and write the following command:

      npm i

- then you will need a file called `.env` without a name only an extension to exist in the root directory you should find it in the delivered folder in google drive or you should contact us as this file contains all our secrets.

### Note about the database

- we are running the project on an online database whose link is in the `.env` file contained in `DATABASE` variable this variable in the `.env` determines the connected database when you run the project, so if you add a link to a local mongodb it will work normally.

### migrations & seeds

- no need to run migrations as the existing seeds are up to date with our schemas.
- to run seeds you need to type those commands:

      cd seeds/

      npm i

      node seed

  you also have to read the comments in file seed in the path `seeds\seed.js` in order to know how to configure the database to be connected when you seed.

### Unit testing

- to run the unit test type `npm test` that will run a script written to run test of npm package `jest`.
- to have coverage report you should go to package.json and modify `npm test` script by adding `--coverage` if it doesn't exsit to the script, then running a test automatically generates a coverage report named coverage in folder `./coverage`.

### development vs production

- to run in developer env you should go to the root directory and find the `.env` file which has a variable with name `NODE_ENV` you can give it value `production` or `development` according to your needs.

### functional documentation

- run the script `npm i -g jsdoc` then to generate documentation of a certain file in some path write `jsdoc {path}` this will generate files in folder name `./out`.

### api documentation

- we used postman documentation you can find the post man collection in the root of the repo in json format you can import it in postman application also if you the link of the current documentation, updated with real time example responses from seeds, but description of the returned objects to be updated.
  `https://documenter.getpostman.com/view/10629897/SzRw3C6L?version=latest`
