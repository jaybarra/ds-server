// routes/character

var User = require("../models/User");
var Character = require("../models/Character");

module.exports = function (app, passport) {

    app.get("/api/character", passport.authenticate("jwt", {session: false}), function (req, res) {
        Character
            .find({
                owner: req.user
            })
            .skip(isNaN(req.query.offset) ? 0 : parseInt(req.query.offset))
            .limit(isNaN(req.query.limit) ? 20 : parseInt(req.query.limit))
            .exec(function (err, characters) {
                if (err) {
                    throw err;
                }
                res.json(characters);
            });
    });

    app.get("/api/character/:name", passport.authenticate("jwt", {session: false}), function (req, res) {
        Character
            .findOne({
                name: req.params.name.trim()
            })
            .populate("owner", "-local -_id")
            .exec(function (err, character) {
                if (err) {
                    throw err;
                } else {
                    if (!character) {
                        res.status(400).json({success: false, message: "Character not found"});
                    } else {
                        res.json(character);
                    }
                }
            });
    });

    // Create a character
    app.post("/api/character", passport.authenticate("jwt", {session: false}), function (req, res) {
        var newCharacter = new Character(req.body);

        // TODO promise chain this, nested callbacks suck ass

        // Make sure we can give it to the right user
        User.findOne({
            username: req.user.username
        }, function (err, user) {
            if (err) {
                throw err;
            }

            // Check if the character exists already
            // TODO fix case sensitivity on names in the model
            Character.findOne({
                $and: [
                    {name: req.body.name.trim()},
                    {owner: user}
                ]
            }, function (err, character) {
                if (err) {
                    throw err;
                } else if (character) {
                    res.status(400).json({success: false, message: "You already have a character with that name"});
                } else {
                    newCharacter.owner = user;
                    newCharacter.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        res.json(newCharacter);
                    });
                }
            });
        });
    });

    // Update a character
    app.put("/api/character", passport.authenticate("jwt", {session: false}), function (req, res) {
        var query = {
            $and: [
                {owner: req.user},
                {
                    $or:
                        [
                            {name: req.body.name},
                            {_id: req.body._id}
                        ]
                }
            ]
        };

        Character
            .findOneAndUpdate(query, req.body, {upsert: false, new: true}, function (err, character) {
                if (err) {
                    throw err;
                }
                if (!character) {
                    res.status(400).json({
                        success: false,
                        message: "Character not found"
                    });
                } else {
                    res.json(character);
                }
            });
    });

    app.delete("/api/character", passport.authenticate("jwt", {session: false}), function (req, res) {
        var query = {
            $and: [
                {owner: req.user},
                {
                    $or:
                        [
                            {name: req.body.name},
                            {_id: req.body._id}
                        ]
                }
            ]
        };

        Character.findOne(query, function (err, character) {
            if (err) {
                throw err;
            }
            if (!character) {
                res.status(400).json({success: false, message: "Character not found"});
            } else {
                character.remove();
                res.sendStatus(200);
            }
        });
    });
};