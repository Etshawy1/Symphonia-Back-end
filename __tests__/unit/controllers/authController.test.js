const mongoose = require('mongoose');
const app = require('../../../app'); // Link to your server file
const { User } = require('../../../models/userModel');
const request = require('supertest');
const _ = require('lodash');

describe('Sign up', () => {
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
    User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should sign up the valid user successfully and return its data and a JWT token', async () => {
    user = {
      name: 'etsh',
      email: 'test52@test.com',
      password: 'password',
      passwordConfirm: 'password',
      dateOfBirth: '1999-12-31',
      gender: 'male'
    };
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...user })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'success',
        token: expect.any(String),
        data: {
          user: expect.objectContaining({
            _id: expect.any(String),
            ..._.omit(user, 'password', 'passwordConfirm', 'dateOfBirth')
          })
        }
      })
    );
  });
});
