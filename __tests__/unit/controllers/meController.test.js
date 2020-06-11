const controller = require('./../../../controllers/meController');
const { User } = require('./../../../models/userModel');
const { Notification } = require('./../../../models/notificationsModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const { mockResponse } = require('../../utils/Requests');
const { History } = require('../../../models/historyModel');
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
describe('meController.shuffle', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      shuffle: true
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.shuffle(req, res, next);
  };

  it('should save if user was not want to shuffle the queue', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.shuffle).toEqual(false);
  });
  it('should save if user was shuffle the queue', async () => {
    user.queue.shuffle = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.shuffle).toEqual(true);
  });
});
describe('meController.reapeatOnce', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      repeat: false,
      repeatOnce: true
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.repeatOnce(req, res, next);
  };

  it('should save if user do not want to repeat a specific track', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(false);
    expect(user.queue.repeatOnce).toEqual(false);
  });
  it('should save if user want to repeat a specific track', async () => {
    user.queue.repeatOnce = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(false);
    expect(user.queue.repeatOnce).toEqual(true);
  });
  it('should save if user was repeating the queue and want to repeat a specific track', async () => {
    user.queue.repeat = true;
    user.queue.repeatOnce = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(false);
    expect(user.queue.repeatOnce).toEqual(true);
  });
});
describe('meController.reapeat', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      repeat: true,
      repeatOnce: false
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.repeat(req, res, next);
  };

  it('should save if user do not want to repeat the queue', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(false);
    expect(user.queue.repeatOnce).toEqual(false);
  });
  it('should save if user want to repeat the queue', async () => {
    user.queue.repeat = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(true);
    expect(user.queue.repeatOnce).toEqual(false);
  });
  it('should save if user was repeating a specific track and want to repeat all the queue', async () => {
    user.queue.repeat = false;
    user.queue.repeatOnce = true;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.repeat).toEqual(true);
    expect(user.queue.repeatOnce).toEqual(false);
  });
});
describe('meController.seek', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      seek: ''
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.seek(req, res, next);
  };
  it('should save user seek and progress in track when close the device', async () => {
    req = {
      user,
      headers: { range: 'bytes=200-500' },
      body: { track_progress: '100' }
    };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.seek).toEqual('bytes=200-500');
    expect(user.queue.trackProgress).toEqual('100');
  });
});
describe('meController.volume', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      volume: ''
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.volume(req, res, next);
  };
  it('should save user progress in track when close the device', async () => {
    req = { user, body: { volume: '90' } };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.volume).toEqual('90');
  });
});

describe('meController.updateCurrentUserProfile', () => {
  let req, res, next, user;
  user = { _id: mongoose.Types.ObjectId() };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    req = {
      user,
      body: { image: 'base64ImageBuffer' },
      protocol: 'https',
      get: jest.fn().mockReturnValue('thesymphonia.ddns.net')
    };
    await controller.updateCurrentUserProfile(req, res, next);
  };
  it('should return new user public profile data after update', async () => {
    controller.prepareAndSaveImage = jest.fn();
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });
});

describe('meController.topTracksAndArtists', () => {
  let req, res, next;
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.topTracksAndArtists(req, res, next);
  };
  it('should return  top artists if type is artist', async () => {
    req = {
      params: { type: 'artist' },
      query: {}
    };
    const artist = { _id: mongoose.Types.ObjectId() };
    controller.getTopArtistsAndTracks = jest.fn().mockResolvedValue(artist);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ doc: artist });
  });
  it('should return  top tracks if type is track', async () => {
    req = {
      params: { type: 'track' },
      query: {}
    };
    const track = { _id: mongoose.Types.ObjectId() };
    controller.getTopArtistsAndTracks = jest.fn().mockResolvedValue(track);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ doc: track });
  });
});

describe('meController.topTracksAndArtists', () => {
  let req, res, next, user, hist;
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.recentlyPlayed(req, res, next);
  };
  it('should return history of the current user', async () => {
    const user = {};
    user._id = mongoose.Types.ObjectId();
    user.select = jest.fn().mockReturnValue(user);
    user.hist = hist;
    user.history = 'history';
    hist = {
      data: 'user history',
      select: jest.fn().mockReturnValue('history')
    };
    req = { user };
    User.findById = jest.fn().mockReturnValue(user);
    History.findById = jest.fn().mockReturnValue(hist);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ history: [] });
  });
});

