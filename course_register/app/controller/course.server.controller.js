var mongoose = require('mongoose'),
    Course = mongoose.model('Course');


// method to return error message whenever error appears
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var course = new Course(req.body);
    course.creator = req.user;

    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};

exports.list = function(req, res) {
    Course.find({}).populate('creator', 'firstName   lastName fullName').exec(function(err, allcourses) {
    //Course.find({}).populate({'creator': 'firstName   lastName fullName', 'students':'firstName lastName fullName'}).exec(function(err, allcourses) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(allcourses);
        }
    });
};


exports.courseByStaff = function(req, res) {
    // finds in database by user id and returns list
    Course.find({creator:req.user.id}).populate('students').exec(function(err, courses) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(courses);
        }
    });
};

exports.courseByID = function(req, res, next, id) {
    Course.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, course) {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load course ' + id));

        req.course = course;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.course);
};


exports.update = function(req, res) {
    var course = req.course;
    
    if(req.user.usertype=='student'){
        var isUser = course.students.indexOf(req.user.id);
        if(isUser > -1){
            course.students.splice(isUser);
        }
        else{
            course.students.push(req.user);
        }
    }
    else if(req.user.usertype=='staff'){
        course.name = req.body.name;
        course.details = req.body.details;
    }
    
    // saving to database
    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};


exports.delete = function(req, res) {
    var course = req.course;

    course.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};


// checks whether user is authorized or not
exports.hasAuthorization = function(req, res, next) {
    console.log(req.user.id);
    if (req.course.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'Staff member is not authorized'
        });
    }
    next();
};

exports.enrollStudent = function (req,res,next) {
    var course = req.course;
    course.students.push(req.user.id);
    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(course);
        }
    });
};