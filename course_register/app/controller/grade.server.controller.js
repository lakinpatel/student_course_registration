var mongoose = require('mongoose'),
    Grade = mongoose.model('Grade');

exports.create = function(req, res) {
    var grade = new Grade(req.body);
    grade.course = req.course;
    grade.student = req.student;
    
    grade.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(grade);
        }
    });
};

exports.renderAssignGrade = function (req,res) {
     res.render('assigngrades',{
		title:'Assign Grades',
        userFullName: req.user ? req.user.fullName : '',
		user:JSON.stringify(req.user)
	});
}