const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

/**
 * @module Models.track
 */
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
      validator: /* istanbul ignore next */ function (el) {
        return el > 3000;
      },
      message: 'Duration must be More than 3000 milleseconds!'
    }
  },
  category: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Category',
      required: true
    }
  ],
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'track should be in Album']
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
  trackPath: String,
  explicit: {
    type: Boolean,
    default: false
  },
  previewUrl: {
    type: String,
    select: false
  },
  premium: {
    type: Boolean,
    defult: false
  }
});

/**
 * this function is to populate the track object with link to stream it
 * @function getPreviewUrl
 * @param {string} localhost - the base url for the project
 * @returns {string}  the url for the track
 */
trackSchema.methods.getPreviewUrl = function (localhost) {
  if (!localhost) return '';
  else return `${localhost}api/v1/me/player/tracks/${this._id}`;
};
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
