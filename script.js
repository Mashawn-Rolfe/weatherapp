const input = document.getElementById("input"),
  converter=document.getElementById("converter"),
  weatherIcon=document.querySelector(".weatherIcon"),
  temperature=document.querySelector(".temperature"),
  feelsLike=document.querySelector(".feels-like"),
  description=document.querySelector(".description"),
  date=document.querySelector(".date"),
  city=document.querySelector(".city");
    
  humidityValue=document.getElementById("humidity-value"),
  windspeedValue=document.getElementById("wind-speed-value"),
  sunriseValue=document.getElementById("sunrise-value"),
  sunsetValue=document.getElementById("sunset-value"),
  cloudsValue=document.getElementById("clouds-value"),
  minTempValue=document.getElementById("min-temp-value"),
  maxTempValue=document.getElementById("max-temp-value"),
  pressureValue=document.getElementById("pressure-value"),
  
  forcast=document.querySelector(".forcast");

  //const unitParam = unitConverter()

  apiLink = `https://api.openweathermap.org/data/2.5/weather?appid=281efa7871c9d8f01565fc02dc1c7101${unitConverter()}&q=`;

  /*function unitConverter() {
          if (converter.value === "°K") {
            return "";
          } else if (converter.value == "°F") {
            return "&units=imperial";
          } else {
            return "&units=metric";
          }
        }*/

  apiData=`https://api.openweathermap.org/data/2.5/weather?appid=281efa7871c9d8f01565fc02dc1c7101&exclude=minutely${unitConverter()}&`;
  forcastApi=`https://api.openweathermap.org/data/2.5/forecast?appid=281efa7871c9d8f01565fc02dc1c7101&exclude=minutely${unitConverter()}&`;
  function getWeather() 
  {
    fetch(apiLink + input.value)
    .then((response) => response.json())
    .then((data) => {  
      if(data.cod!=200 && data.cod!='')
      {
        alert(data.message);
        return;
      } 
      console.log(data);

      city.innerHTML = data.name+", " + data.sys.country;
      weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

      fetch(apiData + `lon=${data.coord.lon}&lat=${data.coord.lat}`)
      .then((response) => response.json())
      .then((data) => 
        {
        console.log(data);
        temperature.innerHTML=data.main.temp + " °C";
        feelsLike.innerHTML="Feels like: " +data.main.feels_like + " °C";
        description.innerHTML=data.weather[0].description;
        humidityValue.innerHTML=data.main.humidity + "<span>%</span>";
        windspeedValue.innerHTML=data.wind.speed + "<span> m/s</span>";
        cloudsValue.innerHTML=data.clouds.all + "<span>%</span>";
        pressureValue.innerHTML=data.main.pressure + "<span> hPa</span>";
        minTempValue.innerHTML=data.main.temp_min + " °C";
        maxTempValue.innerHTML=data.main.temp_max + " °C";
        date.innerHTML = new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });       
        sunriseValue.innerHTML= formatTime(data.sys.sunrise);
        sunsetValue.innerHTML= formatTime(data.sys.sunset);

        });
        /*function formatTime(dtValue, option={}){ 
          const date = new Date(dtValue *1000);
          return date.toLocaleTimeString([], { timeZone: timezone.value, ...option});
        }*/

      });
      
      

  }
