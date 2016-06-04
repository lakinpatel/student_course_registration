angular.module('experiences').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/experiences', {
                templateUrl: 'experience/views/list-experiences.client.view.html'
            }).
            when('/experiences/create', {
                templateUrl: 'experience/views/create-experience.client.view.html'
            }).
            when('/experiences/:experienceId', {
                templateUrl: 'experience/views/view-experience.client.view.html'
            }).
            when('/experiences/:experienceId/edit', {
                templateUrl: 'experience/views/edit-experience.client.view.html'
            });
    }
]);