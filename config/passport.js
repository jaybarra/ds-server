// config/passport.js

var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require("../models/User");

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader("jwt");
    opts.secretOrKey = process.env.SECRET || "thereisnosecret";
    passport
        .use(new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({_id: jwt_payload._id}, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));

    passport
        .use(new LocalStrategy(
            {
                passReqToCallback: true
            },
            function (req, email, password, done) { // callback with email and password from our form

                User
                    .findOne({"local.email": email}, function (err, user) {
                        // if there are any errors, return the error before anything else
                        if (err)
                            return done(err);

                        // if no user is found, return the message
                        if (!user)
                            return done(null, false); // req.flash is the way to set flashdata using connect-flash

                        // if the user is found but the password is wrong
                        if (!user.validPassword(password))
                            return done(null, false); // create the loginMessage and save it to session as flashdata

                        // all is well, return successful user
                        return done(null, user);
                    });

            }));

    // Local
    passport
        .use("local-signup", new LocalStrategy(
            {
                passReqToCallback: true
            },
            function (req, username, password, done) {
                process.nextTick(function () {
                    User
                        .findOne({"local.email": req.body.email}, function (err, user) {
                            if (err) {
                                return done(err);
                            }

                            if (user) {
                                return done(null, false, {success: false, message: "That email is already in use"});
                            } else {
                                var newUser = new User();
                                newUser.username = username;
                                newUser.local.email = req.body.email;
                                newUser.local.password = newUser.generateHash(password);

                                newUser.save(function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    return done(null, newUser);
                                });
                            }
                        });
                });
            }));
};

