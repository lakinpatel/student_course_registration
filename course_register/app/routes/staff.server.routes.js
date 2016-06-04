/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Student route file of application
    url : http://localhost:3000/
*/

var //users = require('../../app/controller/user.server.controller'),
    staffs = require('../../app/controller/staff.server.controller'),
    passport = require('passport');

module.exports = function (app) {

    app.route('/signup')
        .get(staffs.renderSignup)
        .post(staffs.signup);

    app.route('/api/staffs/:staffId')
        .get(staffs.read)
    app.param('staffId', staffs.staffById);

    app.route('/signin')
        .get(staffs.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', staffs.signout);
};