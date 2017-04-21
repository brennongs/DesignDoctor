angular.module(`DesignDoc`).service(`caseService`,function($http){

  //===display cases===\\
  this.getCases=(type)=>{
    return $http.get(`/api/cases`)
  }
})
