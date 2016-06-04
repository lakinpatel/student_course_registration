var staffs = require('../controller/staff.server.controller');
grades = require('../controller/grade.server.controller');
module.exports = function (app) {
  app.route('/api/assigngrades')
    //.get(grades.renderAssignGrade)
    .post(grades.create);

  //app.route('/api/assigngrades/:courseId')
    //.get(courses.read)
    //.post(staffs.requiresLogin,courses.enrollStudent)
    /*.put(staffs.requiresLogin, courses.update);*/
  //app.param('courseId', courses.courseByID);
};