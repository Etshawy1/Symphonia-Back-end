const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
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
      ref: 'User',
      required: [true, 'Album must have Artist']
    },
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: function (val) {
          if (Array.isArray(val) && val.length === 0)
            throw new Error('Album should have track');
        }
      }
    ],
    type: {
      type: String,
      enum: ['album'],
      defult: 'album'
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
  if (this.tracks) return this.tracks.length;
  else return undefined;
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