describe('meController.userProfile', () => {
  let req, res, next, user;
  user = { _id: mongoose.Types.ObjectId() };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.userProfile(req, res, next);
  };
  it('should return user public profile', async () => {
    req = {
      params: { user_id: user._id }
    };
    controller.getProfileInfo = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });
  it('should return null because no user with that id ', async () => {
    req = {
      params: { user_id: null }
    };
    controller.getProfileInfo = jest.fn().mockResolvedValue(null);
    await exec();
    const error = new AppError('No user found', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});
describe('me.CurrentUserProfile', () => {
  let req, res, next, user;
  user = {
    _id: mongoose.Types.ObjectId()
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.currentUserProfile(req, res, next);
  };
  it('should return user private profile', async () => {
    req = {
      user: { user_id: user._id }
    };
    controller.getProfileInfo = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });
});

describe('meController.previous', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
      },
      previousTrack: null,
      nextTrack:
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
      repeat: false,
      repeatOnce: false
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.previous(req, res, next);
  };
  it('should return null for previous and current Tracks if user want to go to the previous track and he is at the beginning of the queue and to repeat', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
    expect(user.queue.previousTrack).toEqual(null);
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(null);
  });
  it('should return previous track in the current track and set previous Track to null if user want to go to the previous track and he is at after the beginning of the queue by one track and no repeat', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';
    user.queue.previousTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396';

    user.queue.nextTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';

    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.previousTrack).toEqual(null);
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
  });
  it("should return all next and current and previous tracks in it's postion if user want to go to the previous track and he is at after the beginning of the queue by one track and no repeat", async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';
    user.queue.previousTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';
    user.queue.nextTrack = null;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
  });
  it('should return all next and current and previous tracks as current track if user want to go to the previous track but with repeatOnce', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';
    user.queue.repeatOnce = true;
    user.queue.repeat = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
  });
  it('should return previous and current Tracks and next to be in postions if user want to go to the previous track and he is at the beginning of the queue and to repeat', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396';

    user.queue.nextTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';
    user.queue.previousTrack = null;
    user.queue.repeat = true;
    user.queue.repeatOnce = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
  });
});

describe('meController.next', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      },
      previousTrack:
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7',
      nextTrack: null,
      repeat: false,
      repeatOnce: false
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.next(req, res, next);
  };
  it('should return null for next and current Tracks if user want to go to the next track and he is at the beginning of the queue and no repeat', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(null);
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(null);
  });
  it('should return previous and current Tracks and next to be in postions if user want to go to the next track and he is at the beginning of the queue and to repeat', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';
    user.queue.previousTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';

    user.queue.nextTrack = null;
    user.queue.repeat = true;
    user.queue.repeatOnce = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
  });
  it('should return previous track in the current track and set next Track to null if user want to go to the next track and he is at after the end of the queue by one track and no repeat', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';
    user.queue.previousTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396';

    user.queue.nextTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';
    user.queue.repeatOnce = false;
    user.queue.repeat = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(null);
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
  });
  it('should return all next and current and previous tracks as current track if user want to go to the previous track but with repeatOnce', async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4';
    user.queue.repeatOnce = true;
    user.queue.repeat = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
  });

  it("should return all next and current and previous tracks in it's postion if user want to go to the previous track and he is at after the beginning of the queue by one track and no repeat", async () => {
    user.queue.currentlyPlaying.currentTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396';
    user.queue.nextTrack =
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7';
    user.queue.previousTrack = null;
    user.queue.repeat = false;
    user.queue.repeatOnce = false;
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: user.queue.queueTracks });
    expect(user.queue.nextTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
    );
    expect(user.queue.currentlyPlaying.currentTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    );
    expect(user.queue.previousTrack).toEqual(
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
    );
  });
});

describe('meController.getDevices', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      devices: [
        {
          _id: '5e86524e891a8a580401de8b',
          devicesName: 'Chrome'
        },
        {
          _id: '5e86524e891a8a5a0j01de8b',
          devicesName: 'FirFox'
        },
        {
          _id: '5e3473214eeqc1a8a580408b',
          devicesName: 'Android'
        }
      ]
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.getDevices(req, res, next);
  };
  it('should return user devices', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({ data: user.queue.devices });
  });
});

describe('meController.getCurrentlyPlaying', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        device: {
          _id: '5e8353385fff0e9814bcecc9'
        }
      },
      device: [
        {
          _id: '5e8353385fff0e9814bcecc9',
          deviceName: 'Chrome'
        },
        {
          _id: '5e8353385ff12391jidfbcecc9',
          deviceName: 'FireFox'
        }
      ]
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.getCurrentlyPlaying(req, res, next);
  };
  it('should return user Currently Playing Object', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: user.queue.currentlyPlaying
    });
  });
});

