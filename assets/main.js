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
var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

$.ajax({
  url: onedayURL,
  method: "GET"
}).then(function(response) {
  console.log(onedayURL);
  console.log(response);
  console.log(response.weather[0].icon);
  var iconCode = response.weather[0].icon;
  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  $("#weatherIcon").attr("src", iconURL);
  $("#city").html(response.name);
  $("#temp").html("Temperature: " + response.main.temp);
  $("#humidity").html("Humidity: " + response.main.humidity + "%");
  $("#windSpeed").html("Wind Speed: " + response.wind.speed + " mph");
});
