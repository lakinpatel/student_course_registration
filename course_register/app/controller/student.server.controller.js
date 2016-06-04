/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Student controller file of application
    url : http://localhost:3000/
*/

var Student = require('mongoose').model('Student'),
    passport = require('passport');


// method to return error message whenever error appears
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Student number already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

// method to render Login form 
exports.renderSignin = function(req, res, next) {
	if (!req.student) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};


// method to render Register page
exports.renderSignup = function(req, res, next) {
	if (!req.student) {
		res.render('register', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

// method to signup the student
exports.signup = function(req, res, next) {
	if (!req.student) {
		var student = new Student(req.body);
		var message = null;

		student.provider = 'local';

		// saves student details in database
        student.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}
            
            // saves student details in database and logs the student in to application
			req.login(student, function(err) {
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};


// method to signout from application
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};


// method to check whether user requires login or not 
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'Student is not logged in'
    });
  }
  next();
};