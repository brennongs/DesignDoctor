angular.module(`DesignDoc`).controller(`navCtrl`,function($scope,$stateParams,$state){
  $(`nav`).css(`dislay`,`flex`);
  $(`footer`).css(`display`,`flex`);
  //===manipulation of navbar===\\
    $(`.opt`).on(`click`, (e)=>{
      $(`#logo`).css(`height`,`55%`).css(`width`,`auto`);
      $(`#pic`).css(`width`,`auto`).css(`height`,`100%`).attr(`src`,`./img/logo_D.png`);
      $(`#opt-nav`).css(`display`,`flex`);
    });
    $(`#logo`).on(`click`, (e)=>{
      $(`#logo`).css(`width`,`250px`).css(`height`,`auto`);
      $(`#pic`).css(`width`,`100%`).css(`height`,`auto`).attr(`src`,`./img/logo_full.svg`);
      $(`#opt-nav`).css(`display`,`none`);
    });
    $scope.show=false
    $scope.logShow=()=>{
      console.log($scope.show)
    }
});
