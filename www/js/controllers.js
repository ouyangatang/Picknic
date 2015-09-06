angular.module('starter.controllers', ['chart.js', 'ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.controller('GraphCtrl', function($scope, FoodData) { // Add a simple controller
  $scope.graph = {};                        // Empty graph object to hold the details for this graph
  $scope.graph.labels = FoodData.dayLabels;

  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
    //Achieved
    FoodData.dailyCalories
  ];
  

})

.controller('DailyGraphCtrl', function($scope,FoodData) { 
  $scope.graph = {};                        
  $scope.graph.data = [                     
    //Achieved
    [280, 490, 621, 800]
  ];
  $scope.graph.labels = ['9AM', '10AM', '12AM', '3AM'];   
  $scope.graph.series = ['Goals', 'Achieved']; 
})

.controller('DoGraphCtrl', function($scope, FoodData) {
  //donut
  $scope.calCount = FoodData.calCount;
  $scope.graph = {};    
  $scope.graph.data = FoodData.foodGroupValues;
  $scope.graph.labels = FoodData.foodGroupNames;
})

.controller('GroupGraphCtrl', function($scope, FoodData) {
  //donut
  $scope.graph = {};    
  $scope.graph.data = FoodData.weeklyFoodGroups;
  $scope.graph.labels = FoodData.foodGroupNames; 
})

.controller('RecentMealsCtrl', function($scope, FoodData) {
  $scope.data = FoodData.recentThreeMeals;
})


.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.controller('CamCtrl', function($scope, $cordovaCamera, FoodData, formDataObject, $http) {

/*
.controller('ButtonCtrl', function($scope) {
  $('#submit').click(function(){
    $('#oldsubmit').click();
  });
  $('#snap').click(function(){
    $('#oldsnap').click();
  });
})

.controller('CamCtrl', function($scope, $cordovaCamera, FoodData) {
>>>>>>> master

    /*$scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        }
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $.ajax({ 
              method: "POST",
              url: "pick-nic.co/uploadimage", 
              data: {image: imageData} 
          })
            .done(function(data){
              $scope.calCount += data.calories;
              FoodData.calCount = $scope.calCount;
              //document.getElementById("totalCalories") = $scope.x
              $ionicTabsDelegate.select(2);
            });
            
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }*/

    $scope.submitForm = function() {
      console.log($('#fileToUpload')[0].files[0])
      var file = $('#fileToUpload')[0].files[0];
      var fd = new FormData();
        fd.append('file', file);
        $http.post('http://45.79.140.244:4567/uploadimage', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          console.log("fuck")
        })
        .error(function(){
          console.log("FUCK YOU")
        });
      // return $http({
      //   method: 'POST',
      //   url: 'http://45.79.140.244:4567/uploadimage',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: {
      //     file: $('#fileToUpload')[0].files[0]
      //   }
      //   //data: new FormData({file: $('#fileToUpload')[0].files[0]})
      // });



  return;

            var fd = new FormData(document.getElementById("fileinfo"));
            fd.append("label", "WEBUPLOAD");
            $.ajax({
              url: 'http://45.79.140.244:4567/uploadimage',
              type: "POST",
              data: {'file': fd},
              enctype: 'multipart/form-data',
              processData: false,  // tell jQuery not to process the data
              contentType: 'multipart/form-data'   // tell jQuery not to set contentType
            })
            
            .done(function( data ){
                $scope.calCount += data.calories;
              FoodData.calCount = $scope.calCount;

                $scope.foodGroup = data;
                console.log(data);
            });


            return false;
        }

    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            alert('FUCK YES');
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.log('dsfjlasdfkdsa');
            alert(err);
            console.log(err);
            // An error occured. Show a message to the user
        });
    }
})

.controller('SuggestionsCtrl', function($scope, uiGmapGoogleMapApi) {
  lng = 0;
  lat = 0;
  $scope.suggestions = [];
  $scope.drawMap = function(position) {
    $scope.$apply(function() {
        lng = position.coords.longitude;
        lat = position.coords.latitude;
    });
  }

  navigator.geolocation.getCurrentPosition($scope.drawMap);

  $.getJSON('http://45.79.140.244:4567/stats/1/'+'39.9011'+'/'+'-75.1719', function(data) {
    console.log(lat);
    console.log(lng);
    console.log(data);
    $scope.suggestions = data["messages"];
  });
})
 

.controller('HomeCtrl', function($scope, uiGmapGoogleMapApi) {
 
  $scope.myLocation = {
    lng : '',
    lat: ''
  }
   
  $scope.drawMap = function(position) {
 
    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {
      $scope.myLocation.lng = position.coords.longitude;
      $scope.myLocation.lat = position.coords.latitude;
 
      $scope.map = {
        center: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
        },
        zoom: 14,
        pan: 1
      };
 
      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
        }
      }; 
       
      $scope.marker.options = {
        draggable: false,
        labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
        labelAnchor: "80 120",
        labelClass: "marker-labels"
      };  
    });
  }
 
  navigator.geolocation.getCurrentPosition($scope.drawMap);  
 
});