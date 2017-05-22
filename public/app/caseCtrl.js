angular.module(`DesignDoc`).controller(`caseCtrl`, function($scope, caseService, $state){
  $(`nav`).css(`display`,`flex`);
  $(`nav`).css(`display`,`flex`);

  //===change small-opt colors===\\
  const red=`#ff4338`,
        lightGrey=`#cccccc`;
  $scope.changeColor=(type)=>{
    if(!type){
      return;
    }
    else{
      switch (type){
        case 'UserExperience':
          $(`.small-opt`).css(`fill`,lightGrey);
          $(`.ux`).css(`fill`,red);
          break;

        case 'UserInterface':
          $(`.small-opt`).css(`fill`,lightGrey);
          $(`.ui`).css(`fill`,red);
          break;

        case 'HighProfile':
          $(`.small-opt`).css(`fill`,lightGrey);
          $(`.hp`).css(`fill`,red);
          break;

        default:
          $(`small-opt`).css(`fill`,lightGrey);
      }
    }
  }
  $scope.changeColor($state.params.type)


//===display cases===\\
  $scope.getCases=(type)=>{
    caseService.getCases().then((r)=>{
      $scope.cases=[];
      switch(type){
        case `UserInterface`:
          $scope.cases=r.data.filter((x)=>{
            return x.specialty===`User Interface`;
          });
          break;

        case `UserExperience`:
          $scope.cases=r.data.filter((x)=>{
            return x.specialty===`User Experience`;
          });
          break;

        case `HighProfile`:
          $scope.cases=r.data.filter((x)=>{
            return x.specialty===`High Profile`
          })
          break;
      }
    })
  }
  $scope.getCases($state.params.type);

  //===set single case===\\
  $scope.setSingle=(id)=>{
    $scope.principles=[]
    caseService.getSingle(id).then((r)=>{
      $scope.single=r.data
      $scope.single.principles.forEach((p, i)=>{
        $scope.single.principles[i].principle=p.principle.slice(0,1).toUpperCase()+p.principle.slice(1)
      })
    })
  }
  $scope.section='intro'
});
