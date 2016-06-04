/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Student route file of application
    url : http://localhost:3000/
*/

var //users = require('../../app/controller/user.server.controller'),
    students = require('../../app/controller/student.server.controller'),
passport = require('passport');

module.exports = function(app){
	
    app.route('/studentsignup')
    .get(students.renderSignup)
    .post(students.signup);
    
    app.route('/studentsignin')
    .get(students.renderSignin)
    .post(passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/studentsignin',
        failureFlash: true
    }));
    app.get('/signout',students.signout);
    
};