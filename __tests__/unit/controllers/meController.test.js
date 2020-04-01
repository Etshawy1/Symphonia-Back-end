const controller = require('./../../../controllers/meController');
const { User } = require('./../../../models/userModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const { mockResponse } = require('../../utils/Requests');
describe('player.extention', () => {
  it('should return audio/mpeg if the file extention is .mp3 ', () => {
    expect(controller.getMimeNameFromExt('.mp3')).toEqual('audio/mpeg');
  });
  it('should return video/mp4 if the file extention is .mp4 ', () => {
    expect(controller.getMimeNameFromExt('.mp4')).toEqual('video/mp4');
  });
  it('should return application/ogg if the file extention is .ogg ', () => {
    expect(controller.getMimeNameFromExt('.ogg')).toEqual('application/ogg');
  });
  it('should return video/ogg if the file extention is .ogv ', () => {
    expect(controller.getMimeNameFromExt('.ogv')).toEqual('video/ogg');
  });
  it('should return audio/ogg if the file extention is .oga ', () => {
    expect(controller.getMimeNameFromExt('.oga')).toEqual('audio/ogg');
  });
  it('should return audio/x-wav if the file extention is .wav ', () => {
    expect(controller.getMimeNameFromExt('.wav')).toEqual('audio/x-wav');
  });
  it('should return video/webm if the file extention is .webm ', () => {
    expect(controller.getMimeNameFromExt('.webm')).toEqual('video/webm');
  });
  it('should return application/octet-stream if the file extention is any other thing ', () => {
    expect(controller.getMimeNameFromExt('.jaksdf')).toEqual(
      'application/octet-stream'
    );
  });
});

describe('packets range', () => {
  it('should return null if rang is null ', () => {
    expect(controller.readRangeHeader(null, 500)).toBeNull();
  });
  it('should return null rang is empty string ', () => {
    expect(controller.readRangeHeader('', 500)).toBeNull();
  });
  it('should return start and end of rang', () => {
    expect(controller.readRangeHeader('bytes=200-500')).toEqual({
      Start: 200,
      End: 500
    });
  });
});

describe('it sould get user public profile', () => {
  let req, res, next, user;
  beforeAll(() => {
    user = { _id: mongoose.Types.ObjectId() };
  });
  user = {
    name: 'Alaa',
    email: 'test52@test.com',
    emailConfirm: 'test52@test.com',
    dateOfBirth: '1999-09-09',
    gender: 'male',
    type: 'user',
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        device: {
          $oid: '5e8353385fff0e9814bcecc9'
        }
      },
      previousTrack: null,
      nextTrack:
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
      devices: [
        {
          _id: {
            $oid: '5e834e669bd8bc59e4023547'
          },
          devicesName: 'Chrome'
        },
        {
          _id: {
            $oid: '5e8351355fff0e9814bcecb3'
          },
          devicesName: 'FireFox'
        }
      ],
      play: false,
      repeat: true,
      repeatOnce: false,
      shuffle: false
    }
  };
  const exec = async () => {
    next = jest.fn();
    await controller.repeat(req, res, next);
  };

  it('should return if user was repeating the track', async () => {
    req = {};
    await exec();
    expect(204);
  });
  beforeEach(() => {
    User.findById = jest.fn().mockReturnValue(user);
  });
});
describe('it sould get user public profile', () => {
  let req, res, next, user;
  user = {
    _id: mongoose.Types.ObjectId(),
    name: 'Alaa',
    email: 'test52@test.com',
    emailConfirm: 'test52@test.com',
    dateOfBirth: '1999-09-09',
    gender: 'male',
    type: 'user'
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.userProfile(req, res, next);
  };
  const exec1 = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.currentUserProfile(req, res, next);
  };
  it('should return null because no user with that id ', async () => {
    req = {
      params: { user_id: null }
    };
    controller.getProfileInfo = jest.fn().mockResolvedValue(null);
    await exec();
    const error = new AppError('No user found', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
  it('should return user public profile', async () => {
    req = {
      params: { user_id: user._id }
    };
    await exec1();
    await expect(res.json).toHaveBeenCalledWith(user);
  });
});
