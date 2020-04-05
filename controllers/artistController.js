const { User } = require('./../models/userModel');
const factory = require('./handlerFactory');

exports.getArtist = factory.getOne(User);
exports.getSeveralArtists = factory.getMany(User);
