const crypto = require('crypto');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const validator = require('validator');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name'],
    minlength: 3,
    maxlength: 255
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
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 5,
    maxlength: 1024,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  role: {
    type: String,
    enum: ['user', 'premium-user', 'artist', 'admin'],
    defult: 'user'
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  googleId: String,
  facebookId: String,
  imageUrl: String,
  last_login: Date,
  active: {
    type: Boolean,
    defult: true,
    select: false
  }
});
userSchema.plugin(findOrCreate);
userSchema.pre('save', async function(next) {
  // if password was not modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  // to make sure the token is created after the password has been modified
  // because saving to the database is a bit slower than making the token
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// to not get the inactive users from queries
// we use regex to make this function apply on all that start with 'find'
userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});

// this function is to compare a provided password with the stored one
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  __logger.info(
    {
      resetToken
    },
    this.passwordResetToken
  );

  // the token to reset the password is valit only for 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

async function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    passwordConfirm: Joi.string()
      .min(5)
      .max(255)
      .required()
      .valid(Joi.ref('password'))
  });

  return schema.validateAsync(user);
}

exports.User = User;
exports.validate = validateUser;
