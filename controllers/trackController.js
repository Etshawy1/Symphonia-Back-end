const { Track } = require('./../models/trackModel');
const factory = require('./handlerFactory');

exports.getTrack = factory.getOne(Track, 'category');
exports.getSeveralTacks = factory.getMany(Track, 'category');
exports.addTrack = factory.createOne(Track);
