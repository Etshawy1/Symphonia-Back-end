catchAsync = require('../utils/catchAsync').threeArg;
const { User } = require('../models/userModel');
const Playlist = require('../models/playlistModel');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const mongoose = require('mongoose');
const Responser = require('../utils/responser');
const { notify } = require('../startup/notification');

exports.FollowUser = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('ids field is missing', 400)); // bad request
  }
  const ids = req.query.ids.split(',');
  // NOTE: not tested
  for (let i = 0; i < ids.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(ids[i])) {
      return next(new AppError('invalid ids provided', 400));
    }
    const user = await User.findById(ids[i]);
    if (!user) return next(new AppError('this is not a valid user', 400));

    if (req.user.followedUsers.includes(ids[i])) {
      return next(new AppError('user is already followed', 400));
    }
  }
  req.user.usersCount += ids.length;
  req.user.followedUsers.push(...ids);
  await req.user.save({ validateBeforeSave: false });
  res.status(204).json();
  await notify(
    ids,
    req.user._id,
    'Following User',
    `${req.user.name} started following you`,
    req.user.imageUrl
  );
});

exports.checkIfUserFollower = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('ids field is missing', 400)); // bad request
  }
  let userIds = req.query.ids.split(',');
  // loop on all the the ids of the req.user
  // find if userIds includes one of them
  user = req.user;
  let isFollowingArr = [];
  userIds.map((value, index, arr) => {
    if (user.followedUsers.includes(value)) {
      isFollowingArr.push(true);
    } else {
      isFollowingArr.push(false);
    }
  });
  res.status(200).json(isFollowingArr);
});

exports.checkIfPlaylistFollower = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('ids field is missing', 400)); // bad request
  }

  let userIds = req.query.ids.split(',');
  let playlistId = req.params.id;
  // we have to make
  let resArray = [];
  // get the playlist Object
  let playlist = await Playlist.findById(playlistId);

  for (let index = 0; index < userIds.length; index++) {
    const currUser = userIds[index];
    if (playlist.followers.includes(currUser)) {
      resArray.push(true);
    } else {
      resArray.push(false);
    }
  }

  res.status(200).send(resArray);
});

exports.followPlaylist = catchAsync(async (req, res, next) => {
  const playlistId = req.params.id;
  const userId = req.user._id;
  // now make the user follow the playlist and add the User to the followers of the playlist

  let oldPlaylist = await Playlist.findOne({ _id: playlistId });
  if (oldPlaylist.followers.includes(userId)) {
    return next(new AppError('already following the playlist', 403));
  }
  newPlayist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: {
        followers: userId
      }
    },
    { new: true }
  );
  const ids = [];
  ids.push(oldPlaylist.owner);
  res.status(200).json();
  await notify(
    ids,
    req.user._id,
    'Like Playlist',
    `${req.user.name} liked your playlist ${oldPlaylist.name}`,
    req.user.imageUrl
  );
});

exports.followedPlaylistCount = catchAsync(async (req, res, next) => {
  const count = await Playlist.count({
    followers: { $elemMatch: { $eq: req.user._id } }
  });
  res.status(200).json({ FollowedPlaylists: count });
});

exports.followedPlaylist = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Playlist.find({
      followers: { $elemMatch: { $eq: req.user._id } }
    }),
    req.query
  )
    .filter()
    .offset();

  const playlists = await features.query.populate('owner', 'name');
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  res
    .status(200)
    .json(Responser.getPaging(playlists, 'playlists', req, limit, offset));
});

// for the a next better version of this api we need to do the following
// 1: handle the next href and the
// 2: remove it entirely and replace with one that has no after functionality
// 3: the query must have the type parameter specified and type = artist (i didn't include it)
// replace the this function with the second version of it
exports.getUserFollowedArtists = catchAsync(async (req, res, next) => {
  // filteration stage
  let limit = 20;
  if (req.query.limit) {
    limit = parseInt(req.query.limit) || 20;
  }

  let user = await User.findOne({ _id: req.user._id }).populate({
    path: 'followedUsers',
    match: { type: 'artist' }
  });

  let followedUsers = user.followedUsers;
  let afterIndex = 0;
  let originalTotal = user.followedUsers.length;

  /// do the after filterationfollowedUsers =
  if (req.query.after) {
    id_after = req.query.after;
    for (let index = 0; index < followedUsers.length; index++) {
      const element = followedUsers[index];
      if (element._id == id_after) {
        afterIndex = index;
        break;
      }
    }
  }

  // get the after after id
  let afterId = null;
  let myNext = null;
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;
  // let's do the limit filtering by slicing the array
  end = afterIndex + limit;
  if (end > originalTotal) {
    end = originalTotal;
  } else {
    if (followedUsers[end]) {
      afterId = followedUsers[end]._id;
      myNext = LOCAL_HOST + 'api/v1/me/following?limit=1&after=' + afterId;
    }
  }
  if (afterIndex == -1) afterIndex = 0;
  followedUsers = followedUsers.slice(afterIndex, end);
  res.status(200).json({
    artists: {
      items: followedUsers
    },
    limit,
    total: followedUsers.length,
    next: myNext,
    cursors: {
      after: afterId
    },
    totalFollowed: originalTotal
  });
});
// removes the users with ids from current user
exports.unfollowUser = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('ids field is missing', 400)); // bad request
  }
  const ids = req.query.ids.split(',');
  let currUser = req.user;

  user = await User.findById(req.user._id);

  user.followedUsers = user.followedUsers.filter((value, index, array) => {
    let isIn = ids.includes(value.toString()); // those not in ids
    return !isIn;
  });
  await user.save({ validateBeforeSave: false }); // important to disavle validation before save
  res.status(204).json();
});

exports.unfollowPlaylist = catchAsync(async (req, res, next) => {
  let userId = req.user.id;
  let playlistId = req.params.id;
  // remove the user from the playlist
  let playlist = await Playlist.findById(playlistId);
  playlist.followers = playlist.followers.filter(function (value, index, arr) {
    return value != userId;
  });
  await playlist.save();
  res.status(204).json();
});
