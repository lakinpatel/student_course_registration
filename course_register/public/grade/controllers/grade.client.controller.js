angular.module('grade').controller('GradeController', ['$scope', 'Authentication','Grade',
    function ($scope, Authentication, Grade) {
        //$scope.name=Authentication.user ? Authentication.user.fullName : 'MEAN Application';
        $scope.authentication = Authentication;
        
        $scope.create= function(){
            console.log("hi all");
            var grade = new Grade({
                marks: this.marks,
                course: this.course,
                student: student
            });

            $scope.grade.$save(function () {
                $location.path('assigngrades/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.update = function () {
            $scope.grade.$update(function () {
                $location.path('assigngrades/' + $scope.grade._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);