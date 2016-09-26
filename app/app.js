angular.module("eleicoesCatalao", ["ngMaterial", "ngRoute"])
.controller('myCtrl', function($scope, $mdTheming) {
    var removeFunction = $mdTheming.setBrowserColor({
      theme: 'myTheme', // Default is 'default'
      palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '200' // Default is '800'
    });

    $scope.$on('$destroy', function () {
      removeFunction(); // COMPLETELY removes the browser color
    })
  })

angular.module("eleicoesCatalao").run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function() {
        // $templateCache.removeAll();
        $window.ga('send', 'pageview', { page: $location.url() });
    });
});
