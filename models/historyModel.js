const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
  items: [
    {
      track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
      },
      played_at: Date,
      contextUrl: String,
      contextType: {
        type: String,
        enum: ['playlist', 'album', 'artist']
      }
    }
  ]
});

const History = mongoose.model('History', historySchema);
exports.History = History;
