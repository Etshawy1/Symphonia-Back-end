const path = require('path');
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
require('dotenv').config();

// you should have a .env file in this directory to connect to a database to be seeded
// but if you choose the online one the used npm library won't connect as online connection takes time
// you would need to change value of (connectTimeoutMS) to be like 500 or so in
// node_modules\mongo-seeding\dist\database\database-connector.js
const DB = process.env.DATABASE;

const config = {
  database: DB,
  dropDatabase: true
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });
