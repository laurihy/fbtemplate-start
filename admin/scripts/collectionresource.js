angular.module('CollectionService', ['ngResource']).
factory('Collection', function($resource) {
    return $resource(
        '/backlift/data/:collection/:id',
        {id: '@id'}, {
            update: {method: 'PUT'}
        }
    );
})