
const express = require('express');
const https = require("https");

var bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{
    // res.send("This is today weather");
    res.sendFile(__dirname+"/index.html");

});

app.post("/",(req,res)=>{
    console.log("post request recieved.");

    const city = req.body.cityName;
    console.log(city);

    const apiKey = "6565a9f3f889424faea135023231604"
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+city;
    
    https.get(url,(response)=>{
        console.log(response.statusCode);
        
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.current.feelslike_c;
            const weatherDescription = weatherData.current.condition.text;
            const weatherIcon = weatherData.current.condition.icon

            // const message =
            // "<h1>This is today's weather in "+city+":</h1>" +
            // "<p>The temperature is " +
            // temp +
            // " degrees Celsius with " +
            // weatherDescription +
            // "</p>"+
            // "<img src='" + weatherIcon + "' alt='Weather Icon'>"; // Add the <img> tag for the weather icon;

            const message = `
            <div class="weather-info">
            <h1 class="weather-info__title">This is today's weather in ${city}:</h1>
            <p class="weather-info__temperature">
            The temperature is ${temp} degrees Celsius with ${weatherDescription}
            </p>
            <img class="weather-info__icon" src="${weatherIcon}" alt="Weather Icon">
            </div>
            `;
            res.send(message);
        })
    })

})

app.listen(port, ()=> {
    console.log("server is up and running" );
})