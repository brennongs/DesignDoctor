angular.module(`DesignDoc`).controller(`adminCtrl`,function($scope,$state,adminService){
  $scope.params={};
  //display principles
  $scope.getPrinciples=()=>{
    adminService.getPrinciples().then((r)=>{
      $scope.principles=r;
    })
  }
  $scope.getPrinciples();

  //hide/show nav/footer
  $(`nav`).css(`display`,`none`);
  $(`footer`).css(`display`,`none`);

  //encode photos to base64
  $scope.sendPost=(params)=>{
    adminService.sendPost(params);
  }

  console.log($scope.params.before);
});
