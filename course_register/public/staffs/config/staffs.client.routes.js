angular.module('staff').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            /*when('/staffs', {
                templateUrl: 'staffs/views/list-allcourses.client.view.html'
            }).*/
            when('/staffs/:staffId', {
                templateUrl: 'staffs/views/view-staff.client.view.html'
            })
    }
]);