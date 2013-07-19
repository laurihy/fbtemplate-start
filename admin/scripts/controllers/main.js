function MainController($scope, $location, collectionlist){
    if(Object.keys(collectionlist).length>0){
        $location.path('/admin/'+Object.keys(collectionlist)[0])
    }
}

MainController.resolve = {
    collectionlist: function($http, $q, Helpers){
        return Helpers.getCollections($http, $q)
    }
}