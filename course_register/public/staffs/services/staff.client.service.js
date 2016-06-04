angular.module('staff').factory('Staff', ['$resource', function($resource) {
    return $resource('api/staffs/:staffId', {
        staffId: '@_id'
    }, {
            update: {
                method: 'PUT'
            }
        });
}]);