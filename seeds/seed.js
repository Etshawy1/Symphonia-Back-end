const path = require('path');
process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');

const config = {
  database: 'mongodb://localhost:27017/Symphonia',
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
