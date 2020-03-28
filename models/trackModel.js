const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name for your track'],
    minlength: 2,
    maxlength: 255
  },
  type: {
    type: String,
    enum: ['track'],
    defult: 'track'
  },
  durationMs: {
    type: Number,
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el > 3000;
      },
      message: 'Duration must be More than 3000 milleseconds!'
    }
  },
  category: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Category',
      required: true,
      validate: function (val) {
        if (Array.isArray(val) && val.length === 0) { throw new Error('track should have a Category'); }
      }
    }
  ],
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
    // required: [true, "track should be in Album"]
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'track should have an Artist']
  },
  playlistsCount: {
    type: Number
  },
  usersCount: {
    type: Number
  },
  trackImageUrl: String,
  trackPath: String
});
const Track = mongoose.model('Track', trackSchema);
async function validateTrack (user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(255)
      .required()
  });
  return schema.validateAsync(user);
}

exports.Track = Track;
exports.validate = validateTrack;
