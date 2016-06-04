angular.module('staff').controller('StaffController', ['$scope', '$routeParams', '$location', 'Authentication','Staff',
    function ($scope, $routeParams, $location, Authentication, Staff) {
        $scope.authentication = Authentication;

        $scope.findAll = function () {
            $scope.staffs = Staff.query();
        };

        $scope.findOneStaff = function () {
            $scope.staff = Staff.get({
                staffId: $routeParams.staffId
            });
        };
    }
]);

