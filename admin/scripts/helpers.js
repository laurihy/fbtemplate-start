angular.module('HelperService', []).factory('Helpers', function($http,$q){
    var root = {}

    root.getSchema = function(arr){
        // TODO: somehow cache results. This is pretty inefficient
        var hiddenStart = ['$','_']
        var disabledKeys = ['id', 'archived']
        var ret = []
        for(var i=0; i<arr.length; i++){
            for(var key in arr[i]){
                if(ret.indexOf(key)<0 && hiddenStart.indexOf(key[0])<0 && disabledKeys.indexOf(key)<0){
                    ret.push(key)
                }
            }
        }
        return ret;
    }

    root.getCollections = function(http, q){
        return http({
            method: 'GET',
            url: '/backlift/admin/currentapp',
        }).then(function(data){
            return data.data['collections']
        })
    }

    root.ResourceAsPromise = function(q,res, param, method, methodparam){
        var deferred = q.defer();
        res.bind(param)[method](methodparam, function(result){
            deferred.resolve(result)
        })
        return deferred.promise
    }

    root.getListItems = function(route, q, col){
        
        return root.ResourceAsPromise(q,
                col, 
                {collection: route.current.params.collection},
                'query',{});
    }

    root.formatErrors = function(arr){
        ret = '';
        for(key in arr){
            ret+=key+': '+arr[key].join(', ')+'. '
        }
        return ret;
    }

    return root;
})