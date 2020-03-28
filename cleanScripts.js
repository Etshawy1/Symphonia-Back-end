/// don't play with it unless you know what you are doing

CatModel = require('./models/categoryModel');
require('dotenv').config();
x = process.argv[2]; // replace it with the arguemtn to the file

const DB = require('./startup/db');
DB();
async function deleteModels () {
  try {
    x = await CatModel.remove();
  } catch (error) {
    console.log(err);
  }
}

if (x == 'yes') {
  deleteModels()
    .then(val => {
      console.log(val);
    })
    .catch(err => {
      console.log(err);
    });
} else {
  process.exit(0);
}
