const mongoose = require('mongoose');
const { User } = require('../../../models/userModel');

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save user successfully', async () => {
    userData = {
      name: 'etsh',
      email: 'test10@test.com',
      password: 'password',
      passwordConfirm: 'password',
      dateOfBirth: '1999-12-31',
      gender: 'male'
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.gender).toBe(userData.gender);
    expect(savedUser.dob).toBe(userData.dob);
    expect(savedUser.loginUsing).toBe(userData.loginUsing);
  });
});
