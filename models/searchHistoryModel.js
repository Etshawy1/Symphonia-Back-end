const mongoose = require('mongoose');
const searchHistorySchema = new mongoose.Schema({
  searchDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  context: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Playlist', 'Album', 'User', 'Category', 'Track']
  }
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);
module.exports = SearchHistory;
