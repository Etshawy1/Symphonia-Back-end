const Track = require('./../models/trackModel');
const factory = require('./handlerFactory');

exports.getTrack = factory.getOne(Track, [
  { path: 'album', select: 'name' },
  { path: 'category', select: 'name' },
  { path: 'artist', select: 'name' }
]);
exports.getSeveralTacks = factory.getMany(Track, [
  { path: 'album', select: 'name' },
  { path: 'category', select: 'name' },
  { path: 'artist', select: 'name' }
]);
exports.addTrack = factory.createOne(Track);
