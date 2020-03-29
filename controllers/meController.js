const path = require('path');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('./../utils/appError');
const { Track } = require('./../models/trackModel');
const { User } = require('./../models/userModel');
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

exports.getMimeNameFromExt = function getMimeNameFromExt (ext) {
  let result = mimeNames[ext.toLowerCase()];
  if (!result) {
    result = 'application/octet-stream';
  }
  return result;
};

exports.readRangeHeader = function readRangeHeader (range, totalLength) {
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
};

exports.playTrack = catchAsync(async (req, res) => {
  const track = await Track.findById(req.params.track_id);
  const item = {
    track: track._id,
    played_at: Date.now(),
    contextUrl: req.body.context_url,
    contextType: req.body.context_type
  };
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const currentUser = await User.findById(decoded._id).select('+history');
  if (currentUser.history === undefined) {
    __logger.info(currentUser);
    const history = await History.create({
      items: [item]
    });
    currentUser.history = history._id;
    currentUser.save({ validateBeforeSave: false });
  } else {
    const history = await History.findById(currentUser.history);
    history.items.push(item);
    history.save();
  }
  const { trackPath } = track;
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
    status: 'success',
    data: {
      currentUser
    }
  });
});
exports.currentUserProfile = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const currentUser = await getProfileInfo(decoded.id);
  res.status(200).json({
    status: 'success',
    data: {
      currentUser
    }
  });
});
exports.topTracksAndArtists = catchAsync(async (req, res, next) => {
  const doc =
    req.params.type === 'track'
      ? await getTopArtistsAndTracks(Track, req.query)
      : await getTopArtistsAndTracks(Artist);
  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});
exports.recentlyPlayed = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const currentUser = await User.findById(decoded.id).select('+history');
  __logger.info(currentUser);
  const history = await History.findById(currentUser.history).select('-__v');
  res.status(200).json({
    status: 'success',
    data: {
      history
    }
  });
});
