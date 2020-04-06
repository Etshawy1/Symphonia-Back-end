const path = require('path');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const { Track } = require('./../models/trackModel');
const { User } = require('./../models/userModel');
const PlayList = require('./../models/playlistModel');
const Album = require('./../models/albumModel');
const { History } = require('./../models/historyModel');
const APIFeatures = require('./../utils/apiFeatures');
const _ = require('lodash');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    .select('-active')
    .select('-googleId');
}

async function getTopArtistsAndTracks (Model, query) {
  const top = new APIFeatures(Model.find().sort({ usersCount: -1 }), query)
    .filter()
    .limitFields()
    .paginate();
  return await top.query;
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
    const currentUser = await User.findById(req.user._id).select('+history');
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
    const updatedUser = await User.findById(req.user._id);
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
    const currentUser = await User.findById(req.user._id).select('+history');
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
    const updatedUser = await User.findById(req.user._id);
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
  // Check if file exists. If not, will return the 404 'Not Found'.
  if (!fs.existsSync(`${trackPath}`)) {
    __logger.error(`track at ${trackPath} doesn't exist`);
    sendResponse(res, 404, null, null);
    return null;
  }
  __logger.error(`track at ${trackPath} exists`);
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
  const currentUser = await exports.getProfileInfo(req.params.user_id);
  if (!currentUser) {
    return next(new AppError('No user found', 404));
  }
  res.status(200).json(currentUser);
});
exports.updateCurrentUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      ..._.pick(req.body, ['email', 'dateOfBirth', 'gender', 'phone'])
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(user);
});

exports.currentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = await exports.getProfileInfo(req.user._id);
  res.status(200).json(currentUser);
});
//wait
exports.topTracksAndArtists = catchAsync(async (req, res, next) => {
  const doc =
    req.params.type === 'track'
      ? await getTopArtistsAndTracks(Track, req.query)
      : await getTopArtistsAndTracks(User, req.query);
  res.status(200).json({
    doc
  });
});
exports.recentlyPlayed = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).select('+history');
  const history = await History.findById(currentUser.history).select('-__v');
  res.status(200).json({
    history
  });
});

exports.repeat = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.repeat = !currentUserQueue.repeat;
  if (currentUserQueue.repeat === true) currentUserQueue.repeatOnce = false;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.repeatOnce = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.repeatOnce = !currentUserQueue.repeatOnce;
  if (currentUserQueue.repeatOnce === true) currentUserQueue.repeat = false;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.shuffle = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.shuffle = !currentUserQueue.shuffle;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.seek = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.seek = req.headers.range;
  currentUserQueue.trackProgress = req.body.track_progress;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.volume = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.volume = req.body.volume;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({ data: null });
});
exports.previous = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
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
        currentUserQueue.queueTracks[currentUserQueue.queueTracks.length - 1];
    } else {
      currentUserQueue.currentlyPlaying.currentTrack =
        currentUserQueue.previousTrack;
    }
    if (currentUserQueue.previousTrack !== null) {
      const indexOfPreviousTrack = currentUserQueue.queueTracks.indexOf(
        currentUserQueue.previousTrack
      );
      if (indexOfPreviousTrack === 0) {
        if (currentUserQueue.repeat === true) {
          currentUserQueue.previousTrack =
            currentUserQueue.queueTracks[
              currentUserQueue.queueTracks.length - 1
            ];
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
          currentUserQueue.queueTracks[currentUserQueue.queueTracks.length - 2];
      } else {
        currentUserQueue.previousTrack = null;
      }
    }
  }
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.next = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
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
    } else {
      currentUserQueue.currentlyPlaying.currentTrack = null;
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
      } else {
        currentUserQueue.nextTrack = null;
      }
    }
  }
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.pushQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  currentUserQueue.queueTracks.push(req.body.track);
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    data: currentUserQueue.queueTracks
  });
});
exports.popQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  const indexOfPreviousTrack = currentUserQueue.queueTracks.indexOf(
    req.body.removedTrack
  );
  if (indexOfPreviousTrack === -1) {
    return next(new AppError('This Track is not in your current queue', 404));
  }
  currentUserQueue.queueTracks.splice(indexOfPreviousTrack, 1);
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    data: null
  });
});
exports.getDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  res.status(200).json({
    data: currentUserQueue.devices
  });
});
exports.popDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserDevices = user.queue.devices;
  let removedDevice = -1;
  user.queue.devices.forEach(device => {
    if (device._id == req.body.deviceId) {
      removedDevice = device;
    }
  });
  if (removedDevice == -1) {
    return next(new AppError('there is no device with that Id', 404));
  }
  const indexOfDevice = currentUserDevices.indexOf(removedDevice);
  user.queue.devices.splice(indexOfDevice, 1);
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    data: null
  });
});
exports.pushDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.queue.devices.push({ devicesName: req.body.device });
  user.save({ validateBeforeSave: false });
  res.status(200).json({
    devices: user.queue.devices
  });
});
exports.getCurrentlyPlaying = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentPlaying = user.queue.currentlyPlaying;
  res.status(200).json({
    data: currentPlaying
  });
});
exports.getQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentQueue = user.queue;
  res.status(200).json({
    data: currentQueue
  });
});
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/api/v1/me`,
    cancel_url: `${req.protocol}://${req.get('host')}/`,
    customer_email: req.user.email,
    client_reference_id: req.user.email,
    line_items: [
      {
        name: `Premium Subscription`,
        description: `remove advs and get locked songs`,
        images: [`${req.protocol}://${req.get('host')}/img/defult`],
        amount: 100 * 100,
        currency: 'USD',
        quantity: 1
      }
    ]
  });
  res.status(200).json({
    session
  });
});
const createPremiumSubscriptionCheckout = async session => {
  const user = await User.findOne({ email: session.customer_email });
  user.type = 'premium-user';
  user.save({ validateBeforeSave: false });
};
exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed')
    createPremiumSubscriptionCheckout(event.data.object);
  res.status(200).json({ received: true });
});
module.exports.sendResponse = sendResponse;
module.exports.getMimeNameFromExt = getMimeNameFromExt;
module.exports.readRangeHeader = readRangeHeader;
module.exports.getProfileInfo = getProfileInfo;
