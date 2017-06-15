angular.module('DesignDoc').controller('aboutCtrl',function($scope, $state, $sce, aboutService){

  $scope.getText=(name, cb)=>{
    aboutService.getText(name).then((response)=>{
      cb(response.data)
    })
  }


  $scope.setPage=(url)=>{
    switch (url) {
      case '/about-this':
        $scope.getText('about-quote',(x)=>{$scope.quote=$sce.trustAsHtml(x)})
        $scope.getText('quote-author',(x)=>{$scope.author=$sce.trustAsHtml(x)})
        $scope.getText('about-this',(x)=>{$scope.about=$sce.trustAsHtml(x)})
        break
      case '/about-me':
        $scope.getText('about-me',(x)=>{$scope.about=$sce.trustAsHtml(x)})
    }
  }
  $scope.setPage($state.current.url)
})