describe('meController.pushDevices', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      devices: [
        {
          _id: '5e86524e891a8a580401de8b',
          devicesName: 'Chrome'
        },
        {
          _id: '5e86524e891a8a5a0j01de8b',
          devicesName: 'FirFox'
        }
      ]
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.pushDevices(req, res, next);
  };
  it('should push to  user devices list', async () => {
    req = { user, body: { device: 'Android' } };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      devices: [
        {
          _id: '5e86524e891a8a580401de8b',
          devicesName: 'Chrome'
        },
        {
          _id: '5e86524e891a8a5a0j01de8b',
          devicesName: 'FirFox'
        },
        {
          devicesName: 'Android'
        }
      ]
    });
  });
});

describe('meController.getQueue', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        device: {
          _id: '5e8353385fff0e9814bcecc9'
        }
      },
      devices: [
        {
          _id: '5e86524e891a8a580401de8b',
          devicesName: 'Chrome'
        }
      ],
      repeat: false,
      repeatOnce: true,
      shuffle: false,
      seek: 'byte900-10000',
      progress: '100',
      volume: '90'
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.getQueue(req, res, next);
  };
  it('should return user queue object', async () => {
    req = { user };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({ data: user.queue });
  });
});

describe('meController.popDevices', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      devices: [
        {
          _id: '5e86524e891a8a580401de8b',
          devicesName: 'Chrome'
        },
        {
          _id: '5e86524e891a8a5a0j01de8b',
          devicesName: 'FirFox'
        },
        {
          _id: '5e3473214eeqc1a8a580408b',
          devicesName: 'Android'
        }
      ]
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.popDevices(req, res, next);
  };
  it('should pop a devie from user devices list', async () => {
    req = { user, body: { deviceId: '5e3473214eeqc1a8a580408b' } };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.devices).toEqual([
      {
        _id: '5e86524e891a8a580401de8b',
        devicesName: 'Chrome'
      },
      {
        _id: '5e86524e891a8a5a0j01de8b',
        devicesName: 'FirFox'
      }
    ]);
  });
  it('should return error if devie is not in user devices list', async () => {
    req = { user, body: { deviceId: '5e3473214eeqc1a8a580408c' } };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    const error = new AppError('there is no device with that Id', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('meController.pushQueue', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
      },
      nextTrack:
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4',
      previousTrack: null
    }
  };
  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.pushQueue(req, res, next);
  };
  it('should push to  user queue list', async () => {
    req = {
      user,
      body: {
        track:
          'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
      }
    };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      data: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
      ]
    });
  });
});

describe('meController.popQueue', () => {
  let req, res, next, user;
  user = {
    save: jest.fn().mockResolvedValue(1),
    queue: {
      queueTracks: [
        'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4',
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
      ],
      currentlyPlaying: {
        currentTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396'
      },
      nextTrack:
        'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4',
      previousTrack: null
    }
  };

  const exec = async () => {
    res = mockResponse();
    next = jest.fn();
    await controller.popQueue(req, res, next);
  };
  it('should pop a devie from user devices list', async () => {
    req = {
      user,
      body: {
        removedTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef4'
      }
    };

    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(user.queue.queueTracks).toEqual([
      'http://localhost:3000/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
      'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3ef7'
    ]);
  });
  it('should return error if track is not in user queue list', async () => {
    req = {
      user,
      body: {
        removedTrack:
          'http://localhost:3000/api/v1/me/player/tracks/5e7969965146d92e98ac3efooew'
      }
    };
    User.findById = jest.fn().mockResolvedValue(user);
    await exec();
    const error = new AppError('This Track is not in your current queue', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('activatePremium', () => {
  let req, res, next, user, newToken;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    newToken = 'new-jwt-generated-token';
    user = {
      _id,
      save: jest.fn()
    };
    req = {
      params: {
        token: 'premiumToken'
      }
    };
    User.findOne = jest.fn().mockReturnValue(user);
  });
  it('should respond with success message if provided activation token is valid', async () => {
    await controller.premium(req, res, next);
    expect(user.premium).toEqual(true);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User is now premium!' });
  });
  it('should respond with 400 if activation token is invalid', async () => {
    User.findOne = jest.fn().mockReturnValue(undefined);
    await controller.premium(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('Token is invalid or has expired', 400)
    );
  });
});

describe('setRegistrationToken', () => {
  let req, res, next, user;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    user = {
      _id,
      save: jest.fn()
    };
    req = {
      user,
      body: {
        token: 'registrationToken'
      }
    };
    User.findById = jest.fn().mockReturnValue(user);
  });
  it('should add the provided reg token in the body to the user object', async () => {
    await controller.setRegistrationToken(req, res, next);
    expect(user.registraionToken).toEqual(req.body.token);
    expect(user.save).toHaveBeenCalled();
  });
});

describe('getNotificationHistory', () => {
  let req, res, next, user, notifications;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    notifications = { _id: mongoose.Types.ObjectId() };
    user = {
      _id,
      notification: '1',
      save: jest.fn()
    };
    req = {
      user,
      body: {
        token: 'registrationToken'
      }
    };
    Notification.findById = jest.fn().mockReturnValue(notifications);
    const query = { select: jest.fn().mockReturnValue(user) };
    User.findById = jest.fn().mockReturnValue(query);
  });
  it('should return the notifications of the user successfully', async () => {
    await controller.getNotificationsHistory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ notifications });
  });

  it('should return error if no user has not activated notifications', async () => {
    user.notification = undefined;
    await controller.getNotificationsHistory(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError(`this user doesn't have notifications history`, 404)
    );
  });
});

