// app/routes.js
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.status(200).send("Draconic Systems with passport");
    });

    app.post("/signup", passport.authenticate("local-signup"));

    app.get("/users", (req, res) => {
        User.find(function (err, users) {
            if (err) {
                res.json();
            }
            res.json(users);
        });
    });

    require("./roll")(app);
};