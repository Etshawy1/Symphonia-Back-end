const crypto = require('crypto');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose_delete = require('mongoose-delete');

/**
 * @module Models.user
 */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name'],
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    minlength: 5,
    maxlength: 255,
    unique: [true, 'this email is already used'],
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email']
  },
  emailConfirm: {
    type: String,
    required: [true, 'Please confirm your email'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.email;
      },
      message: 'emails are not the same!'
    }
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    maxlength: 1024,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  type: {
    type: String,
    enum: ['user', 'artist'],
    defult: 'user'
  },
  premium: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'please provide the gender']
  },
  dateOfBirth: {
    type: Date,
    min: '1-1-1900',
    max: '1-1-2000',
    required: [true, 'please provide your date of birth']
  },
  history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'History',
    select: false
  },
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    select: false
  },
  queue: {
    queueTracks: [String],
    currentlyPlaying: {
      currentTrack: { type: String, default: null },
      device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.queue.devices'
      }
    },
    previousTrack: { type: String, default: null },
    nextTrack: { type: String, defult: null },
    repeat: { type: Boolean, default: false }, //when reload the page
    volume: String, //when reload the page
    seek: { type: String, defult: null }, //when reload the page
    trackProgress: { type: String, defult: null }, //when reload the page
    shuffle: { type: Boolean, default: false }, //when reload the page
    play: { type: Boolean, default: false },
    devices: [
      {
        devicesName: String
      }
    ],
    contextId: String,
    contextType: String,
    repeatOnce: { type: Boolean, default: false },
    select: false
  },
  followedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track'
    }
  ],
  ownedPlaylists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist'
    }
  ],
  followedAlbums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album'
    }
  ],
  followedTracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track'
    }
  ],
  usersCount: {
    type: Number
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  premiumToken: String,
  premiumExpires: Date,
  artistApplicationToken: String,
  artistApplicationExpires: Date,
  googleId: String,
  registraionToken: String,
  facebookId: String,
  imageFacebookUrl: String,
  imageGoogleUrl: String,
  imageUrl: String,
  last_login: Date,
  playerToken: String,
  playerTokenExpires: Date,
  preiumExpires: Date,
  active: {
    type: Boolean,
    defult: true,
    select: false
  },
  phone: String,
  bio: String
});

userSchema.pre('save', async function (next) {
  // if password was not modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  this.emailConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  /* istanbul ignore else */
  if (!this.isModified('password') || this.isNew) return next();

  /* istanbul ignore next */
  // to make sure the token is created after the password has been modified
  // because saving to the database is a bit slower than making the token
  this.passwordChangedAt = Date.now() - 1000;
  /* istanbul ignore next */
  next();
});

// to not get the inactive users from queries
// we use regex to make this function apply on all that start with 'find'
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});

/**
 * this function is to compare a provided password with the stored one
 * @function correctPassword
 * @param {string} candidatePassword - the provided password to be checked
 * @param {string} userPassword - the hashed password of the user from the database
 * @returns {boolean} - true if the password matches the one in the database
 */

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * to check whether the password was changed after a given data.
 * @function changedPasswordAfter
 * @param {number} JWTTimestamp - the unix timestamp of when the jwt token was created.
 * @returns {boolean} - true if the password changed after the token was issued.
 */

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

/**
 * to make a JWT token for the user using the is as payload
 * @function signToken
 * @returns {string} - a json web token to identify the user and to be used in bearer token authorization
 */

userSchema.methods.signToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_VALID_FOR
    }
  );
};

/**
 * creates a password reset token that is valid for 10 minutes only
 * @function createPasswordResetToken
 * @returns {string} - password reset token
 */

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // the token to reset the password is valit only for 10 minutes
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};
/**
 * creates a premium  token that is valid for 10 minutes only
 * @function createPremiumToken
 * @returns {string} - premium token
 */

userSchema.methods.createPremiumToken = function () {
  const premiumToken = crypto.randomBytes(32).toString('hex');
  this.premiumToken = crypto
    .createHash('sha256')
    .update(premiumToken)
    .digest('hex');

  // the token to be preimum is valit only for 10 minutes
  this.premiumExpires = Date.now() + 60 * 60 * 1000;

  return premiumToken;
};
/**
 * creates a artist application token that is valid for 10 minutes only
 * @function createArtistToken
 * @returns {string} - artist reset token
 */

userSchema.methods.createArtistToken = function () {
  const applicationToken = crypto.randomBytes(32).toString('hex');

  this.artistApplicationToken = crypto
    .createHash('sha256')
    .update(applicationToken)
    .digest('hex');

  // the token to reset the password is valit only for 1 day
  this.artistApplicationExpires = Date.now() + 24 * 60 * 60 * 1000;
  return applicationToken;
};
/**
 * creates a artist application token that is valid for 10 minutes only
 * @function createPlayerToken
 * @returns {string} -Trak reset token
 */

userSchema.methods.createPlayerToken = function () {
  const playerToken = crypto.randomBytes(32).toString('hex');

  this.playerToken = crypto
    .createHash('sha256')
    .update(playerToken)
    .digest('hex');
  // the token to reset the password is valit only for 20 minutes
  this.playerTokenExpires = Date.now() + 20 * 60 * 1000;
  return playerToken;
};

userSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

const User = mongoose.model('User', userSchema);

async function validateUser (user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required(),
    emailConfirm: Joi.ref('email'),
    dateOfBirth: Joi.date()
      .format('YYYY-MM-DD')
      .utc()
      .greater('1-1-1900')
      .less('1-1-2000')
      .required(),
    gender: Joi.string()
      .valid('male', 'female')
      .required(),
    type: Joi.string()
      .valid('user', 'premium-user', 'artist')
      .required()
  });
  try {
    return await schema.validateAsync(user);
  } catch (err) {
    throw err;
  }
}

exports.User = User;
exports.validate = validateUser;
