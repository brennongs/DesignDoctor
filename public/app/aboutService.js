angular.module('DesignDoc').service('aboutService',function($http){
  //===get texts===//
  this.getText=(name)=>{
    return $http.get(`/api/texts/${name}`).then((response)=>response)
  }
})
