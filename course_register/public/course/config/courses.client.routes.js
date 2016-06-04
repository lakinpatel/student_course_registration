angular.module('courses').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/coursebystaff/', {
                templateUrl: 'course/views/list-courses.client.view.html'
            }).
            when('/courses', {
                templateUrl: 'course/views/list-allcourses.client.view.html'
            }).
            when('/registeredcourses', {
                templateUrl: 'course/views/registeredcourses.client.view.html'
            }).
            when('/assigngrades/', {
                templateUrl: 'course/views/assigngrades.client.view.html'
            }).
            /*when('/assigngrades/:courseId', {
                templateUrl: 'course/views/assigngrades.client.view.html'
            }).*/
            when('/courses/create', {
                templateUrl: 'course/views/create-course.client.view.html'
            }).
            when('/courses/:courseId', {
                templateUrl: 'course/views/view-course.client.view.html'
            }).
            when('/courses/:courseId/edit', {
                templateUrl: 'course/views/edit-course.client.view.html'
            });
    }
]);