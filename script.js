// weather conditions as described on https://openweathermap.org/weather-conditions for more information
let weatherConditions = {
  Thunderstorm: "This is not so great - you might want to reschedule your tour",
  Drizzle:
    "Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!",
  Rain: "Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!",
  Snow: "Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!",
  Atmosphere:
    "Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!",
  Clear: "The weather looks great. Enjoy!",
  Clouds:
    "Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!",
};

princeton-weather = document.getElementbyId("princeton-weather")

// Fetches current weather conditions and populates the welcome message with appropriate instructions
async function getWeather(lat, long, locationSpan) {
  const tourAdvisorySpan = document.querySelector(locationSpan);

  // only fetch location if the span is found
  if (tourAdvisorySpan) {
    let apiKey = "ccbe08283ae16503f369c6e8ea774996";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`;

    await fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        let fetchedCondition = data.weather[0].main;
        let fetchedDescription = data.weather[0].description;
      
      if fetchedCondition == "Thunderstorm":
        princeton-weather.

        // Return weather according to message
        tourAdvisorySpan.textContent =
          "Current weather reports indicate " +
          fetchedDescription +
          ". " +
          weatherConditions[fetchedCondition];
      })
      .catch(
        (err) =>
          (tourAdvisorySpan.textContent =
            "We're not too sure about the current weather conditions. Please check the weather before departing. Enjoy!")
      );
  }
}

// Get the welcome message based on time of day.
function getWelcomeMessage() {
  const welcomeMessageSpan = document.querySelector("#welcomeMessage");

  if (welcomeMessageSpan) {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      welcomeMessageSpan.textContent = "Good morning";
    } else if (curHr < 18) {
      welcomeMessageSpan.textContent = "Good afternoon";
    } else {
      welcomeMessageSpan.textContent = "Good evening";
    }
  }
}

// Change the page style based on time of day. -add styles to css to use this
function changeStyleByTime() {
  var currentTime = new Date().getHours();
  const fullBody = document.querySelector("body");

  if (7 >= currentTime || currentTime > 19) {
    fullBody.classList.add("night");
  }
}

$(document).ready(function () {
  getWelcomeMessage(); // Get Welcome Msg on main page
  getWeather("40.3487", "-74.659", "#tourAdvisoryPrinceton"); // Get Princeton Weather
  getWeather("40.7143", "-74.006", "#tourAdvisoryNY"); // Get NY Weather
  changeStyleByTime();

  // Initially set images to Black/White
  $(".photo").addClass("filter");

  // Change img from Black/White to color: https://codepen.io/rvsanches/pen/djydEj
  $(".toggleColor").click(function () {
    if ($(".toggleColor").text() == "Black and white") {
      $(".toggleColor").text("Colorful");
    } else {
      $(".toggleColor").text("Black and white");
    }
    $(".photo").toggleClass("filter");
  });
});
