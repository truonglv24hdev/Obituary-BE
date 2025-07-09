import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import userModel from '../modules/user/user.model';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'https://obituary-be-production.up.railway.app/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await userModel.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          // Create new user if doesn't exist
          user = await userModel.create({
            email: profile.emails?.[0].value,
            first_name: profile.displayName,
            googleId: profile.id,
            avatar: profile.photos?.[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: 'https://obituary-be-production.up.railway.app/api/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      try {
        // Check if user already exists
        let user = await userModel.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          // Create new user if doesn't exist
          user = await userModel.create({
            email: profile.emails?.[0].value,
            first_name: `${profile.name?.givenName} ${profile.name?.familyName}`,
            facebookId: profile.id,
            avatar: profile.photos?.[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport; 