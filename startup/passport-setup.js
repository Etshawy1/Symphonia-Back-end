const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FeacbookStrategy = require('passport-facebook');
const catchAsync = require('./../utils/catchAsync').fourArg;
const { User } = require('./../models/userModel');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: 'http://localhost:3000/api/v1/users/auth/google/Symphonia',
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE
    },
    catchAsync(async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        existingUser.last_login = Date.now();
        await existingUser.save({
          validateBeforeSave: false
        });
        existingUser.status = 200;
        done(null, existingUser);
      } else {
        const existedEmail = await User.findOne({
          email: profile.emails[0].value
        });
        if (existedEmail) {
          existedEmail.googleId = profile.id;
          existedEmail.imageGoogleUrl = profile.photos[0].value;
          existedEmail.last_login = Date.now();
          await existedEmail.save({
            validateBeforeSave: false
          });
          existedEmail.status = 200;
          done(null, existedEmail);
        } else {
          const newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
            imageGoogleUrl: `${profile.photos[0].value}`,
            last_login: Date.now()
          });
          newUser.save({
            validateBeforeSave: false
          });
          newUser.status = 201;
          done(null, newUser);
        }
      }
    })
  )
);
passport.use(
  new FeacbookStrategy(
    {
      callbackURL: 'http://localhost:3000/api/v1/users/auth/facebook/Symphonia',
      clientID: process.env.CLIENT_ID_FACEBOOK,
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
      profileFields: [
        'id',
        'displayName',
        'name',
        'photos',
        'email',
        'friends',
        'gender',
        'birthday'
      ]
    },
    catchAsync(async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        facebookId: profile.id
      });
      if (existingUser) {
        existingUser.last_login = Date.now();
        await existingUser.save({
          validateBeforeSave: false
        });
        existingUser.status = 200;
        done(null, existingUser);
      } else {
        const existedEmail = await User.findOne({
          email: profile.emails[0].value
        });
        if (existedEmail) {
          existedEmail.facebookId = profile.id;
          existedEmail.imageFacebookUrl = profile.photos[0].value;
          existedEmail.last_login = Date.now();
          await existedEmail.save({
            validateBeforeSave: false
          });
          existedEmail.status = 200;
          done(null, existedEmail);
        } else {
          const newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            facebookId: profile.id,
            imageFacebookUrl: `${profile.photos[0].value}`,
            dateOfBirth: profile._json.birthday,
            gender: profile.gender,
            last_login: Date.now()
          });
          newUser.save({
            validateBeforeSave: false
          });
          newUser.status = 201;
          done(null, newUser);
        }
      }
    })
  )
);
