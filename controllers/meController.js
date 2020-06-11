const path = require('path');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const Track = require('./../models/trackModel');
const { User } = require('./../models/userModel');
const PlayList = require('./../models/playlistModel');
const Album = require('./../models/albumModel');
const { History } = require('./../models/historyModel');
const APIFeatures = require('./../utils/apiFeatures');
const _ = require('lodash');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const { Notification } = require('../models/notificationsModel');
const helper = require('../utils/helper');
const util = require('util');
const sizeOf = require('image-size');
const fs_writeFile = util.promisify(fs.writeFile);
const sharp = require('sharp');
const Email = require('../utils/email');

const mimeNames = {
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'application/ogg',
  '.ogv': 'video/ogg',
  '.oga': 'audio/ogg',
  '.wav': 'audio/x-wav',
  '.webm': 'video/webm'
};

/**
 * get user profile
 * @function getProfileInfo
 * @param {number} userId - the user id that you want to get his profile
 * @return {Document} - the user profile info without any sensitive information
 */

async function getProfileInfo (userId) {
  return await User.findById(userId)
    .select('-password')
    .select('-passwordConfirm')
    .select('-passwordChangedAt')
    .select('-passwordResetToken')
    .select('-active')
    .select('-queue')
    .select('-googleId')
    .select('-facebookId');
}

/**
 * get the top tarcks or top artists
 * @function getTopArtistsAndTracks
 * @param {Object} Model - the model of the object that you want to get the top documents in it
 * @param {Object} query - the query string object of express framework
 * @return {Documents} - the top  artists or tracks
 */

async function getTopArtistsAndTracks (Model, query) {
  const top = new APIFeatures(Model.find().sort({ usersCount: -1 }), query)
    .offset()
    .limitFields();
  return await top.query;
}

/**
 * open the file and send it to user
 * @function sendResponse
 * @param {Object} response - the response object of express framework
 * @param {number} statusCode - the status code of the response
 * @param {Object} responseHeaders - the header of the response
 * @param {File} readable - the File you want to send to the user
 * @return {File_Packets} - open the file and send it to the user
 */

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

/**
 * get the track extension
 * @function getMimeNameFromExt
 * @param {String} ext - track extenstion
 * @return {String} - the header extension name
 */

function getMimeNameFromExt (ext) {
  let result = mimeNames[ext.toLowerCase()];
  if (!result) {
    result = 'application/octet-stream';
  }
  return result;
}
/**
 * get the packet start and end bytes
 * @function readRangeHeader
 * @param {Array} range - track range of packets
 * @param {number} totalLength - the total length of the track
 * @return {Object} - object containing the start and the end of the packet
 */

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
/* istanbul ignore next */

