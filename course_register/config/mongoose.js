// this file is not being used in Assignment 1

var config = require('./config'),
	mongoose = require('mongoose');
	
module.exports=function(){
	var db = mongoose.connect(config.db);
	//require('../app/models/user.server.model');
    //require('../app/models/article.server.model');
    
    //require('../app/models/student.server.model');
    require('../app/models/experience.server.model');
	
	require('../app/models/staff.server.model');
	require('../app/models/course.server.model');
	require('../app/models/grade.server.model');
	
	return db;
};
