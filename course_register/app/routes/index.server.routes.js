/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Index route file of application
    url : http://localhost:3000/
*/

module.exports = function(app){
	var index = require('../controller/index.server.controller');
    
    // redirects all home,index,/ requests to homepage
	app.get('/', index.render);     // defined the root route of application
    app.get('/home', index.render);
    app.get('/index', index.render);
};