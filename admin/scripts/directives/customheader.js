databrowser.directive('customheader', function factory(){
    var definitionObject = {
        scope: '=',
        restrict: 'E',
        templateUrl: '/admin/partials/header.html'
    }
    return definitionObject
})