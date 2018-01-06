// app/routes.js

const User = require("../models/User");
var jwt = require("jsonwebtoken");

module.exports = function (app, passport) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, jwt");

        //intercepts OPTIONS method
        if ("OPTIONS" === req.method) {
            //respond with 200
            res.send(200);
        }
        else {
            //move on
            next();
        }
    });

    app.get("/", function (req, res) {
        res.status(200).send("Draconic Systems with passport");
    });

    app.post("/api/auth", function (req, res) {
        User.findOne({username: req.body.username})
            .select("+local +local.password")
            .exec(function (err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res
                        .status(400)
                        .json({success: false, message: "Authentication failed: User not Found"});
                } else {
                    // Create the JWT token
                    var token = jwt.sign(
                        user.toObject(),
                        process.env.SECRET || "thereisnosecret",
                        {expiresIn: "12h"});
                    if (user.validPassword(req.body.password)) {
                        res.status(200).json({success: true, token: token, user: user});
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Authentication failed: Passwords did not match"
                        });
                    }
                }
            });
    });

    app.post("/api/signup", function (req, res) {
        User
            .findOne(
                {
                    $or: [
                        {"local.email": req.body.email},
                        {"username": req.body.username}
                    ]
                })
            .lean()
            .exec(function (err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.local.email = req.body.email;
                    newUser.local.password = newUser.generateHash(req.body.password);

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        res.sendStatus(200);
                        // TODO jwt
                    });
                } else {
                    var msg;
                    if (user.username === req.body.username) {
                        msg = "That username is taken";
                    } else {
                        msg = "That email already in use";
                    }
                    res
                        .status(400)
                        .json({success: false, message: msg});
                }
            });
    });

    app.get("/api/users", passport.authenticate("jwt", {session: false}), function (req, res) {
        User
            .find({})
            .limit(20)
            .exec(function (err, users) {
                if (err) {
                    res.json();
                }
                res.json(users);
            });
    });

    app.get("/api/users/:username", function (req, res) {
        // TODO Allow some info to anyone, more to the user themselves
        User
            .findOne({username: req.params.username})
            .exec(function (err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res.status(400).json({success: false, message: "User not found"});
                } else {
                    res.json(user);
                }
            });
    });

    require("./roll")(app);
    require("./charater")(app, passport);
    require("./campaign")(app, passport);
};
