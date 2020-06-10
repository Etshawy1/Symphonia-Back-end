const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const playlistSchema = new mongoose.Schema(
  {
    collaborative: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    images: [String],
    name: {
      type: String,
      required: [true, 'please provide a name for your playlist'],
      minlength: 1,
      maxlength: 255
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    public: {
      type: Boolean,
      default: true
    },
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    active: {
      type: Boolean,
      defult: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

playlistSchema.virtual('tracksCount').get(function () {
  /* istanbul ignore else */
  if (this.tracks) return this.tracks.length;
});

playlistSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all'
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
