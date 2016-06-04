angular.module('courses').controller('CoursesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Courses','Staff','Grade',
    function ($scope, $routeParams, $location, Authentication, Courses,Staff, Grade) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var course = new Courses({
                name: this.name,
                details: this.details
            });
             
            course.$save(function (response) {
                $location.path('courses/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.createGrade= function(){
            console.log("hi all");
            var grade = new Grade({
                marks: this.marks,
                course: this.course,
                student: this.stud
            });

            $scope.grade.$save(function () {
                $location.path('assigngrades/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.findByStaff = function () {
            Courses.query(function (courses) {
                $scope.courses = [];
                for (var i in courses) {
                    if (courses[i] != null && courses[i].creator.id === $scope.authentication.user.id) {
                        $scope.courses.push(courses[i]);
                    }
                }
            });
        };

        $scope.findAll = function () {
            $scope.courses = Courses.query();
        };

        $scope.findOne = function () {
            $scope.course = Courses.get({
                courseId: $routeParams.courseId
            });
        };
        
        $scope.findStudentsByCourse = function(course){
            $scope.onecourse=course;
            //console.log($scope.students);
        };

        $scope.findByStudent = function () {
            Courses.query(function (courses) {
                $scope.courses = [];
                for (var i in courses) {
                    for (var j in courses[i].students) {
                        if (courses[i].students[j] === $scope.authentication.user.id)
                        {
                            $scope.courses.push(courses[i]);
                        }
                    }
                }
            });
        };

        $scope.findOneStaff = function () {
            $scope.staff = Staff.get({
                staffId: $routeParams.stud
            });
        };
        $scope.update = function () {
            $scope.course.$update(function () {
                $location.path('courses/' + $scope.course._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function (course) {
            if (course) {
                course.$remove(function () {
                    for (var i in $scope.courses) {
                        if ($scope.courses[i] === course) {
                            $scope.courses.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.course.$remove(function () {
                    $location.path('courses');
                });
            }
        };

    }
]);

