angular.module('starter.controllers', ['chart.js', 'ionic', 'ngCordova'])

.controller('GraphCtrl', function($scope) { // Add a simple controller
  $scope.graph = {};                        // Empty graph object to hold the details for this graph
  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
    //Goals
    [2000, 1950, 1900, 1850, 1800, 1750, 1700],
    //Achieved
    [1680, 1903, 2016, 1998, 1605, 1756, 1580]
  ];
  $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];    // Add labels for the X-axis
  $scope.graph.series = ['Goals', 'Achieved'];  // Add information for the hover/touch effect

})

.controller('DoGraphCtrl', function($scope) {
  //donut
  $scope.graph = {};    
  $scope.graph.data = 
  [500, 400, 150, 690, 430];
  $scope.graph.labels = ['Fruits', 'Vegetables', 'Meat', 'Grains', 'Sweets']; 
})

.controller('CamCtrl', function($scope, $cordovaCamera) {
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
        }
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $.ajax({ 
              method: "POST",
              url: "pick-nic.co/uploadimage", 
              data: {image: imageData} 
          })
            .done(function(html){
              $("")
            });
            
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
})



