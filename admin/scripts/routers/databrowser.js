databrowser = angular.module('list', ['CollectionService', 'HelperService'])
    .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/admin', {
            templateUrl: '/admin/partials/main.html',
            controller: 'MainController',
            resolve: MainController.resolve
        }).
        when('/admin/:collection', {
            templateUrl: '/admin/partials/list.html',
            controller: 'ListController',
            resolve: ListController.resolve
        }).
        when('/admin/:collection/addnew', {
            templateUrl: '/admin/partials/form.html',
            controller: 'AddnewController',
            resolve: AddnewController.resolve
        }).
        when('/admin/:collection/:id', {
            templateUrl: '/admin/partials/form.html',
            controller: 'EditController',
            resolve: EditController.resolve
        }).
        otherwise({
            redirectTo: '/admin'
        });
});
