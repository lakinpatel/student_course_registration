var staffs = require('../controller/staff.server.controller'),
courses = require('../controller/course.server.controller'),
grades = require('../controller/grade.server.controller');
module.exports = function (app) {
  app.route('/api/courses')
    .get(courses.list)
    .post(staffs.requiresLogin, courses.create);

  app.route('/api/coursebystaff/')
    .get(courses.courseByStaff);
 
  app.route('/api/courses/:courseId')
    .get(courses.read)
    .post(staffs.requiresLogin,grades.create)
    .put(staffs.requiresLogin, courses.update)
    .delete(staffs.requiresLogin, courses.hasAuthorization, courses.delete);

  app.param('courseId', courses.courseByID);
};