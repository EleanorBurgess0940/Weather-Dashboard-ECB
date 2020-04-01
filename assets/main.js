$(document).ready(function() {
  var currentDay = moment().format("MMMM Do, YYYY");
  $("#date").html(currentDay);

  var oneDay = moment()
    .add(1, "days")
    .format("MMMM Do");
  $("#oneday").html(oneDay);

  var twoDay = moment()
    .add(2, "days")
    .format("MMMM Do");
  $("#twoday").html(twoDay);

  var threeDay = moment()
    .add(3, "days")
    .format("MMMM Do");
  $("#threeday").html(threeDay);

  var fourDay = moment()
    .add(4, "days")
    .format("MMMM Do");
  $("#fourday").html(fourDay);

  var fiveDay = moment()
    .add(5, "days")
    .format("MMMM Do");
  $("#fiveday").html(fiveDay);
});

var apiKey = "3c6fea3acc237375fd52d7b6d98475c0";
var cityName = "Philadelphia";
var oneDayQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
var fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

$.ajax({
  url: oneDayQueryURL,
  method: "GET"
}).then(function(response) {
  var iconCode = response.weather[0].icon;
  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  $("#weatherIcon").attr("src", iconURL);
  $("#city").html(response.name);
  $("#temp").html("Temperature: " + response.main.temp);
  $("#humidity").html("Humidity: " + response.main.humidity + "%");
  $("#windSpeed").html("Wind Speed: " + response.wind.speed + " mph");
  var { lon } = response.coord;
  var { lat } = response.coord;
  var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  $.ajax({
    url: uvQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#uvIndex").html("UV Index: " + response.value);
  });
});

$.ajax({
  url: fiveDayQueryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  $("#tempTwo").html("Temperature: " + response.list[0].main.temp);
  $("#tempThree").html("Temperature: " + response.list[1].main.temp);
  $("#tempFour").html("Temperature: " + response.list[2].main.temp);
  $("#tempFive").html("Temperature: " + response.list[3].main.temp);
  $("#tempSix").html("Temperature: " + response.list[4].main.temp);

  $("#humidTwo").html("Humidity: " + response.list[0].main.humidity + "%");
  $("#humidThree").html("Humidity: " + response.list[1].main.humidity + "%");
  $("#humidFour").html("Humidity: " + response.list[2].main.humidity + "%");
  $("#humidFive").html("Humidity: " + response.list[3].main.humidity + "%");
  $("#humidSix").html("Humidity: " + response.list[4].main.humidity + "%");
});