describe('applyPremium', () => {
  let req, res, next, user, notifications;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    notifications = { _id: mongoose.Types.ObjectId() };
    user = {
      name: 'premium',
      _id,
      createPremiumToken: jest.fn().mockReturnValue('premiumTokenEmail'),
      save: jest.fn()
    };
    req = {
      user,
      protocol: 'https',
      hostname: 'thesymphonia.ddns.net'
    };

    User.findById = jest.fn().mockReturnValue(user);
  });
  it('should send email with the premium token and return status 200', async () => {
    await controller.applyPremium(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token sent to email!',
      status: 'success'
    });
  });

  it('should return error if sending email was not successful', async () => {
    process.env.TEST_REJECT = true;
    await controller.applyPremium(req, res, next);
    process.env.TEST_REJECT = undefined;
    expect(next).toHaveBeenCalledWith(
      new AppError(
        `There was an error sending the email. Try again later!`,
        500
      )
    );
  });
});

// describe('meController.playInfo', () => {
//   let req, res, next, user, track;
//   track = {
//     _id: '5e7d2e023429e24340ff1398',
//     premium: true,
//     type: 'track'
//   };
//   user = {
//     save: jest.fn().mockResolvedValue(1),
//     createPlayerToken: jest
//       .fn()
//       .mockResolvedValue(
//         '82c2579f5ce1c3177a657df01742016bcd2ad24cd95d26ab1166946f844c846a'
//       ),
//     _id: '5e84b966681ae439edfc1d6f',
//     queue: {
//       queueTracks: [
//         'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2e023429e24340ff1398',
//         'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e8a1e767937ec4d40c6debc',
//         'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e8a1e0f7937ec4d40c6deba'
//       ],
//       currentlyPlaying: {
//         currentTrack:
//           'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e8a1e0f7937ec4d40c6deba',
//         device: '5edfb6d3bf2a1b231598e77a'
//       },
//       previousTrack:
//         'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e8a1e767937ec4d40c6debc',
//       nextTrack: null,
//       devices: [{ _id: '5edfb6d3bf2a1b231598e77a', devicesName: 'Chrome' }],
//       contextId: null,
//       contextType: 'liked'
//     },
//     premium: true,
//     history: '5edf960fb9674a075be8e74e',
//     playerToken:
//       '82c2579f5ce1c3177a657df01742016bcd2ad24cd95d26ab1166946f844c846a',
//     playerTokenExpires: Date('1591720835775')
//   };
//   user.select = jest.fn().mockReturnValue(user);
//   const exec = async () => {
//     res = mockResponse();
//     next = jest.fn();
//     await controller.playInfo(req, res, next);
//   };
//   it('should return not found error', async () => {
//     req = {
//       user,
//       body: {},
//       params: { track_id: '5' }
//     };

//     User.findById = jest.fn().mockResolvedValue(user);
//     Track.findById = jest.fn().mockResolvedValue(track);

//     await exec();
//     expect(next).toHaveBeenCalledWith(
//       new AppError('this track is for premium users only', 400)
//     );
//   });
// });
