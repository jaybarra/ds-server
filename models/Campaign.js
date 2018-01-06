// models/user.js

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var Schema = mongoose.Schema;

var campaignSchema = mongoose.Schema({
    name: String,
    dungeonMaster: {type: Schema.Types.ObjectId, ref: "User"},
    description: String,
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    completed: Date,
    sessions: [Schema.Types.Mixed]
});

module.exports = mongoose.model("Campaign", campaignSchema);
