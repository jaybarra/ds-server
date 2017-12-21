// app/routes.js

const User = require("../models/User");

module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.status(200).send("Draconic Systems with passport");
    });

    app.post("/api/signup", passport.authenticate("local-signup"));

    app.get("/api/users", function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.json();
            }
            res.json(users);
        });
    });

    require("./roll")(app);
};
