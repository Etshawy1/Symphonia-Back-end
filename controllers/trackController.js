const Track = require('./../models/trackModel');
const factory = require('./handlerFactory');

exports.getTrack = factory.getOne(Track, ['album', 'category', 'artist']);
exports.getSeveralTacks = factory.getMany(Track, [
  'album',
  'category',
  'artist'
]);
exports.addTrack = factory.createOne(Track);
