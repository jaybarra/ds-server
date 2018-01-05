// models/user.js

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
    username: String,
    joined: {type: Date, default: Date.now},
    local: {
        email: String,
        password: String
    }
});

// methods ====================================================================
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
