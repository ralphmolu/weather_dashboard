
const APIKey = '48d2564f931d9d89947234ab9a175583';
let city = 'Durham';
let countryCode;

var citySearchURL = `https:api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${APIKey}`;



// this function takes the user input, fetches the coordinates of the city entered and returns the weather using the coordinates
// function getWeather(){}
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
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
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

        console.log(data.city.name +" (" + simplifiedDate + ")" );
        console.log("Temp: " + data.list[0].main.temp + " °K");
        console.log("Wind: " + data.list[0].wind.speed + " MPH");
        console.log("Humidity: " + data.list[0].main.humidity + " %");
        console.log("lat: " + lat)
        console.log("lon: " + lon)

    })




    //create 
   
    
});

