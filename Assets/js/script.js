
const APIKey = '48d2564f931d9d89947234ab9a175583';
let city = "London";

var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${APIKey}`;

fetch(queryURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
});