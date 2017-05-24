'use strict';

angular.module('DesignDoc').controller('adminCtrl', ["$scope", "$state", "adminService", function ($scope, $state, adminService) {
  $scope.params = {};
  //display principles
  $scope.getPrinciples = function () {
    adminService.getPrinciples().then(function (r) {
      $scope.principles = r;
    });
  };
  $scope.getPrinciples();

  //hide nav/footer
  $('nav').css('display', 'none');
  $('footer').css('display', 'none');

  //===show nav on back===\\
  $scope.handleClick = function () {
    $('nav').css('display', 'flex');
  };

  //encode photos to base64
  $scope.sendPost = function (params) {
    adminService.sendPost(params);
  };

  console.log($scope.params.before);
}]);
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

angular.module('DesignDoc').service('adminService', ["$http", function ($http) {

  //===display principles===\\
  this.getPrinciples = function () {
    return $http.get('/api/principles').then(function (r) {
      var objects = [].concat(_toConsumableArray(r.data));
      var principles = [];
      objects.map(function (x) {
        principles.push(x.name);
      });
      return principles;
    });
  };

  //===send post to server===\\
  this.sendPost = function (p) {
    console.log(p);
    imageExtensionB = p.before.imageData.split(';')[0].split('/');
    imageExtensionB = imageExtensionB[imageExtensionB.length - 1];
    imageExtensionA = p.after.imageData.split(';')[0].split('/');
    imageExtensionA = imageExtensionA[imageExtensionA.length - 1];

    p.before = {
      imageBody: p.before.imageData,
      imageName: p.before.filename,
      imageExtension: imageExtensionB,
      userEmail: 'brennonschow@gmail.com'
    };
    p.after = {
      imageBody: p.after.imageData,
      imageName: p.after.filename,
      imageExtension: imageExtensionA,
      userEmail: 'brennonschow@gmail.com'
    };

    return $http.post('/api/upload', p).then(function (r) {
      console.log(r);
    });
  };
}]);
'use strict';

angular.module('DesignDoc', ['ui.router']).config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home.html',
    controller: 'navCtrl'
  }).state('cases', {
    url: '/cases/:type',
    templateUrl: './views/cases.html',
    controller: 'caseCtrl'
  }).state('admin', {
    url: '/admin',
    templateUrl: './views/admin.html',
    controller: 'adminCtrl'
  });
}]).directive('bgUpload', ["adminService", function (adminService) {
  return {
    restrict: 'A',
    contoller: 'adminCtrl',
    link: function link(scope, elem, attrs) {
      elem.bind('change', function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          var fileread = loadEvent.target.result,
              name = elem[0].files[0].name;
          if (attrs.ngModel === 'params.before') {
            scope.params.before = {
              imageData: fileread,
              filename: name
            };
          } else if (attrs.ngModel === 'params.after') {
            scope.params.after = {
              imageData: fileread,
              filename: name
            };
          }
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
}]);
'use strict';

angular.module('DesignDoc').controller('caseCtrl', ["$scope", "caseService", "$state", function ($scope, caseService, $state) {
  $('nav').css('display', 'flex');
  $('nav').css('display', 'flex');

  //===change small-opt colors===\\
  var red = '#ff4338',
      lightGrey = '#cccccc';
  $scope.changeColor = function (type) {
    if (!type) {
      return;
    } else {
      switch (type) {
        case 'UserExperience':
          $('.small-opt').css('fill', lightGrey);
          $('.ux').css('fill', red);
          break;

        case 'UserInterface':
          $('.small-opt').css('fill', lightGrey);
          $('.ui').css('fill', red);
          break;

        case 'HighProfile':
          $('.small-opt').css('fill', lightGrey);
          $('.hp').css('fill', red);
          break;

        default:
          $('small-opt').css('fill', lightGrey);
      }
    }
  };
  $scope.changeColor($state.params.type);

  //===display cases===\\
  $scope.getCases = function (type) {
    caseService.getCases().then(function (r) {
      $scope.cases = [];
      switch (type) {
        case 'UserInterface':
          $scope.cases = r.data.filter(function (x) {
            return x.specialty === 'User Interface';
          });
          break;

        case 'UserExperience':
          $scope.cases = r.data.filter(function (x) {
            return x.specialty === 'User Experience';
          });
          break;

        case 'HighProfile':
          $scope.cases = r.data.filter(function (x) {
            return x.specialty === 'High Profile';
          });
          break;
      }
    });
  };
  $scope.getCases($state.params.type);

  //===set single case===\\
  $scope.setSingle = function (id) {
    $scope.principles = [];
    caseService.getSingle(id).then(function (r) {
      $scope.single = r.data;
      $scope.single.principles.forEach(function (p, i) {
        $scope.single.principles[i].principle = p.principle.slice(0, 1).toUpperCase() + p.principle.slice(1);
      });
    });
  };
  $scope.section = 'intro';
  //===collapse/expand section on click===\\
  $scope.handleClick = function (section) {
    return $scope.section === section ? $scope.section = null : $scope.section = section;
  };
}]);
"use strict";

angular.module("DesignDoc").service("caseService", ["$http", function ($http) {

  //===display cases===\\
  this.getCases = function (type) {
    return $http.get("/api/cases");
  };

  //===get single case===\\
  this.getSingle = function (id) {
    return $http.get("/api/single?id=" + id);
  };
}]);
"use strict";

angular.module("DesignDoc").controller("navCtrl", ["$scope", "$stateParams", "$state", function ($scope, $stateParams, $state) {
  $("nav").css("dislay", "flex");
  $("footer").css("display", "flex");
  //===manipulation of navbar===\\
  $(".opt").on("click", function (e) {
    $("#logo").css("height", "55%").css("width", "auto");
    $("#pic").css("width", "auto").css("height", "100%").attr("src", "./img/logo_D.png");
    $("#opt-nav").css("display", "flex");
  });
  $("#logo").on("click", function (e) {
    $("#logo").css("width", "250px").css("height", "auto");
    $("#pic").css("width", "100%").css("height", "auto").attr("src", "./img/logo_full.svg");
    $("#opt-nav").css("display", "none");
  });
}]);
//# sourceMappingURL=bundle.js.map
