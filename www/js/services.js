angular.module('starter.services', [])

.service('FoodData', function() {
	months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	var Data = {};
	Data.calCount = 0;
	Data.foodGroupNames = [];
	Data.foodGroupValues = [];
	Data.recentThreeMeals = [];
	Data.dailyCalories = [0,0,0,0,0,0,0];
	Data.weeklyFoodGroups = [];
	Data.dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	$.getJSON('http://45.79.140.244:4567/log/1', function(data) {
		var date = new Date();
	  	var d = date.getDate();
	  	var m = date.getMonth();
	  	var y = date.getFullYear();
	  	var day = date.getDay();
	  	for (i=6; i>day; i--) {
	  	  Data.dayLabels.unshift(Data.dayLabels[Data.dayLabels.length-1]);
	  	  Data.dayLabels.splice(Data.dayLabels.length-1,1);
	  	}

		numEntries = data.length;
		for (i=0; i<numEntries; i++) {
			entry = data[i];
			entryDay = Data.dayLabels.indexOf(entry["date"].split(" ")[0]);
			entryMonth = entry["date"].split(" ")[1];
			entryDate = entry["date"].split(" ")[2];
			entryYear = entry["date"].split(" ")[5];
			if (entryDate > d-7) {
				Data.dailyCalories[entryDay] += parseInt(entry["cal"]);
			}

			if (i>=numEntries-3) {
				Data.recentThreeMeals.push(entry["name"]+"<>"+entry["cal"]+"<>"+entry["date"]);
			}
			Data.calCount += parseInt(entry["cal"])
			if (entry["group"] == undefined) {
				entry["group"] = "Other";
			}
			if (Data.foodGroupNames.indexOf(entry["group"]) < 0) {
				Data.foodGroupNames.push(entry["group"]);
				Data.foodGroupValues.push(parseInt(entry["cal"]));
				Data.weeklyFoodGroups.push(0);
			} else {
				index = Data.foodGroupNames.indexOf(entry["group"]);
				Data.foodGroupValues[index] += parseInt(entry["cal"]);
			}

			if (entryDate > d-7) {
				Data.weeklyFoodGroups[Data.foodGroupNames.indexOf(entry["group"])] += parseInt(entry["cal"]);
			}
		}
		vegindex = Data.foodGroupNames.indexOf("Vegetables and Vegetable Products");
		if (vegindex >= 0) {
			Data.foodGroupNames[vegindex] = "Vegetables";
		}
		meatindex = Data.foodGroupNames.indexOf("Sausages and Luncheon Meats");
		if (meatindex >= 0) {
			Data.foodGroupNames[meatindex] = "Meat";
		}
		if (Data.recentThreeMeals.length < 3) {
			Data.recentThreeMeals.push("No Meal<>0<>No Day");
		}
		if (Data.recentThreeMeals.length < 2) {
			Data.recentThreeMeals.push("No Meal<>0<>No Day");
		}
		if (Data.recentThreeMeals.length < 1) {
			Data.recentThreeMeals.push("No Meal<>0<>No Day");
		}
		console.log(Data.calCount);
		console.log(Data.foodGroupNames);
		console.log(Data.foodGroupValues);
		console.log(Data.recentThreeMeals);
	});

  // Data.calCount = 0;
  // Data.foodGroup = [];

  return Data;
})

.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			fd.append(key, value);
		});
		return fd;
	};
});