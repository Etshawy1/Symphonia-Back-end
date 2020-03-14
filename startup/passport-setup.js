const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FeacbookStrategy = require('passport-facebook');
const catchAsync = require('../utils/catchAsync');

const {
    User
} = require('./../models/userModel');

passport.use(new GoogleStrategy({
    callbackURL: 'http://localhost:3000/api/v1/users/auth/google/Symphonia',
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE
}, catchAsync(async (accessToken, refreshToken, profile, done) => {
    __logger.info(JSON.stringify(profile));
    __logger.info(JSON.stringify(done));
    __logger.info(accessToken);
    const existinguser = await User.findOne({
        googleId: profile.id
    });
    if (existinguser) {
        done(null, existinguser);
    } else {
        const newuser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
            imageUrl: `${profile.photos[0].value}`,
            last_login: Date.now(),
        });
        newuser.save({
            validateBeforeSave: false
        });
        done(null, newuser);
    }
})));
passport.use(new FeacbookStrategy({
    callbackURL: 'http://localhost:3000/api/v1/users/auth/facebook/Symphonia',
    clientID: process.env.CLIENT_ID_FACEBOOK,
    clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
    profileFields: ['id', 'displayName', 'name', 'photos', 'email', 'friends']
}, catchAsync(async (accessToken, refreshToken, profile, done) => {
    __logger.info(JSON.stringify(profile));
    __logger.info(JSON.stringify(done));
    __logger.info(accessToken);
    const existinguser = await User.findOne({
        facebookId: profile.id
    });

    if (existinguser) {
        done(null, existinguser);
    } else {
        const newuser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            facebookId: profile.id,
            imageUrl: `${profile.photos[0].value}`,
            last_login: Date.now(),
        });
        newuser.save({
            validateBeforeSave: false
        });
        done(null, newuser);
    }
})));