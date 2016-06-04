var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Staff = require('mongoose').model('Staff');
    
module.exports = function () {
    passport.use(new LocalStrategy(function (staffNumber, password, done) {
        Staff.findOne({
            staffNumber: staffNumber
        }, function (err, staff) {
            if (err) {
                return done(err);
            }
            if (!staff) {
                return done(null, false, {
                    message: 'Unknown Staff ID'
                });
            }
            if (!staff.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, staff);
        });
    }));
};