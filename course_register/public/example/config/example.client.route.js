angular.module('example').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl:'example/views/staff.client.view.html'
            }).
            otherwise({
                redirectTo:'/'  
            });
    }
]);