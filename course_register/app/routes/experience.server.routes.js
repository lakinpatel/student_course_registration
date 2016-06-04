/*
    Course Name : Emerging Technologies
    Code : COMP 308
    Assignment 3 : Resume Builder
    Created by : Lakinkumar Patel
    File : Experience route file of application
    url : http://localhost:3000/
*/

var students = require('../controller/student.server.controller');
    experiences = require('../controller/experience.server.controller');
module.exports = function(app){
	app.route('/api/experiences')
     //.get(experiences.list)
     // sends request to Experience by student method to retrieve one student specific experience
     .get(experiences.experienceByStudent)  
     .post(students.requiresLogin, experiences.create);
  
  app.route('/api/experiences/:experienceId')
     .get(experiences.read)
     .put(students.requiresLogin, experiences.hasAuthorization, experiences.update)
     .delete(students.requiresLogin, experiences.hasAuthorization, experiences.delete);

  app.param('experienceId', experiences.experienceByID);
};