exports.playInfo = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).select('+history');
  const playerToken = currentUser.createPlayerToken();
  const track = await Track.findById(req.params.track_id);
  if (!track) {
    return next(new AppError('track not found', 404));
  }
  if (track.premium && !req.user.premium) {
    return next(new AppError('this track is for premium users only', 400));
  }
  if (
    req.body.context_url === undefined &&
    req.body.context_type === undefined
  ) {
    const item = {
      track: track._id,
      played_at: Date.now()
    };
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
  } else {
    let context = {};
    if (req.body.context_type === 'liked') {
      context.contextImage = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/images/playlists/liked.png`;
      context.contextName = `Liked Songs`;
      context.tracks = req.user.followedTracks;
    } else if (req.body.context_type === 'album') {
      context = await Album.findById(req.body.contextId);
      context.contextImage = context.image;
      context.contextName = context.name;
      context.contextId = context._id;
    } else if (req.body.context_type === 'playlist') {
      context = await PlayList.findById(req.body.contextId);
      context.contextImage = context.images[0];
      context.contextName = context.name;
      context.contextId = context._id;
      context.contextDescription = context.description;
    } else {
      context = await User.findById(req.body.contextId);
      context.contextImage = context.imageUrl;
      context.contextName = context.name;
      context.contextId = context._id;
    }
    const item = {
      track: track._id,
      played_at: Date.now(),
      ..._.pick(context, [
        'contextImage',
        'contextName',
        'contextId',
        'contextDescription'
      ]),
      contextUrl: req.body.context_url,
      contextType: req.body.context_type
    };
    const TracksUrl = [];

    context.tracks = req.user.premium
      ? await Track.find({
          _id: { $in: context.tracks }
        }).distinct('_id')
      : await Track.find({
          _id: { $in: context.tracks },
          premium: false
        }).distinct('_id');
    let indexOfCurrentTrack = -1;
    for (let i = 0; i < context.tracks.length; i++) {
      if (context.tracks[i].equals(track._id)) indexOfCurrentTrack = i;
      TracksUrl.push(
        `${req.protocol}://${req.get('host')}/api/v1/me/player/tracks/${
          context.tracks[i]
        }`
      );
    }
    if (indexOfCurrentTrack == -1) {
      return next(new AppError('this track does not exist', 404));
    }
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
      devices: [{ devicesName: req.body.device }],
      contextId: context.contextId,
      contextType: req.body.context_type
    };
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
  }
  res.status(200).json({
    data: playerToken
  });
});
exports.playTrack = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    playerToken: hashedToken,
    playerTokenExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  const track = await Track.findById(req.params.track_id);
  track.usersCount++;
  await track.save({ validateBeforeSave: false });
  const { trackPath } = track;
  // Check if file exists. If not, will return the 404 'Not Found'.
  if (!fs.existsSync(`${trackPath}`)) {
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
  const currentUser = await exports.getProfileInfo(req.params.id);
  if (!currentUser) {
    return next(new AppError('No user found', 404));
  }
  res.status(200).json(currentUser);
});
exports.updateCurrentUserProfile = catchAsync(async (req, res, next) => {
  if (req.body.image) {
    const url = `${req.protocol}://${req.get('host')}`;
    const image = req.body.image.replace(/^data:image\/[a-z]+;base64,/, '');
    imageName = await exports.prepareAndSaveImage(
      Buffer.from(image, 'base64'),
      req.user
    );
    req.body.imageUrl = `${url}/api/v1/images/users/${imageName}`;
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      ..._.pick(req.body, [
        'email',
        'dateOfBirth',
        'gender',
        'phone',
        'name',
        'imageUrl'
      ])
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(user);
});
exports.currentUserProfile = catchAsync(async (req, res, next) => {
  const currentUser = await exports.getProfileInfo(req.user._id);
  res.status(200).json(currentUser);
});
exports.topTracksAndArtists = catchAsync(async (req, res, next) => {
  const doc =
    req.params.type === 'track'
      ? await exports.getTopArtistsAndTracks(Track, req.query)
      : await exports.getTopArtistsAndTracks(User, req.query);
  res.status(200).json({
    doc
  });
});
exports.recentlyPlayed = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).select('+history');
  const history = await History.findById(currentUser.history).select('-__v');
  if (!history || !history.items) {
    return res.status(200).json({
      history: []
    });
  }
  history.items = _.reverse(history.items);
  history.items = _.uniqBy(history.items, 'contextName');
  history.items = _.remove(history.items, i => i.contextId != undefined);
  const results = history.items.slice(0, Math.min(history.items.length, 6));
  res.status(200).json({
    history: results
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
  if (!user.queue.nextTrack) {
    user.queue.nextTrack = req.body.track;
  }
  if (!user.queue.currentlyPlaying.currentTrack) {
    user.queue.currentlyPlaying.currentTrack = req.body.track;
  }

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
  if (
    currentUserQueue.currentlyPlaying.currentTrack == req.body.removedTrack &&
    currentUserQueue.queueTracks.length - 1 !== indexOfPreviousTrack
  ) {
    currentUserQueue.currentlyPlaying.currentTrack = currentUserQueue.nextTrack;
    currentUserQueue.nextTrack =
      currentUserQueue.queueTracks[indexOfPreviousTrack + 1];
  } else if (currentUserQueue.queueTracks.length - 1 !== indexOfPreviousTrack) {
    currentUserQueue.currentlyPlaying.currentTrack = currentUserQueue.nextTrack;
  }
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    data: null
  });
});
exports.getDevices = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentUserQueue = user.queue;
  if (!currentUserQueue.devices) {
    return next(new AppError('this user has no devices at this time.', 404));
  }
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
  if (!currentPlaying) {
    return next(
      new AppError('this user is not playing any track right now', 404)
    );
  }
  res.status(200).json({
    data: currentPlaying
  });
});
exports.getQueue = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const currentQueue = user.queue;
  if (!currentQueue) {
    return next(new AppError('there is no queue for this user right now', 404));
  }
  res.status(200).json({
    data: currentQueue
  });
});
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/webhome/home`,
    cancel_url: `${req.protocol}://${req.get('host')}/premium`,
    customer_email: req.user.email,
    client_reference_id: req.user.email,
    line_items: [
      {
        name: `Premium Subscription`,
        description: `remove advs and get locked songs`,
        images: [
          `${req.protocol}://${req.get('host')}/api/v1/images/icons/icon.png`
        ],
        amount: 50 * 100,
        currency: 'USD',
        quantity: 1
      }
    ]
  });
  res.status(200).json({
    session
  });
});

