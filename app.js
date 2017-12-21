// app.js

// Setup ===============================================================================================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const configDB = require("./config/database");

// Configuration =======================================================================================================

mongoose.connect(configDB.url, {useMongoClient: true});

require("./config/passport")(passport);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// passport
app.use(session({
    secret: "to understand nothing takes time",
    saveUninitialized: false,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes ==============================================================================================================
require("./routes")(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error:err.message});
});


module.exports = app;