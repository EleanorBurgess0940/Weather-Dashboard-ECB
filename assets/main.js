//this will call when the page is loaded
$(document).ready(function () {
  
  //various variables
  var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
  var searchHistoryList = document.querySelector("#searchHistoryList");
  var currentDay = moment().format("MMMM Do, YYYY");
  var cityName = "";
  var lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
  $("#date").html(currentDay);

  //this will return the day after today and so forth for five days
  var oneDay = moment().add(1, "days").format("MMMM Do");
  $("#oneday").html(oneDay);

  var twoDay = moment().add(2, "days").format("MMMM Do");
  $("#twoday").html(twoDay);

  var threeDay = moment().add(3, "days").format("MMMM Do");
  $("#threeday").html(threeDay);

  var fourDay = moment().add(4, "days").format("MMMM Do");
  $("#fourday").html(fourDay);

  var fiveDay = moment().add(5, "days").format("MMMM Do");
  $("#fiveday").html(fiveDay);

  //this adds functionality to the search bar
  function search() {
    cityName = $("#cityNameSearch").val();

    getWeather(cityName);
    storedSearches();
    renderStoredSearches();
  }

  //onclick function
  searchBtn.addEventListener("click", search);

  //variable that shows current city and then a function that when the current city is clicked it will search for that weather
  var currentCity = geoplugin_city();

  $("#currentCity").html(currentCity);

  $("#currentCity").click(() => {
    cityName = currentCity;
    getWeather(cityName);
  });
 
  //adds functionality to the popular cities
  $(".newCityBtn").click(function () {
    getWeather($(this).text());
  });

  //adds functionality to the searched cities
  $(".searchCityBtn").click(() => {
    getWeather($(this).text());
  });

  //adds functionality to the clear button
  clearBtn.addEventListener("click", clearRecentSearches);

  //grabs the cityName from local storage
  function setLastSearch(cityName) {
    localStorage.setItem("lastSearch", JSON.stringify(cityName));
  }

  //sets the localstorage from search bar
  function storedSearches() {
    searchedCities.push(cityName);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
  }

  //writes a list of the stored Searches
  function renderStoredSearches() {
    if (!searchedCities) {
      searchedCities = [];
    }
    searchHistoryList.innerHTML = "";
    html = "<table>";

    for (let i = 0; i < searchedCities.length; i++) {
      html +=
        '<tr><td><button id="recentSearchBtn' +
        i +
        '">' +
        searchedCities[i] +
        "</button></td>";
      ("</td></tr>");
    }
    html += "</table>";
    document.getElementById("searchHistoryList").innerHTML = html;

    for (let i = 0; i < searchedCities.length; i++) {
      document
        .getElementById("recentSearchBtn" + i)
        .addEventListener("click", recentSearches);
    }
  }

  //Gets the weather for the text on the button
  function recentSearches() {
    getWeather($(this).text());
  }

  //Clears localStorage
  function clearRecentSearches() {
    localStorage.clear();
    location.reload();
  }

  //Ajax calls for todays weather and five day forecast
  function getWeather(cityName) {
    var apiKey = "3c6fea3acc237375fd52d7b6d98475c0";
    var oneDayQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey;
    var fiveDayQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey;
    
      //Ajax call for todays weather
    $.ajax({
      url: oneDayQueryURL,
      method: "GET",
    }).then(function (response) {
      //variables needed to grab the icon
      var iconCode = response.weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
      //will change todays forecast and show up
      $("#weatherIcon").attr("src", iconURL);
      $("#city").html(response.name);
      $("#temp").html("Temperature: " + parseInt(response.main.temp));
      $("#humidity").html("Humidity: " + response.main.humidity + "%");
      $("#windSpeed").html("Wind Speed: " + response.wind.speed + " mph");
      $("#feelsLike").html("Feels Like: " + parseInt(response.main.feels_like));
      
      //ajax call for uv 
      var { lon } = response.coord;
      var { lat } = response.coord;
      var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      $.ajax({
        url: uvQueryURL,
        method: "GET",
      }).then(function (response) {
        $("#uvIndex").html("UV Index: " + response.value);
      });
    });

    //ajax call for five day forecast
    $.ajax({
      url: fiveDayQueryURL,
      method: "GET",
    }).then(function (response) {

      $("#tempTwo").html(
        "Temperature: " + parseInt(response.list[0].main.temp)
      );
      $("#humidTwo").html("Humidity: " + response.list[0].main.humidity + "%");
      var iconCodeTwo = response.list[0].weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCodeTwo}@2x.png`;
      $("#iconCodeTwo").attr("src", iconURL);

      $("#tempThree").html(
        "Temperature: " + parseInt(response.list[8].main.temp)
      );
      $("#humidThree").html(
        "Humidity: " + response.list[8].main.humidity + "%"
      );
      var iconCodeThree = response.list[8].weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCodeThree}@2x.png`;
      $("#iconCodeThree").attr("src", iconURL);

      $("#tempFour").html(
        "Temperature: " + parseInt(response.list[16].main.temp)
      );
      $("#humidFour").html(
        "Humidity: " + response.list[16].main.humidity + "%"
      );
      var iconCodeFour = response.list[16].weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCodeFour}@2x.png`;
      $("#iconCodeFour").attr("src", iconURL);

      $("#humidFive").html(
        "Humidity: " + response.list[24].main.humidity + "%"
      );
      $("#tempFive").html(
        "Temperature: " + parseInt(response.list[24].main.temp)
      );
      var iconCodeFive = response.list[24].weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCodeFive}@2x.png`;
      $("#iconCodeFive").attr("src", iconURL);

      $("#tempSix").html(
        "Temperature: " + parseInt(response.list[32].main.temp)
      );
      $("#humidSix").html("Humidity: " + response.list[32].main.humidity + "%");
      var iconCodeSix = response.list[32].weather[0].icon;
      var iconURL = `https://openweathermap.org/img/wn/${iconCodeSix}@2x.png`;
      $("#iconCodeSix").attr("src", iconURL);
    });

    setLastSearch(cityName);
  }

  renderStoredSearches();
  getWeather(lastSearch);
});
