var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl : 'mainPage.html',
    controller   : 'mainPageController'
  });
});

app.directive("chosen", [function() {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          var config = {
              '.chosen-select'           : {},
              '.chosen-select-deselect'  : {allow_single_deselect:true},
              '.chosen-select-no-single' : {disable_search_threshold:10},
              '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
              '.chosen-select-width'     : {width:"95%"}
          };

          for (var selector in config) {
              $(selector).chosen(config[selector]);
          }
      }
  };
}]);

app.controller('mainPageController', function($scope,$http, $timeout) {

  $scope.init = function(){

    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.isActive = "home";
    $scope.selectList = ["branch1", "branch2", "branch3", "branch4"];
    $scope.selectedItem = [];
    $scope.loadContinents();
  };

  $scope.loadContinents = function(){

    $http.get('http://www.geonames.org/childrenJSON?geonameId=6295630')
    .then(function(response){
      // console.log(response.data);
      $scope.continents = response.data.geonames;
    });
  };

  //http://api.geonames.org/countryInfoJSON?username=demo
  $scope.loadCountries = function(continentSelected){
    if(continentSelected){

      var endPoint = 'http://www.geonames.org/childrenJSON?geonameId='+ continentSelected;
      $http.get(endPoint)
      .then(function(response){
        // console.log(response.data);
        $scope.countries = response.data.geonames;
      });

    }
  };

  $scope.loadStates = function(countrySelected){
    if(countrySelected){

      var endPoint = 'http://www.geonames.org/childrenJSON?geonameId='+ countrySelected;
      $http.get(endPoint)
      .then(function(response){
        // console.log(response.data);
        $scope.states = response.data.geonames;
      });

    }
  };

  $scope.loadDistrict = function(stateSelected){
    if(stateSelected){

      var endPoint = 'http://www.geonames.org/childrenJSON?geonameId='+ stateSelected;
      $http.get(endPoint)
      .then(function(response){
        // console.log(response.data);
        $scope.districts = response.data.geonames;
      });

    }
  };

  $scope.loadCity = function(districtSelected){
    if(districtSelected){

      var endPoint = 'http://www.geonames.org/childrenJSON?geonameId='+ districtSelected;
      $http.get(endPoint)
      .then(function(response){
        // console.log(response.data);
        $scope.cities = response.data.geonames;
        if($scope.cities){

          var convertToBranches = $scope.cities;
           var branchesList= convertToBranches.map(function(branch){
            return branch['name'];
          });
          $scope.selectList = branchesList;

        }
      });

    }
  };


$scope.init();

});
