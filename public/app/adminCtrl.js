angular.module(`DesignDoc`).controller(`adminCtrl`,function($scope,$state,adminService){

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
    console.log(params);
    adminService.params.key=params.key;
    adminService.params.diagnosis=params.diagnosis;
    adminService.params.balance=params.balance,
    adminService.params.emphasis=params.emphasis,
    adminService.params.movement=params.movement,
    adminService.params.pattern=params.pattern,
    adminService.params.repitition=params.repitition,
    adminService.params.proportion=params.proportion,
    adminService.params.rhythm=params.rhythm,
    adminService.params.variety=params.variety,
    adminService.params.unity=params.unity
    adminService.params.patient=params.patient;
    adminService.params.doctor=params.doctor;
    adminService.params.specialty=params.specialty;
    adminService.putPost(adminService.params);
  }
});
