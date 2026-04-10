tl = gsap.timeline();

tl.from("div.logo,div.btn-group", {
  duration: 1,
  opacity: 0,
  delay: 0.3,
  stagger: 0.5,
});

tl.from("div.container-fla", {
  opacity: 0,
  duration: 0.4,
});

let video = document.querySelector("video");

let rand_number = Math.floor(Math.random() * length);

let iconRoot = "./assets/icons/";

let search = document.querySelector("input.search");

let submit = document.querySelector("input.submit");

let show_city = document.querySelector("span.city");

let show_temperature = document.querySelector("span.show_temperature");

let show_weather_text = document.querySelector("span.show_weather_text");

let humidity = document.querySelector("span.humidity");

let speed = document.querySelector("span.speed");

let degree = document.querySelector("span.degree");

let longitude = document.querySelector("span.longitude");

let latitude = document.querySelector("span.latitude");

let icon_weather = document.querySelector("img.symbol_weather");

let main_parent = document.querySelector("div.weather_main_parent");

let iframe = document.querySelector("iframe.city_information");

// Voice Effect
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text); //Speech Request
  text_speak.volume = 1;
  text_speak.rate = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak); //Human Speech
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let city = search.value;

  let open_weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d40a0735c2b47b69146db86045844d5`;

  async function get_temp() {
    let open_weat = await fetch(open_weather);
    let open_json = await open_weat.json();

    main_parent.style.display = "block";

    // Adding GSAP Effect
    tl.from("div.weather_main_parent", {
      opacity: 0,
      duration: 0.4,
      scale: 0,
    });

    tl.from(
      "div.city,div.weather_symbol,div.real_feel_shade,div.weather_text,div.humd,div.speed,div.degree,div.longitude,div.latitude",
      {
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
      },
    );

    // Iframe Information
    iframe.style.display = "block";
    iframe.src = `https://en.wikipedia.org/wiki/${city}`;

    // Weather Data Retrieve
    if (open_weat.status != 200) {
      show_city.textContent = "N/A";
      show_temperature.innerText = "N/A";
      show_weather_text.innerText = "N/A";
      humidity.innerText = "N/A";
      speed.innerText = "N/A";
      degree.innerText = "N/A";
      longitude.innerText = "N/A";
      latitude.innerText = "N/A";
      icon_weather.src = "notFound.png";
      speak("Please Enter a Valid City Name");
    } else if (open_weat.status == 200) {
      show_city.textContent = open_json.name;

      let imgs_fetch = open_json.weather[0].icon;

      // Icons Conditions
      if (imgs_fetch == "01n") {
        icon_weather.src = `${iconRoot}01n.png`;
      } else if (imgs_fetch == "01d") {
        icon_weather.src = `${iconRoot}01d.png`;
      } else if (imgs_fetch == "02d") {
        icon_weather.src = `${iconRoot}02d.png`;
      } else if (imgs_fetch == "02n") {
        icon_weather.src = `${iconRoot}02n.png`;
      } else if (imgs_fetch == "03d" || imgs_fetch == "03n") {
        icon_weather.src = `${iconRoot}03d.png`;
      } else if (imgs_fetch == "04d" || imgs_fetch == "04n") {
        icon_weather.src = `${iconRoot}04d.png`;
      } else if (imgs_fetch == "09d" || imgs_fetch == "09n") {
        icon_weather.src = `${iconRoot}09n.png`;
      } else if (imgs_fetch == "10d") {
        icon_weather.src = `${iconRoot}10d.png`;
      } else if (imgs_fetch == "10n") {
        icon_weather.src = `${iconRoot}10n.png`;
      } else if (imgs_fetch == "11d" || imgs_fetch == "11n") {
        icon_weather.src = `${iconRoot}11d.png`;
      } else if (imgs_fetch == "13d" || imgs_fetch == "13n") {
        icon_weather.src = `${iconRoot}13d.png`;
      } else if (imgs_fetch == "50d" || imgs_fetch == "50n") {
        icon_weather.src = `${iconRoot}50n.png`;
      }

      let kelvin_to_celcius = open_json.main.feels_like - 273.15;
      show_temperature.innerText = Math.ceil(kelvin_to_celcius) + "°C";

      show_weather_text.innerText = open_json.weather[0].description;

      humidity.innerText = open_json.main.humidity + "%";

      speed.innerText = open_json.wind.speed + " km/hr";

      degree.innerText = open_json.wind.deg + "°";

      longitude.innerText = open_json.coord.lon.toFixed(2);

      latitude.innerText = open_json.coord.lat.toFixed(2);

      speak(
        `Current Temperature of ${open_json.name} is:${Math.ceil(kelvin_to_celcius)} Degree Celsius`,
      );
    }
  }

  get_temp();
});
