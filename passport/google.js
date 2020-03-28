
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: '760587587334-uqkmi253k0q5c9udtm48ttp1j1j5ed00.apps.googleusercontent.com',
  clientSecret: 'Q4kLt8sXpVL42bFHNEl0WcZf',
  callbackURL: "http://localhost:3000/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(`access token is`);
    console.log(accessToken);
    console.log(`refresh token is`);
    console.log(refreshToken);
    console.log(`profile is`);
    console.log(profile);
    done(null, profile);
  }
));