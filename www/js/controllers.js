angular.module('starter.controllers', ['chart.js', 'ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.controller('GraphCtrl', function($scope) { // Add a simple controller
  $scope.graph = {};                        // Empty graph object to hold the details for this graph
  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
    //Achieved
    [1680, 1903, 2016, 1998, 1605, 1756, 1580]
  ];
  $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; 

})

.controller('DailyGraphCtrl', function($scope) { 
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
  $scope.graph.data = 
  [500, 400, 150, 690, 430];
  $scope.graph.labels = ['Fruits', 'Vegetables', 'Meat', 'Grains', 'Sweets']; 
})

.controller('GroupGraphCtrl', function($scope, FoodData) {
  //donut
  $scope.graph = {};    
  $scope.graph.data = 
  [202, 234, 66, 690, 908];
  $scope.graph.labels = ['Fruits', 'Vegetables', 'Meat', 'Grains', 'Sweets']; 
})

.controller('CamCtrl', function($scope, $cordovaCamera, FoodData) {

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