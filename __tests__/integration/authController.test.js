const { User } = require('../../models/userModel');
const request = require('supertest');
const _ = require('lodash');
const app = require('../../app');

jest.setTimeout(10000);
describe('/signup', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  const user = {
    name: 'etsh',
    email: 'test52@test.com',
    emailConfirm: 'test52@test.com',
    password: 'password',
    dateOfBirth: '1999-12-31',
    gender: 'male',
    type: 'user'
  };

  it('should sign up the valid user and return its data and a JWT token', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...user })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          ..._.omit(
            user,
            'password',
            'passwordConfirm',
            'dateOfBirth',
            'emailConfirm'
          )
        })
      })
    );
  });

  it('should not sign up a user with existing email in DB', async () => {
    newUser = new User(user);
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...user })
      .expect(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.stringContaining(`${user.email}`)
      })
    );
  });
});

describe('/login', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  const user = {
    name: 'etsh',
    email: 'test52@test.com',
    emailConfirm: 'test52@test.com',
    password: 'password',
    dateOfBirth: '1999-12-31',
    gender: 'male',
    type: 'user'
  };
  it('should return user with token if valid data provided', async () => {
    newUser = new User(user);
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(_.pick(user, ['email', 'password']))
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          ..._.omit(
            user,
            'password',
            'passwordConfirm',
            'dateOfBirth',
            'emailConfirm'
          )
        })
      })
    );
  });

  it('should return error if mail does not exist', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(_.pick(user, ['email', 'password']))
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail'
      })
    );
  });

  it('should return error if password is wrong', async () => {
    newUser = new User(user);
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ ..._.pick(user, ['email']), password: 'wrong12345' })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail'
      })
    );
  });
  it('should ask for missing email in request', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ password: 'wrong12345' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).toEqual(expect.objectContaining({ status: 'fail' }));
  });
});
