angular.module('courses').factory('Courses',
    ['$resource', function($resource) {
        return $resource('api/courses/:courseId', {
            courseId: '@_id'
        }, {
                update: {
                    method: 'PUT'
                }
            });
    }],
    ['$resource',function($resource){
        return $resource('api/courses/:courseId', {
        courseId: '@_id'
    }, {
            update: {
                method: 'POST'
            }
        });
    }],
    ['$resource',function($resource){
        return $resource('api/assigngrades/:staffId', {
            staffId:'@_id'
    }, {
            update: {
                method: 'POST'
            }
        });
    }]
);