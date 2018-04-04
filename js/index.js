/*
  Tausif S. 2018
*/

// Storing location and temperature as global variables to access and update at different places.
var geoLoc = [0, 0];
var tempCelsius = 0;

// Update weather function. Updates weather and location.
function updateWeather(){
  // Acquring location with HTML5 geolocation and reseting weather icon and button status.
  $("#location").html("Acquiring Location");
  $(".weatherIcon").css("display", "none");
  $("#celsius").addClass("active");
  $("#fahrenheit").removeClass("active");
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $("#location").html("Location Found");
      
      // Storing location coordinates and establishing API URL.
      geoLoc = [position.coords.latitude, position.coords.longitude];
      var urlStr = "https://fcc-weather-api.glitch.me/api/current?lat=" + geoLoc[0] + "&lon=" + geoLoc[1];
            
      // Working with the FreeCodeCamp Weather API.
      $.ajax({
        // Getting the JSON weather API data.
        type: "GET",
        url: urlStr,
        
        // Updating the weather related HTML divs.
        success: function(data){
          // Updating global temperature variable. 
          tempCelsius = Math.round(data.main.temp);
          
          // Updating temp and location HTML divs.
          $("#temp").html(tempCelsius + "&deg;<sup>C</sup>");
          $("#location").html(data.name + ", " + data.sys.country);
          $("#weatherType").html(data.weather[0].main);
          
          // Grabbing weather ID.
          var weatherID = data.weather[0].id;
          
          // Making appropriate weather icon visible.
          if(weatherID == 800 && data.dt < data.sys.sunset){
            $(".clearDay").css("display", "block");
          }else if(weatherID == 800 && data.dt >= data.sys.sunset){
            $(".clearNight").css("display", "block");
          }else if(weatherID >= 801 && weatherID <= 804){
            $(".clouds").css("display", "block");
          }else if(weatherID >= 300 && weatherID <= 599){
            $(".rain").css("display", "block");
          }else if(weatherID >= 200 && weatherID <= 299){
            $(".thunder").css("display", "block");
          }else if(weatherID >= 600 && weatherID <= 699){
            $(".snow").css("display", "block");
          }else if(weatherID >= 700 && weatherID <= 733){
            $(".mist").css("display", "block");
          }else{
            $(".otherWeather").css("display", "block");
          }
        },
        
        // In case of error, used for debugging.
        error: function(){
          console.log("AJAX Failed");
        },
        
        // Allows API to work with AJAX.
        cache: false
      });
    }, function(){
      // IF the HTML5 Geolocation API timesout at 10 sec.
      $("#location").html("Could Not Find Location, Try Again!");
    }, {timeout:10000});
  } 
}

// Inital weather capture producer.
updateWeather();

// jQuery button listener to update weather.
$(document).ready(function(){
  $("#getTemp").click(function(){
    $("#location").html("Acquiring Location");
    updateWeather();
  });
});

// jQuery button listener to change to celsius.
$(document).ready(function(){
  $("#celsius").click(function(){
    $("#fahrenheit").removeClass("active");
    $("#celsius").addClass("active");
    $("#temp").html(tempCelsius + "&deg;<sup>C</sup>");
  });
});

// jQuery button listener to change to fahrenheit.
$(document).ready(function(){
  $("#fahrenheit").click(function(){
    $("#celsius").removeClass("active");
    $("#fahrenheit").addClass("active");
    $("#temp").html((Math.round(tempCelsius*1.8) + 32) + "&deg;<sup>F</sup>");
  });
});