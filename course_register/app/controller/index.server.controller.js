/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Index controller file of application
    url : http://localhost:3000/
*/

exports.render = function(req,res){
	
	
    res.render('index',{
		title:'Home',
        userFullName: req.user ? req.user.fullName : '',
		user:JSON.stringify(req.user)
	});
};