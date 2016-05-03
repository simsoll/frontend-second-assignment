(function(){
	"use strict";

	angular
      .module("shop", [])
      .controller("shopController", shopController);
  
    function shopController($scope, shopService) {
      $scope.cart = {};

      shopService.getProducts().then(function(data){
        $scope.products = data;
      })
      
      $scope.buyProduct = function(){
        var product = this.product;
        var cart = $scope.cart;
        if(cart[product.id]) {
          cart[product.id].items++;
        }
        else {
          cart[product.id] = {"product": this.product, "items": 1};
        }
      }
      
      $scope.isCart = function() {
        // return Object.keys($scope.cart).length;
        return true;
      }
      
      $scope.removeCartItem = function(){
        delete $scope.cart[this.id];
      }
    }

})();

