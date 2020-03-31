const path = require('path');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const { Track } = require('./../models/trackModel');
const { User } = require('./../models/userModel');
const PlayList = require('./../models/playlistModel');
const Album = require('./../models/albumModel');
const { History } = require('./../models/historyModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const APIFeatures = require('./../utils/apiFeatures');

const mimeNames = {
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'application/ogg',
  '.ogv': 'video/ogg',
  '.oga': 'audio/ogg',
  '.wav': 'audio/x-wav',
  '.webm': 'video/webm'
};

async function getProfileInfo (userId) {
  return await User.findById(userId)
    .select('-password')
    .select('-passwordConfirm')
    .select('-passwordChangedAt')
    .select('-passwordResetToken')
    .select('-active');
}

async function getTopArtistsAndTracks (Model, query) {
  const top = new APIFeatures(Model.find().sort({ usersCount: -1 }), query)
    .filter()
    .limitFields()
    .paginate();
  return await top.query;
}
async function decodeToken (token) {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
}
function sendResponse (response, responseStatus, responseHeaders, readable) {
  response.writeHead(responseStatus, responseHeaders);

  if (!readable) {
    response.end();
  } else {
    readable.on('open', function () {
      readable.pipe(response);
    });
  }
  return null;
}

function getMimeNameFromExt (ext) {
  let result = mimeNames[ext.toLowerCase()];
  if (!result) {
    result = 'application/octet-stream';
  }
  return result;
}

function readRangeHeader (range, totalLength) {
  if (!range || range.length === 0) {
    return null;
  }

  const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
  const start = parseInt(array[1]);
  const end = parseInt(array[2]);
  const result = {
    Start: isNaN(start) ? 0 : start,
    End: isNaN(end) ? totalLength - 1 : end
  };

  if (!isNaN(start) && isNaN(end)) {
    result.Start = start;
    result.End = totalLength - 1;
  }

  if (isNaN(start) && !isNaN(end)) {
    result.Start = totalLength - end;
    result.End = totalLength - 1;
  }

  return result;
}
exports.playTrack = catchAsync(async (req, res) => {
  const track = await Track.findById(req.params.track_id);
  if (
    req.body.context_url === undefined &&
    req.body.context_type === undefined
  ) {
    const item = {
      track: track._id,
      played_at: Date.now()
    };
    const tokenId = await decodeToken(req.headers.authorization.split(' ')[1])
      .id;
    const currentUser = await User.findById(tokenId).select('+history');
    currentUser.queue.currentlyPlaying.currentTrack = `${
      req.protocol
    }://${req.get('host')}/api/v1/me/player/tracks/${track._id}`;
    currentUser.queue.devices.push({ devicesName: req.body.device });
    if (currentUser.history === undefined) {
      const history = await History.create({
        items: [item]
      });
      currentUser.history = history._id;
    } else {
      const history = await History.findById(currentUser.history);
      history.items.push(item);
      await history.save();
    }
    await currentUser.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(tokenId);
    let deviceId;
    updatedUser.queue.devices.forEach(device => {
      if (device.devicesName === req.body.device) {
        deviceId = device._id;
      }
    });
    updatedUser.queue.currentlyPlaying.device = deviceId;
    await updatedUser.save({ validateBeforeSave: false });
    if (
      updatedUser.queue.seek !== undefined ||
      updatedUser.queue.seek !== null
    ) {
      req.headers.range = updatedUser.queue.seek;
    }
  } else {
    const item = {
      track: track._id,
      played_at: Date.now(),
      contextUrl: req.body.context_url,
      contextType: req.body.context_type
    };
    let context;
    if (req.body.context_type === 'album') {
      context = await Album.findById(req.body.contextId);
    } else if (req.body.context_type === 'playlist') {
      context = await PlayList.findById(req.body.contextId);
    } else {
      context = await User.findById(req.body.contextId);
    }
    const TracksUrl = [];
    context.tracks.forEach(tracks => {
      TracksUrl.push(
        `${req.protocol}://${req.get('host')}/api/v1/me/player/tracks/${
          tracks._id
        }`
      );
    });
    const indexOfCurrentTrack = context.tracks.indexOf(track._id);
    const indexOfPreviousTrack =
      indexOfCurrentTrack === 0 ? -1 : indexOfCurrentTrack - 1;
    const indexOfNextTrack =
      indexOfCurrentTrack === context.tracks.length - 1
        ? -1
        : indexOfCurrentTrack + 1;
    __logger.error(indexOfCurrentTrack);
    __logger.error(context.tracks.length);
    __logger.error(indexOfNextTrack);
    const queue = {
      queueTracks: TracksUrl,
      currentlyPlaying: {
        currentTrack: `${req.protocol}://${req.get(
          'host'
        )}/api/v1/me/player/tracks/${track._id}`
      },
      previousTrack:
        indexOfPreviousTrack !== -1 ? TracksUrl[indexOfPreviousTrack] : null,
      nextTrack: indexOfNextTrack !== -1 ? TracksUrl[indexOfNextTrack] : null,
      devices: [{ devicesName: req.body.device }]
    };
    const tokenId = await decodeToken(req.headers.authorization.split(' ')[1])
      .id;
    const currentUser = await User.findById(tokenId).select('+history');
    if (currentUser.history === undefined) {
      const history = await History.create({
        items: [item]
      });
      currentUser.history = history._id;
    } else {
      const history = await History.findById(currentUser.history);
      history.items.push(item);
      await history.save({ validateBeforeSave: false });
    }
    currentUser.queue = queue;
    await currentUser.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(tokenId);
    let deviceId;
    updatedUser.queue.devices.forEach(device => {
      if (device.devicesName === req.body.device) {
        deviceId = device._id;
      }
    });
    updatedUser.queue.currentlyPlaying.device = deviceId;
    await updatedUser.save({ validateBeforeSave: false });
    if (
      updatedUser.queue.seek !== undefined ||
      updatedUser.queue.seek !== null
    ) {
      req.headers.range = updatedUser.queue.seek;
    }
  }
  const { trackPath } = track;
  __logger.info(trackPath);
  // Check if file exists. If not, will return the 404 'Not Found'.
  if (!fs.existsSync(trackPath)) {
    sendResponse(res, 404, null, null);
    return null;
  }
  const responseHeaders = {};
  const stat = fs.statSync(trackPath);
  const rangeRequest = readRangeHeader(req.headers.range, stat.size);
  // If 'Range' header exists, we will parse it with Regular Expression.
  if (rangeRequest == null) {
    responseHeaders['Content-Type'] = getMimeNameFromExt(
      path.extname(trackPath)
    );
    responseHeaders['Content-Length'] = stat.size; // File size.
    responseHeaders['Accept-Ranges'] = 'bytes';

    //  If not, will return file directly.
    sendResponse(res, 200, responseHeaders, fs.createReadStream(trackPath));
    return null;
  }
  const start = rangeRequest.Start;
  const end = rangeRequest.End;
  // If the range can't be fulfilled.
  if (start >= stat.size || end >= stat.size) {
    // Indicate the acceptable range.
    responseHeaders['Content-Range'] = `bytes */${stat.size}`; // File size.

    // Return the 416 'Requested Range Not Satisfiable'.
    sendResponse(res, 416, responseHeaders, null);
    return null;
  }
  // Indicate the current range.
  responseHeaders['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
  responseHeaders['Content-Length'] = start === end ? 0 : end - start + 1;
  responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(trackPath));
  responseHeaders['Accept-Ranges'] = 'bytes';
  responseHeaders['Cache-Control'] = 'no-cache';
  // Return the 206 'Partial Content'.
  sendResponse(
    res,
    206,
    responseHeaders,
    fs.createReadStream(trackPath, {
      start: start,
      end: end
    })
  );
});
exports.userProfile = catchAsync(async (req, res, next) => {
  const currentUser = await getProfileInfo(req.params.user_id);
  if (!currentUser._id) {
    return next(new AppError('No user found', 404));
  }
  res.status(200).json({
    currentUser
  });
});
exports.currentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  )
    .select('-password')
    .select('-passwordConfirm')
    .select('-passwordChangedAt')
    .select('-passwordResetToken')
    .select('-active');
  res.status(200).json({
    currentUser
  });
});
exports.topTracksAndArtists = catchAsync(async (req, res, next) => {
  const doc =
    req.params.type === 'track'
      ? await getTopArtistsAndTracks(Track, req.query)
      : await getTopArtistsAndTracks(User);
  res.status(200).json({
    doc
  });
});

