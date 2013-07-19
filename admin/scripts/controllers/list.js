function ListController($scope, $rootScope, $routeParams, collectionlist, Helpers, Collection){

    $rootScope.breadcrumbs = [
        {text:$routeParams.collection, url: '/admin/'+$routeParams.collection}
    ]

    $scope.collections = collectionlist;
    $scope.collectionKeys = Object.keys($scope.collections)

    var CollectionResource = Collection.bind({collection: $routeParams.collection})

    $scope.curcollection = $routeParams.collection;
    $scope.items = CollectionResource.query();

    $scope.archive = function(item){
        item.archived = true;
        item.$update();
    }

    var updateVars = true;

    $scope.del = function(){
        updateVars = false;
        toDelete = []
        $scope.items.forEach(function(item, index){
            if(item.archived){
                toDelete.push(item)
            }
        })
        for(var i = 0; i<toDelete.length;i++){
            toDelete[i].$delete();
            $scope.items.splice($scope.items.indexOf(toDelete[i]), 1)
        }
        updateVars = true;
    }

    $scope.restoreArchived = function(){
        var len = $scope.items.length
        for(var i=0;i<len;i++){
            if($scope.items[i].archived){
                $scope.items[i].archived = false;
                $scope.items[i].$update();
            }
        }
    }

    $scope.sortKey = '_id';
    $scope.sortReverse = false;

    $scope.changeFilter = function(key){
        if(key==$scope.sortKey){
            $scope.sortReverse = !$scope.sortReverse
        } else {
            $scope.sortReverse = false;
            $scope.sortKey = key;
        }
    }

    var getArchiveCount = function(){
            var n = 0;
            var len = $scope.items.length
            for(var i=0;i<len;i++){
                if($scope.items[i].archived){
                    n+=1
                }
            }
            return n
    }

    $scope.$watch('items', function(o, n){
        if(updateVars){
            $scope.keys = Helpers.getSchema($scope.items.concat([$scope.collections[$routeParams.collection]]));
            $scope.archiveCount = getArchiveCount($scope.items);
        }
    }, true)
}

ListController.resolve = {

    collectionlist: function($http, $q, Helpers){
        return Helpers.getCollections($http, $q)
    }
}