const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FeacbookStrategy = require('passport-facebook');

const { User } = require('./../models/userModel');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: 'http://localhost:3000/api/v1/users/auth/google/Symphonia',
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
          imageUrl: `${profile.photos[0].value}`,
          last_login: Date.now()
        });
        newUser.save({
          validateBeforeSave: false
        });
        done(null, newUser);
      }
    }
  )
);
passport.use(
  new FeacbookStrategy(
    {
      callbackURL: 'http://localhost:3000/api/v1/users/auth/facebook/Symphonia',
      clientID: process.env.CLIENT_ID_FACEBOOK,
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
      profileFields: ['id', 'displayName', 'name', 'photos', 'email', 'friends']
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        facebookId: profile.id
      });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
          facebookId: profile.id,
          imageUrl: `${profile.photos[0].value}`,
          last_login: Date.now()
        });
        newUser.save({
          validateBeforeSave: false
        });
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
