const Category = require('../../../models/categoryModel');
const mongoose = require('mongoose');

describe('add id virtual property', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await Category.deleteMany({});
    await mongoose.connection.close();
  });
  it('should add id virtual property as a slug for name', async () => {
    const cat = new Category({ name: 'categoryname' });
    await cat.save();
    expect(cat.id).toEqual(cat.name);
  });
});
