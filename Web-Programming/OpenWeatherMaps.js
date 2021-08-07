const fetch = require('node-fetch')

const APPID = '' // <-- Put your OpenWeatherMap appid here!
const URL_BASE = 'http://api.openweathermap.org/data/2.5/'

const typeFetch = {
	FORECAST: "forecast",
	ONECALL: "onecall",
	WEATHER: "weather",
}

async function currentWeather (location) {
  return fetchData(location, typeFetch.WEATHER)
}

async function weatherForecast (location) {
  return fetchData(location, typeFetch.FORECAST)
}

async function oneCallApi (latitude, longitude) {
  const response = await fetch(`${URL_BASE+typeFetch.ONECALL}?lat=${latitude}&lon=${longitude}&appid=${APPID}`)
  return parseJson(response)
}

function fetchData (location, type){
  return parseJson(await fetch(`${URL_BASE+type}?q=${location}&appid=${APPID}`))
}

function parseJson (response) {
  return await response.json()
}

function printLog(data){
  console.log(data)
}

currentWeather('Kolkata')
  .then(data => printLog(data))

weatherForecast('Kolkata')
  .then(data => printLog(data))

oneCallApi(55.68, 12.57)
  .then(data => printLog(data))
