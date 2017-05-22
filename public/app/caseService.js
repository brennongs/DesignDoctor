angular.module(`DesignDoc`).service(`caseService`,function($http){

  //===display cases===\\
  this.getCases=(type)=>{
    return $http.get(`/api/cases`)
  }

  //===get single case===\\
  this.getSingle=(id)=>{
    return $http.get(`/api/single?id=${id}`)
  }
})
