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
      maxlength: 255,
      unique: true
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
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// Note:
// i didn't implemnent the uri field mostly itisn't needed

// the type field is required
/* playlistSchema.virtual('type').get(function() {
  return 'playlist';
});
playlistSchema.virtual('href').get(function() {
  const href = `url/${slugify(this.name, { lower: true })}`;
  return href;
}); */

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
