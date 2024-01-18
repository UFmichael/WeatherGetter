var fetchData = {
    base_site: "http://api.weatherstack.com/",
    type: "current",
    acc: "?access_key=",
    key: "6569eb8d0f99c05cce90dcd22389ad08",
    que: "&query=",
    location: "New York"
}

var weatherAPILink = "https://api.open-meteo.com/v1/forecast?latitude=26.3587&longitude=-80.0831&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York&forecast_days=1"; 
var builtWeatherLink = "";
var locationFinished = false;

var curr_location = "Please Enter A Location: ";

// var weatherData = {
//     latitude: " ",
//     type: " " 
//}

var weatherData;

async function getAPIResponse(){
    const response = await fetch(builtWeatherLink);
   
    // Storing data in form of JSON
    weatherData = await response.json(builtWeatherLink);
    console.log(weatherData["latitude"]);

    //get daily
    document.getElementById("appTempMin").innerHTML=weatherData["daily"]["apparent_temperature_min"];
    document.getElementById("appTempMax").innerHTML=weatherData["daily"]["apparent_temperature_max"];
    document.getElementById("precipSum").innerHTML=weatherData["daily"]["precipitation_sum"];
    document.getElementById("times").innerHTML=weatherData["daily"]["time"];
    document.getElementById("windMax").innerHTML=weatherData["daily"]["windspeed_10m_max"];

    // //get hourly
    // document.getElementById("hourlyTime").innerHTML=
    // document.getElementById("hourlyTemp").innerHTML=
    // document.getElementById("hourlyPrecipProb").innerHTML=
    // document.getElementById("hourlyWind").innerHTML=
};

function getWeatherLink(latitude, longitude, timezone){
    builtWeatherLink = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude+ "&longitude=" + longitude + "&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone="+ timezone + "&forecast_days=1";
    // document.getElementById("meteo_link").innerHTML=builtWeatherLink;
    var res;
    fetch(builtWeatherLink).then(res => res.json()).then(console.log);

    getAPIResponse();
}

function getLocation(){
    document.getElementById("location").innerHTML=curr_location;
}
function changeTopText(){
    document.getElementById("toptext").innerHTML="Welcome To Michael's Weather Report!";
}
function getWeatherStackLink(){
    var theLink = fetchData.base_site+fetchData.type+fetchData.acc+fetchData.key+fetchData.que+fetchData.location
    // document.getElementById("link").innerHTML=theLink;
}
function updateLocationText(name){
    curr_location = curr_location + name; 
    document.getElementById("location").innerHTML=curr_location;
}
function updateLocationTextDelete(){
    document.getElementById("location").innerHTML="delete";
}
function removeLastLocationChar(){
    if(curr_location.length > 25){
        curr_location = curr_location.slice(0, curr_location.length -1);
    }
    document.getElementById("location").innerHTML=curr_location;
}

function setLocation(){
    fetchData.location = curr_location.slice(25, curr_location.length);
    var printSet = "Chosen Location: " + fetchData.location;
    document.getElementById("location").innerHTML=printSet;
    runAPIWeather();
}

function runAPIWeather(){
    //currently placeholders
    var long = 29.651634;
    var lat = -82.324829;
    var tzone = "auto";
    // getLongitude();
    // getLatitude();
    // getTimeZone();

    // getWeatherStackLink();
    getWeatherLink(long, lat, tzone);
    
    document.getElementById("final_part").innerHTML="i ran here";
    //use placeholder link
    // http://api.weatherstack.com/current?access_key=6569eb8d0f99c05cce90dcd22389ad08&query=New%20York
    
}

window.onload = function() {
    changeTopText()
    getLocation();
}

document.addEventListener('keypress', (event) => {
    var name = event.key;
    if(name == "Enter"){
        locationFinished = true;
        setLocation();
    }
    if(locationFinished == false){
        document.getElementById("input_char").innerHTML=name;
        updateLocationText(name);
    }
}, false);

document.addEventListener("keydown", function(event) { 
    if(locationFinished == false){
        document.getElementById("input_code").innerHTML=event.code;
        if(event.code == "Backspace"){
            // updateLocationTextDelete();
            removeLastLocationChar();
        }
    }
})


// var base_site = 'https://api.weatherstack.com/';
// var type = 'current';
// var acc = '?access_key=';
// var key = '6569eb8d0f99c05cce90dcd22389ad08';
// var que = '&query=';
// var location = 'New York';
// var fetch_link = base_site + type + acc + key + que + location;
// document.getElementById("demo").innerHTML = fetch_link;
// fetch
// https://api.weatherstack.com/current?access_key=6569eb8d0f99c05cce90dcd22389ad08&query=New York