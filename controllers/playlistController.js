const Playlist = require('./../models/playlistModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const { User } = require('./../models/userModel');
const Track = require('./../models/trackModel');
const _ = require('lodash');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Responser = require('../utils/responser');

exports.getPlaylist = factory.getOne(Playlist);

exports.createPlaylist = catchAsync(async (req, res, next) => {
  let playlistCheck = await User.findById(req.params.id);

  if (!playlistCheck) return res.status(400).send('Invalid User ID');

  const url = `${req.protocol}://${req.get('host')}`;
  let playlist = new Playlist({
    collaborative: req.body.collaborative,
    name: req.body.name,
    description: req.body.description,
    images: [`${url}/api/v1/images/playlists/default.png`],
    owner: req.params.id,
    public: req.body.public,
    followers: req.body.followers,
    category: req.body.category
  });

  playlist = await playlist.save();

  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { ownedPlaylists: playlist._id }
    },
    { new: true }
  );
  user.save({ validateBeforeSave: false });

  res.send(playlist);
});

exports.getUserPlaylists = catchAsync(async (req, res, next) => {
  const playlistIds = await User.findById(req.params.id, 'ownedPlaylists');
  if (!playlistIds) {
    return next(new AppError('the user does not exists', 404));
  }
  const features = new APIFeatures(
    Playlist.find({
      $or: [
        { _id: { $in: playlistIds.ownedPlaylists } },
        {
          followers: { $elemMatch: { $eq: req.params.id } }
        }
      ]
    }),
    req.query
  )
    .filter()
    .sort()
    .offset();

  const playlists = await features.query.populate('owner', 'name');
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  res
    .status(200)
    .json(Responser.getPaging(playlists, 'playlists', req, limit, offset));
});

exports.getCurrentUserPlaylists = catchAsync(async (req, res, next) => {
  const playlistsIds = await User.findById(req.user._id, 'ownedPlaylists');

  const features = new APIFeatures(
    Playlist.find({
      $or: [
        { _id: { $in: playlistsIds.ownedPlaylists } },
        {
          followers: { $elemMatch: { $eq: req.user._id } }
        }
      ]
    }),
    req.query
  )
    .filter()
    .sort()
    .offset();

  const playlists = await features.query.populate('owner', 'name');
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  res
    .status(200)
    .json(Responser.getPaging(playlists, 'playlists', req, limit, offset));
});

exports.getPlaylistCoverImage = catchAsync(async (req, res, next) => {
  const playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck) {
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  }
  if (!playlistCheck.public && playlistCheck.owner != req.user.id)
    return res.status(500).send('This playlist is not Public');

  res.send(playlistCheck.images);
});

exports.getPlaylistTracks = catchAsync(async (req, res, next) => {
  const playlistTracks = await Playlist.findById(req.params.id, 'tracks');
  if (!playlistTracks) {
    return next(new AppError('that document does not exist', 404));
  }
  const features = new APIFeatures(
    Track.find({ _id: { $in: playlistTracks.tracks } })
      .populate('artist', 'name')
      .populate('album', 'name'),

    req.query
  )
    .filter()
    .sort()
    .paginate();

  const tracks = await features.query;

  res.status(200).json(tracks);
});

exports.removePlaylistTracks = catchAsync(async (req, res, next) => {
  const playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');

  if (
    (!playlistCheck.public || !playlistCheck.collaborative) &&
    playlistCheck.owner != req.user.id
  )
    return res.status(500).send('This playlist is restricted');

  const playlist = await Playlist.update(
    { _id: req.params.id },
    { $unset: { tracks: '' } },
    { multi: true }
  );

  res.send(playlist);
});

exports.addTracksToPlaylist = catchAsync(async (req, res, next) => {
  let playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck) {
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  }

  if (
    (!playlistCheck.public || !playlistCheck.collaborative) &&
    playlistCheck.owner != req.user.id
  )
    return res.status(500).send('This playlist is restricted');

  let InputTrackarr = req.body.tracks;

  let trackarr = playlistCheck.tracks;
  for (let i = 0; i < InputTrackarr.length; i++) {
    let Trackcheck = await Track.findById(InputTrackarr[i]);

    if (!Trackcheck) return res.status(400).send('The Track is not found.');

    for (let j = 0; j < trackarr.length; j++) {
      if (trackarr[j] == InputTrackarr[i]) delete InputTrackarr[i];
    }
  }
  let RealTracksArray = InputTrackarr.filter(function (el) {
    return el != null;
  });

  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    {
      $push: { tracks: RealTracksArray }
    },
    { new: true }
  );

  await playlist.save();

  res.send(playlist);
});

