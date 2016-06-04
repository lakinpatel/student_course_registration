var passport = require('passport'),
    mongoose = require('mongoose');
module.exports = function () {
    var Staff = mongoose.model('Staff');
    passport.serializeUser(function (staff, done) {
        done(null, staff.id);
    });
    passport.deserializeUser(function (id, done) {
        Staff.findOne({
            _id: id
        }, '-password -salt', function (err, staff) {
            done(err, staff);
        });
    });
    require('./strategies/local.js')();
};