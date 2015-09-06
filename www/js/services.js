angular.module('starter.services', [])

.service('FoodData', function() {
  var Data = {};

  Data.calCount = 0;

  return Data;
});
