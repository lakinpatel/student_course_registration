/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Experience controller file of application
    url : http://localhost:3000/
*/

var mongoose = require('mongoose'),
    Experience = mongoose.model('Experience');


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


// method to save experience in database
exports.create = function(req, res) {
    var experience = new Experience(req.body);
    experience.creator = req.user;

    experience.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience);
        }
    });
};

// method to return all experience list
exports.list = function(req, res) {
    Experience.find().sort('-created').populate('creator', 'firstName   lastName fullName').exec(function(err, experiences) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experiences);
        }
    });
};


// method return the experience list for user logged in
exports.experienceByStudent = function(req, res) {
    // finds in database by user id and returns list
    Experience.find({creator:req.user.id}).sort('-created').populate('creator', 'firstName   lastName fullName').exec(function(err, experiences) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experiences);
        }
    });
};


// method to return one experience by ID
exports.experienceByID = function(req, res, next, id) {
    // finds in database and returns one experience
    Experience.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, experience) {
        if (err) return next(err);
        if (!experience) return next(new Error('Failed to load experience ' + id));

        req.experience = experience;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.experience);
};


// method to update experience details
exports.update = function(req, res) {
    var experience = req.experience;

    // setting all details of experience to model
    experience.position = req.body.position;
    experience.details = req.body.details;
    experience.startDate = req.body.startDate;
    experience.endDate = req.body.endDate;
    experience.companyName = req.body.companyName;
    experience.city = req.body.city;
    experience.country = req.body.country;

    // saving to database
    experience.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience);
        }
    });
};


// method to delete one experience
exports.delete = function(req, res) {
    var experience = req.experience;

    // removes one experience
    experience.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience);
        }
    });
};


// checks whether user is authorized or not
exports.hasAuthorization = function(req, res, next) {
    console.log(req.user.id);
    if (req.experience.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};