exports.changePlaylistDetails = catchAsync(async (req, res, next) => {
  let playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck) {
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  }

  if (
    (!playlistCheck.public || !playlistCheck.collaborative) &&
    playlistCheck.owner != req.user.id
  ) {
    return next(new AppError('This playlist is restricted.', 401));
  }
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ['name', 'collaborative', 'public', 'description']),
    { new: true, runValidators: true }
  );
  res.json(playlist);
});
exports.maintainPlaylistTracks = catchAsync(async (req, res, next) => {
  let playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck) {
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  }

  if (
    (!playlistCheck.public || !playlistCheck.collaborative) &&
    playlistCheck.owner != req.user.id
  )
    return res.status(500).send('This playlist is restricted');

  if (req.body.rangeStart) {
    let playlistTracks = playlistCheck.tracks;
    let RangeLen = req.body.rangeLength;
    if (
      parseInt(req.body.rangeStart) < playlistTracks.length &&
      parseInt(req.body.insertBefore) < playlistTracks.length
    ) {
      if (
        parseInt(req.body.rangeStart) + parseInt(req.body.rangeLength) >=
        playlistTracks.length
      )
        RangeLen = playlistTracks.length - parseInt(req.body.rangeStart) - 1;
      let templen = RangeLen;
      let scoopedArr = [];
      let k = 0;
      for (let i = parseInt(req.body.rangeStart); templen > 0; templen--) {
        scoopedArr[k++] = playlistTracks[i];
        delete playlistTracks[i++];
      }

      playlistTracks = playlistTracks.filter(function (el) {
        return el != null;
      });

      k = 0;
      for (let i = parseInt(req.body.insertBefore); RangeLen > 0; RangeLen--) {
        playlistTracks.splice(i, 0, scoopedArr[k++]);
      }
      const playlist = await Playlist.findByIdAndUpdate(
        req.params.id,
        {
          tracks: playlistTracks
        },
        { new: true }
      );
      await playlist.save();
      res.send(playlist);
    } else {
      return res.status(400).send('the dimensions is not correct');
    }
  } else {
    let InputTrackarr = req.body.tracks;

    let trackarr = playlistCheck.tracks;
    for (let i = 0; i < InputTrackarr.length; i++) {
      let Trackcheck = await Track.findById(InputTrackarr[i]);

      if (!Trackcheck) return res.status(400).send('The Track is not found.');
    }

    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      {
        tracks: InputTrackarr
      },
      { new: true }
    );
    await playlist.save();
    res.send(playlist);
  }
});

exports.uploadCustomPlaylistCoverImage = catchAsync(async (req, res, next) => {
  let playlistCheck = await Playlist.findById(req.params.id);
  if (!playlistCheck) {
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  }

  if (
    (!playlistCheck.public || !playlistCheck.collaborative) &&
    playlistCheck.owner != req.user.id
  )
    return res.status(500).send('This playlist is restricted');

  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    {
      images: req.body.images
    },
    { new: true }
  );

  await playlist.save();
  res.send(playlist);
});
exports.getRandomPlaylist = catchAsync(async (req, res, next) => {
  let number = parseInt(req.query.number);

  let playlists = await Playlist.aggregate([
    { $match: { public: true } },
    { $sample: { size: number } }
  ]);

  res.send(playlists);
});

exports.deletePlaylist = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id, {
    owner: req.user.id
  });
  if (!playlist) {
    return next(new AppError('the document was not found', 404));
  }
  await playlist.delete();

  res.status(204).json({});
});

exports.getCurrentUserDeletedPlaylists = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Playlist.findDeleted({
      owner: req.user.id
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const deleted = await features.query;

  res.status(200).json(deleted);
});

exports.recoverCurrentUserPlaylists = catchAsync(async (req, res, next) => {
  const results = await Playlist.restore({
    owner: req.user.id,
    _id: req.params.id
  });

  res.status(200).json({ recoveredPlaylistCount: results.nModified });
});
