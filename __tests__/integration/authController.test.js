const { User } = require('../../models/userModel');
const request = require('supertest');
const _ = require('lodash');
const { app } = require('../../app');
const Email = require('./../../utils/email');

jest.setTimeout(10000);
describe('/signup', () => {
  let user;
  beforeAll(async () => {
    user = {
      name: 'etsh',
      email: 'test52@test.com',
      emailConfirm: 'test52@test.com',
      password: 'password',
      dateOfBirth: '1999-12-31',
      gender: 'male',
      type: 'user'
    };
    await User.deleteMany({});
  });

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
            { ...user },
            'password',
            'passwordConfirm',
            'dateOfBirth',
            'emailConfirm'
          )
        })
      })
    );
  });

  it('should sign up the artist and send activation email', async () => {
    const artist = { ...user };
    artist.email = artist.emailConfirm = new Date().getTime() + '@test.com';
    artist.type = 'artist';
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...artist })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'token was sent to email'
      })
    );
  });

  it('should not sign up a user with existing email in DB', async () => {
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const newUser = new User(user1);
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...user1 })
      .expect(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.stringContaining(`${user1.email}`)
      })
    );
  });

  it('should not sign up a user if data is in wrong format', async () => {
    const newUser = { ...user };
    newUser.name = 'l';
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...newUser })
      .expect(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.stringContaining('name')
      })
    );
  });

  it('should not sign up a user if email is in wrong format', async () => {
    const newUser = { ...user };
    newUser.email = 'l@l.l';
    newUser.emailConfirm = newUser.email;
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({ ...newUser })
      .expect(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        message: expect.stringContaining('email')
      })
    );
  });
});

describe('/login', () => {
  let user;
  beforeAll(() => {
    user = {
      name: 'etsh',
      email: 'test52@test.com',
      emailConfirm: 'test52@test.com',
      password: 'password',
      dateOfBirth: '1999-12-31',
      gender: 'male',
      type: 'user'
    };
  });
  it('should return user with token if valid data provided', async () => {
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const newUser = new User({ ...user1 });
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(_.pick(user1, ['email', 'password']))
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          ..._.omit(
            user1,
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
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(_.pick(user1, ['email', 'password']))
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        msg: 'Incorrect email or password'
      })
    );
  });

  it('should return error if password is wrong', async () => {
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const newUser = new User(user1);
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ ..._.pick(user1, ['email']), password: 'wrong12345' })
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        msg: 'Incorrect email or password'
      })
    );
  });
  it('should ask for missing email in request', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ password: 'wrong12345' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        msg: 'Please provide email and password!'
      })
    );
  });
});

describe('/forgotpassword', () => {
  let user;
  beforeAll(() => {
    user = {
      name: 'etsh',
      email: 'test52@test.com',
      emailConfirm: 'test52@test.com',
      password: 'password',
      dateOfBirth: '1999-12-31',
      gender: 'male',
      type: 'user'
    };
  });

  it('should return 200 and respond with message saying token sent to email', async () => {
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const newUser = new User({ ...user1 });
    await newUser.save({
      validateBeforeSave: false
    });
    const res = await request(app)
      .post('/api/v1/users/forgotpassword')
      .send(_.pick(user1, ['email']))
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'success',
        message: 'Token sent to email!'
      })
    );
  });
  it('should ask for missing email in request', async () => {
    const res = await request(app)
      .post('/api/v1/users/forgotpassword')
      .send({ email: 'not-existing-user@test.com' })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'fail',
        msg: 'There is no user with email address.'
      })
    );
  });

  it('should respond that an error occured and nothing sent to email', async () => {
    const user1 = { ...user };
    user1.email = user1.emailConfirm = new Date().getTime() + '@test.com';
    const newUser = new User({ ...user1 });
    await newUser.save({
      validateBeforeSave: false
    });
    process.env.TEST_REJECT = true;
    const res = await request(app)
      .post('/api/v1/users/forgotpassword')
      .send(_.pick(user1, ['email']))
      .expect('Content-Type', /json/)
      .expect(500);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'error',
        msg: 'There was an error sending the email. Try again later!'
      })
    );
  });
});
