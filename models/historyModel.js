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
        enum: ['playlist', 'album', 'artist', 'liked']
      },
      contextImage: String,
      contextName: String,
      contextDescription: String,
      contextId: mongoose.Schema.Types.ObjectId
    }
  ]
});

const History = mongoose.model('History', historySchema);
exports.History = History;
