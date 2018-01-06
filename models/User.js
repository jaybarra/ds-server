// models/user.js

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var bcrypt = require("bcryptjs");

var localSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, select: false, required: true}
});

var userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    joined: {type: Date, default: Date.now},
    lastLogin: {type: Date, default: Date.now},
    local: {type: localSchema, select: false}
});

// Methods ====================================================================
/**
 *
 * @param password
 * @returns {string|string}
 */
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

/**
 *
 * @param password
 * @returns {boolean}
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
