(function() {
  "use strict";
  
  angular
    .module("shop")
    .factory("shopService", shopService);
  
  function shopService($http){
    
    var getProducts = function(){
        return $http.get("/products")
                    .then(function(response){
                        return response.data;
                    });
    };

    return {
        getProducts: getProducts
    };

  }
  
}());