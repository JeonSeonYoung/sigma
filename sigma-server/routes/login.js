var express = require('express');
var router = express.Router();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const CONST_RESULT = {
    NO_ID: { code: -1, msg: 'there is no such id' },
    INCORRECT_PW: { code: -2, msg: 'incorrect password' },
    CORRECT_PW: { code: 1, msg: 'welcome' }
}

// dummy database
var userInfo = [
    { id: 'test1', pw: 'test1pw' },
    { id: 'test2', pw: 'test2pw' }
];

function getPassword(userid) {
    var result = false;
    for (var i = 0; i < userInfo.length; ++i) {
        if (userInfo[i].id === userid) result = userInfo[i].pw
    }

    setTimeout(function() {
        return result;
    }, 1000);
}
// // dummy database

function User(userid) {
    this.id = userid;
}

User.prototype.validatePassword = function(password) {
    var truePassword = getPassword(this.id);
    if (!truePassword) return CONST_RESULT.NO_ID;
    else if (truePassword === password) return CONST_RESULT.CORRECT_PW;
    else return CONST_RESULT.INCORRECT_PW;
};

function validatePassword()

passport.use(new LocalStrategy(
    function(id, pw, done) {
        var user = new User(id);
        var validationResult = user.validatePassword(pw);
        if (validationResult.code === CONST_RESULT.CORRECT_PW.code) {
            return done(null, id);
        } else {
            return done(null, false, { message: validationResult.msg });
        }
    }
));

/* GET users listing. */
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;