exports.recentlyPlayed = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  ).select('+history');
  __logger.info(currentUser);
  const history = await History.findById(currentUser.history).select('-__v');
  res.status(200).json({
    history
  });
});

exports.repeat = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.repeat = !currentUserQueue.repeat;
  if (currentUserQueue.repeat === true) currentUserQueue.repeatOnce = false;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.repeatOnce = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.repeatOnce = !currentUserQueue.repeatOnce;
  if (currentUserQueue.repeatOnce === true) currentUserQueue.repeat = false;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.shuffle = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.shuffle = !currentUserQueue.shuffle;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.seek = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.seek = req.headers.range;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.volume = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.volume = req.body.volume;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.previous = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  if (currentUserQueue.repeatOnce === true) {
    currentUserQueue.nextTrack = currentUserQueue.currentlyPlaying.currentTrack;
    currentUserQueue.previousTrack =
      currentUserQueue.currentlyPlaying.currentTrack;
  } else {
    currentUserQueue.nextTrack = currentUserQueue.currentlyPlaying.currentTrack;
    if (currentUserQueue.previousTrack !== null)
      currentUserQueue.currentlyPlaying.currentTrack =
        currentUserQueue.previousTrack;
    else if (currentUserQueue.repeat) {
      currentUserQueue.currentlyPlaying.currentTrack =
        currentUserQueue.queueTracks[queueTracks.length - 1];
    }

    currentUserQueue.currentlyPlaying.currentTrack =
      currentUserQueue.previousTrack;
    if (currentUserQueue.nextTrack !== null) {
      const indexOfPreviousTrack = currentUserQueue.queueTracks.indexOf(
        currentUserQueue.previousTrack
      );
      if (indexOfPreviousTrack === 0) {
        if (currentUserQueue.repeat === true) {
          currentUserQueue.previousTrack =
            currentUserQueue.queueTracks[queueTracks.length - 1];
        } else {
          currentUserQueue.previousTrack = null;
        }
      } else {
        currentUserQueue.previousTrack =
          currentUserQueue.queueTracks[indexOfPreviousTrack - 1];
      }
    } else {
      if (currentUserQueue.repeat === true) {
        currentUserQueue.previousTrack =
          currentUserQueue.queueTracks[queueTracks.length - 2];
      }
    }
  }
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.next = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  if (currentUserQueue.repeatOnce === true) {
    currentUserQueue.nextTrack = currentUserQueue.currentlyPlaying.currentTrack;
    currentUserQueue.previousTrack =
      currentUserQueue.currentlyPlaying.currentTrack;
  } else {
    currentUserQueue.previousTrack =
      currentUserQueue.currentlyPlaying.currentTrack;
    if (currentUserQueue.nextTrack !== null)
      currentUserQueue.currentlyPlaying.currentTrack =
        currentUserQueue.nextTrack;
    else if (currentUserQueue.repeat) {
      currentUserQueue.currentlyPlaying.currentTrack =
        currentUserQueue.queueTracks[0];
    }
    if (currentUserQueue.nextTrack !== null) {
      const indexOfPreviousTrack = currentUserQueue.queueTracks.indexOf(
        currentUserQueue.nextTrack
      );
      if (indexOfPreviousTrack + 1 === currentUserQueue.queueTracks.length) {
        if (currentUserQueue.repeat === true) {
          currentUserQueue.nextTrack = currentUserQueue.queueTracks[0];
        } else {
          currentUserQueue.nextTrack = null;
        }
      } else {
        currentUserQueue.nextTrack =
          currentUserQueue.queueTracks[indexOfPreviousTrack + 1];
      }
    } else {
      if (currentUserQueue.repeat === true) {
        currentUserQueue.nextTrack = currentUserQueue.queueTracks[1];
      }
    }
  }
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.pushQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  currentUserQueue.queueTracks.push(req.body.track);
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.popQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  const indexOfPreviousTrack = currentUserQueue.queueTracks.indexOf(
    req.body.removedTrack
  );
  if (indexOfPreviousTrack === -1) {
    return new AppError('This Track is not in your current queue', 404);
  }
  currentUserQueue.queueTracks.splice(indexOfPreviousTrack, 1);
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    data: null
  });
});
exports.getDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue;
  __logger.info(currentUserQueue);
  res.status(200).json({
    data: currentUserQueue.devices
  });
});
exports.popDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserdevices = user.queue.devices;
  const removedDevicesId = req.body.deviceId;
  const device = await currentUserQueue.findById(removedDevicesId);
  const indexOfPreviousTrack = currentUserdevices.indexOf(device);
  currentUserQueue.queueTracks.splice(indexOfPreviousTrack, 1);
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    data: null
  });
});
exports.pushDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentUserQueue = user.queue.devices.push(req.body.devices);
  __logger.info(currentUserQueue);
  res.status(200).json({
    devices: currentUserQueue.devices
  });
});
exports.getCurrentlyPlaying = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentPlaying = user.queue.devicurrentlyPlaying;
  __logger.info(currentPlaying);
  res.status(200).json({
    data: currentPlaying
  });
});
exports.getQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(
    await decodeToken(req.headers.authorization.split(' ')[1]).id
  );
  const currentQueue = user.queue;
  __logger.info(currentPlaying);
  res.status(200).json({
    data: currentQueue
  });
});
