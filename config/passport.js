var linkedin = require('passport-linkedin-oauth2').Strategy;

var configAuth = require('./auth');

module.exports = function(passport) {
    // Passport Session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Passport Linkedin
    passport.use(new linkedin({
        clientID: configAuth.linkedin.clientID,
        clientSecret: configAuth.linkedin.clientSecret,
        callbackURL: configAuth.linkedin.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile','rw_company_admin','w_share']
    }, function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user. In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            console.log(profile);
            console.log('------------------------------');
            console.log(profile._raw);
            // coutry
            console.log(profile._json.location.country.code);
            //city
            console.log(profile._json.location.name);
            //company name
            console.log(profile._json.positions.values[0].company.name);
            //title
            console.log(profile._json.positions.values[0].title);

            return done(null, profile);
        });
    }));

};
