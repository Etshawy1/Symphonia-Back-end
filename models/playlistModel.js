const mongoose = require('mongoose');
const slugify = require('slugify');

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
      minlength: 2,
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

// to not get the inactive users from queries
// we use regex to make this function apply on all that start with 'find'
playlistSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
