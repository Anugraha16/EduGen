const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: "your_google_client_id",
    clientSecret: "your_google_clientSecret",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          await user.save();
        } else {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));


  passport.use(new GitHubStrategy({
    clientID: "your_github_client_id",
    clientSecret: "your_github_client_secret",
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.githubId = profile.id;
          await user.save();
        } else {
          user = new User({
            githubId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