/**
 * function make the user premium for sript
 * @param {Object} session - user checkout session
 * @returns {void}
 */
const createPremiumSubscriptionCheckout = async session => {
  const user = await User.findOne({ email: session.customer_email });
  user.premium = true;
  user.premiumExpires = Date.now() + 60 * 60 * 6000 * 24 * 30;
  await user.save({ validateBeforeSave: false });
};

/* istanbul ignore next */
exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
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
exports.setRegistrationToken = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.registraionToken = req.body.token;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ user });
});
exports.getNotificationsHistory = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+notification');
  if (user.notification === undefined) {
    return next(
      new AppError(`this user doesn't have notifications history`, 404)
    );
  }
  const notifications = await Notification.findById(user.notification);
  res.status(200).json({ notifications });
});
exports.applyPremium = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const Token = user.createPremiumToken();
  await user.save({
    validateBeforeSave: false
  });
  // 3) Send it to user's email
  try {
    const premiumURL =
      `${req.protocol}://${req.hostname}` + `/apply-premium/${Token}`;

    await new Email(user, premiumURL).sendPremiumToken();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.premiumToken = undefined;
    user.premiumExpires = undefined;
    await user.save({
      validateBeforeSave: false
    });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});
exports.premium = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    premiumToken: hashedToken,
    premiumExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.premiumToken = undefined;
  user.premiumExpires = undefined;
  user.premium = true;
  user.premiumExpires = Date.now() + 60 * 60 * 6000 * 24 * 30;
  await user.save({ validateBeforeSave: false });
  // 3) Update changedPasswordAt property for the user
  res.status(201).json({ message: 'User is now premium!' });
});

/* istanbul ignore next */

/**
 * function to prepare the buffer image and manipulate it be resizing to be a sqaure jpeg image and save it
 * @param {Buffer} bufferImage - Buffer contains image data
 * @param {Object} user - user object that contains user's name and id
 * @returns {String} The name of the stored image
 */
exports.prepareAndSaveImage = async function prepareAndSaveImage (
  bufferImage,
  user
) {
  // A1) get image data like the width and height and extension
  const imageData = sizeOf(bufferImage);
  const imageSize = Math.min(imageData.width, imageData.height, 300);
  // A2) manipulate the image to be square
  const decodedData = await sharp(bufferImage)
    .resize(imageSize, imageSize, { kernel: 'cubic' })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();
  const imageType = sizeOf(decodedData).type;

  // B) save the image with unique name to the following path
  const imageName = `${helper.randomStr(20)}-${Date.now()}.${imageType}`;
  const imagePath = path.resolve(`${__dirname}/../assets/images/users/`);
  await fs_writeFile(`${imagePath}/${imageName}`, decodedData);

  return imageName;
};

module.exports.sendResponse = sendResponse;
module.exports.getMimeNameFromExt = getMimeNameFromExt;
module.exports.readRangeHeader = readRangeHeader;
module.exports.getProfileInfo = getProfileInfo;
module.exports.getTopArtistsAndTracks = getTopArtistsAndTracks;
