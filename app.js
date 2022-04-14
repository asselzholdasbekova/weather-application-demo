const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const city = req.body.cityName
    const units = 'metric'
    const apiKey = '789baa2c008af5b95a023e80483d3108'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + units + '&appid=' + apiKey
    
    https.get(url, (response) => {

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description

            const icon = weatherData.weather[0].icon
            const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
            
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees in Celsius</h1>")
            res.write("<h1>Weather type: " + weatherDescription + "</h1>")
            res.write("<img src='" + imageURL + "'/>")
            res.send()
        })

    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})