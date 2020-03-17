const mongoose = require('mongoose');
//const Joi = require('@hapi/joi');
//Joi.ObjectId = require('joi-objectid');  install it before you use it

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Album must have name'],
    minlength: 2,
    maxlength: 255
  },
  year: {
    type: Number,
    min: 1800,
    max: 3000
  },
  image: String,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Album must have Artist']
  },
  tracks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Track',
    required: [true, 'Album should have track']
  }
});

const Album = mongoose.model('Album', albumSchema);

// function validateAlbum(album){
//   const schema = {
//     artist: Joi.ObjectId.required(),
//     tracks: [Joi.ObjectId.required()]
//   };
//   return Joi.validate(album, schema);
// }

module.exports = Album;
//module.exports = validateAlbum;
