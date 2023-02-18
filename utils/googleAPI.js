// const passport = require("passport");
// const User = require("../models/users");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// // ? Google Passport
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       // callbackURL: "http://www.example.com/auth/google/callback"
//       callbackURL: "http://localhost:8080/api/v1/users/login/google/secrets",
//       // callbackURL: "http://localhost:8080/auth/google/secrets",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       // console.log(profile.emails);
//       cb(null, profile);
//       User.findOrCreate(
//         {
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           googleId: profile.id,
//         },
//         function (err) {
//           return cb(err, profile);
//         }
//       );
//     }
//   )
// );