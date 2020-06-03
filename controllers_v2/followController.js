catchAsync = require('../utils/catchAsync').threeArg;
const { User } = require('../models/userModel'); 
const Responser = require('../utils/responser');

exports.getUserFollowedArtists = catchAsync(async (req, res, next) => {
    let limit = Number(req.query.limit || 20);
    let offset = Number(req.query.offset || 0); 
    let user = await User.findOne({ _id: req.user._id }).populate({
      path: 'followedUsers',
      match: { type: 'artist' },
      options:{
        limit ,
        skip:offset
      }
      });
    let artists = user.followedUsers;
  
    res.status(200).json(Responser.getPaging(artists, 'artists', req, limit, offset));
  
  
  });