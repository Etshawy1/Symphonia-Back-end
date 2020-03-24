const Playlist = require('./../models/playlistModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const User = require('./../models/userModel');

exports.getPlaylist = catchAsync(async (req, res, next) => {
  const check = await Playlist.findById(req.params.id);
  if (!check)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  const features = new APIFeatures(Playlist.findById(req.params.id), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  if (!features) res.status(400).send('Invalid Playlist ID');
  const playlist = await features.query;

  res.status(200).json({
    status: 'success',
    results: playlist.length,
    data: {
      playlist
    }
  });
});

exports.createPlaylist = catchAsync(async (req, res, next) => {
  // const playlist = await Playlist.create({
  //   collaborative: req.body.collaborative,
  //   name: req.body.name,
  //   description: req.body.description,
  //   images: req.body.images,
  //   owner: req.body.owner,
  //   public: req.body.public,
  //   tracks: req.body.tracks,
  //   followers: req.body.followers
  // });

  const user = await User.User.findById(req.params.id);

  if (!user) return res.status(400).send('Invalid User ID');

  let playlist = new Playlist({
    collaborative: req.body.collaborative,
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    owner: req.body.owner,
    public: req.body.public,
    tracks: req.body.tracks,
    followers: req.body.followers
  });

  playlist = await playlist.save();

  res.status(200).json({
    status: 'success',
    results: playlist.length,
    data: {
      playlist
    }
  });
});

exports.getUserPlaylists = catchAsync(async (req, res, next) => {
  const user = await User.User.findById(req.params.id);
  if (!user) return res.status(400).send('Invalid User ID');

  /*const features = new APIFeatures(
    Playlist.find().where({ owner: req.params.id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const playlists = await features.query;
*/
  const playlists = await Playlist.find().where({ owner: req.params.id });
  res.status(200).json({
    status: 'success',
    results: playlists.length,
    data: {
      playlists
    }
  });
});

exports.getCurrentUserPlaylists = catchAsync(async (req, res, next) => {
  let id = req.user._id;

  const features = new APIFeatures(Playlist.findById(id), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const playlists = await features.query;

  res.status(200).json({
    status: 'success',
    results: playlists.length,
    data: {
      playlists
    }
  });
});

exports.getPlaylistCoverImage = catchAsync(async (req, res, next) => {
  const images = await Playlist.findById(req.params.id).select('images');
  if (!images)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  res.status(200).json({
    status: 'success',
    results: images.length,
    data: {
      images
    }
  });
});

exports.getPlaylistTracks = catchAsync(async (req, res, next) => {
  /*const check = await Playlist.findById(req.params.id);

  if (!check)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');

  const features = new APIFeatures(Playlist.findById(req.params.id), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tracks = await features.query;
*/
  const tracks = await Playlist.findById(req.params.id).select('tracks');

  if (!tracks)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');
  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: {
      tracks
    }
  });
});

exports.removePlaylistTracks = catchAsync(async (req, res, next) => {
  // const tracks = await Playlist.findById(req.params.id).select('tracks');
  // tracks.length = 0;
  let tracks = await Playlist.findById(req.params.id).select('tracks');

  if (!tracks)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');

  tracks.overwrite('');

  tracks = await tracks.save();

  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: {
      tracks
    }
  });
});

exports.addTracksToPlaylist = catchAsync(async (req, res, next) => {
  // const preplaylist = await Playlist.findById(req.params.id);
  // var pretracks = preplaylist.tracks;
  // pretracks.push(req.body.tracks);
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    {
      tracks: req.body.tracks //pretracks.push(req.body.tracks)
    },
    { new: true }
  );

  if (!playlist)
    return res
      .status(404)
      .send('The playlist with the given ID was not found.');

  res.status(200).json({
    status: 'success',
    results: playlist.length,
    data: {
      playlist
    }
  });
});
