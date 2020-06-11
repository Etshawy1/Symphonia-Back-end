const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Album must have name'],
      minlength: 2,
      maxlength: 255
    },
    image: String,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Album must have Artist']
    },
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    type: {
      type: String,
      enum: ['album'],
      default: 'album'
    },
    albumType: {
      type: String,
      enum: ['album', 'single'],
      require: [true, 'please provide album type']
    },
    copyrights: {
      text: String,
      type: {
        type: String,
        enum: ['C', 'P']
      }
    },
    releaseDate: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

albumSchema.virtual('tracksCount').get(function () {
  /* istanbul ignore else */
  if (this.tracks) return this.tracks.length;
});

albumSchema.virtual('year').get(function () {
  /* istanbul ignore else */
  if (this.releaseDate) return this.releaseDate.getFullYear();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
