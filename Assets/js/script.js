
const APIKey = '48d2564f931d9d89947234ab9a175583';
let city = 'Durham';
let countryCode;

var citySearchURL = `https:api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${APIKey}`;



// this function takes the user input, fetches the coordinates of the city entered and returns the weather using the coordinates
function getWeather(){

 //clear existing data in the container
 $("#currentWeatherContainer").empty();
 $("#forecasstData").empty();

 var cityInput = $("#cityInput").val();
 var icon =$("<img>");

fetch(citySearchURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    
    //variables to store longitude (lon) and lattitude (lat) of entered city
    var lon = data.city.coord.lon;
    var lat = data.city.coord.lat;
    
    // using the geolocation to pull weather information
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        

        //display the date in simplified format from Unix Timestamp conversion
        const date = new Date(data.list[0].dt * 1000); // convert unix seconds to milliseconds and store under Date object instance

        //extracting date components
        var month = date.getMonth() +1; // months in this method are indexed starting at 0 for Jan, 1 for Feb...
        var day = date.getDate();
        var year = date.getFullYear();

        var simplifiedDate = `${month}/${day}/${year}`;

        var weatherIcon = data.list[0].weather[0].icon;
        var iconSrc = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
        icon.attr("src", iconSrc).attr("alt", "Weather Icon");

        //create html tags, insert text from API response and store them in variables
        var cityName = $("<h3>").text(data.city.name);
        var currentTemp = $("<div>").text("Temp: " + data.list[0].main.temp + " °F");
        var currentWindSpeed = $("<div>").text("Wind: " + data.list[0].wind.speed + " MPH");
        var currentHumidity = $("<div>").text("Humidity: " + data.list[0].main.humidity + " %");

        //append all API endpoints onto web app
        $("#currentWeatherContainer").append(cityName);
        $("#currentWeatherContainer").append(" (" + simplifiedDate + ")" );
        $("#currentWeatherContainer").append(icon);
        $("#currentWeatherContainer").append(currentTemp);
        $("#currentWeatherContainer").append(currentWindSpeed);
        $("#currentWeatherContainer").append(currentHumidity);

        //generating forecast weather cards
        for (var i = 0; i < 5; i++){

            var dailyForecastCard = $("<div>");
            var forecastData = data.list[i];

            //retreive the temp, the humidity, the wind speed, the date and the icon
            var forecastTemp = forecastData.main.temp;
            var forecastHumidity = forecastData.main.humidity;
            var forecastWindSpeed = forecastData.wind.speed;
            var newDate = new Date(forecastData.dt * 1000); // convert Unix timestamp to milliseconds
            var forecastDate =  newDate.toLocaleDateString(); // convert date to readable format
            var forecastIconSrc = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
            

            //create HTML elements to display retrieved info
            var forecastCard = $("<div>").addClass("forecastCard");
            var displayDate = $("<h3>").addClass("card-title").text(`${forecastDate}`);
            var displayIcon = $("<img>").attr("src", forecastIconSrc).attr("alt", "Weather Icon");
            var displayTemp = $("<p>").addClass("card-text").text(`Temp: ${forecastTemp} °F`);
            var displayWindSpeed = $("<p>").addClass("card-text").text(`Wind Speed: ${forecastWindSpeed} MPH`);
            var displayHumidity = $("<p>").addClass("card-text").text(`Humidity: ${forecastHumidity} %`);

            //make retrived infor visible
            forecastCard.append(displayDate);
            forecastCard.append(displayIcon);
            forecastCard.append(displayTemp);
            forecastCard.append(displayWindSpeed);
            forecastCard.append(displayHumidity);
            $("#forecastContainer").append(forecastCard);

        }

        console.log(data.city.name +" (" + simplifiedDate + ")" );
        console.log("Temp: " + data.list[0].main.temp + " °F");
        console.log("Wind: " + data.list[0].wind.speed + " MPH");
        console.log("Humidity: " + data.list[0].main.humidity + " %");
      

    })




    //create 
   
    
});
}
getWeather();

