const mongoose = require('mongoose');
const slugify = require('slugify');

const playlistSchema = new mongoose.Schema(
  {
    collaborative: {
      type: Boolean
    },
    description: { type: String },
    external_urls: [String],
    images: [String],
    name: {
      type: String,
      required: [true, 'please provide a name for your category'],
      minlength: 2,
      maxlength: 255
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    public: {
      type: Boolean,
      default: true
    },
    snapshot_id: String,
    tracks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track'
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
playlistSchema.virtual('type').get(function() {
  return 'playlist';
});
playlistSchema.virtual('href').get(function() {
  const href = `url/${slugify(this.name, { lower: true })}`;
  return href;
});

const category = mongoose.model('Playlist', playlistSchema);
exports.category = category;
