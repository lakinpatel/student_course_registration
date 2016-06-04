var Staff = require('mongoose').model('Staff'),
    passport = require('passport');


// method to return error message whenever error appears
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		console.log(err);
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'User ID already exists';
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
	if (!req.staff) {
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
	if (!req.staff) {
		res.render('register', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.staff) {
		var staff = new Staff(req.body);
		var message = null;

		staff.provider = 'local';
		console.log(req.body);
        staff.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}
            
			req.login(staff, function(err) {
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.staffById = function(req, res, next, id) {
    Staff.findOne({ 
        _id: id }, 
        function(err, staff) {
            if (err) {
                return next(err); 
            }
            else {
                req.staff = staff;
                next();
            } 
    });
};

exports.read = function(req, res) {
    res.json(req.staff);
};

// method to signout from application
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.isUserStudent = function (req,res) {
	if(req.user.usertype=='student'){
		return true;
	}
};

// method to check whether user requires login or not 
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'Staff is not logged in'
    });
  }
  next();
};