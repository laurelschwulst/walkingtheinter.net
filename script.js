// if (btn) { // Detect clicks on the button
//   btn.onclick = function () {
//     // The 'dipped' class in style.css changes the appearance on click
//     btn.classList.toggle("dipped");
//   };
// }



// weather conditions as described on https://openweathermap.org/weather-conditions for more information
let weatherConditions = {
  'Thunderstorm': 'This is not so great - you might want to reschedule your tour',
  'Drizzle': 'Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!',
  'Rain': 'Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!',
  'Snow': 'Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!',
  'Atmosphere': 'Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!',
  'Clear': 'The weather looks great. Enjoy!',
  'Clouds': 'Please check outside before beginning and consider rescheduling if it looks too bad outside. Enjoy!',
}


// Fetches current weather conditions and populates the welcome message with appropriate instructions
async function getWeather(lat,long, span) {
  const tourAdvisorySpan = document.querySelector(span); 
  let apiKey = 'ccbe08283ae16503f369c6e8ea774996';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`;

  await fetch(url)
    .then(response => response.json())
    .then(function(data) {
      let fetchedCondition = data.weather[0].main
      let fetchedDescription = data.weather[0].description

      // Return weather according to message
      tourAdvisorySpan.textContent = 'Current weather reports indicate ' + fetchedDescription + '. ' + weatherConditions[fetchedCondition];

    }).catch(err => tourAdvisorySpan.textContent = "We're not too sure about the current weather conditions. Please check the outside before departing. Enjoy!");
}

// Get the welcome message based on time of day.
function getWelcomeMessage() {
  const welcomeMessageSpan = document.querySelector("#welcomeMessage"); 
  var today = new Date()
  var curHr = today.getHours()

  if (curHr < 12) {
    welcomeMessageSpan.textContent = 'Good morning';
  } else if (curHr < 18) {
    welcomeMessageSpan.textContent = 'Good afternoon';
  } else {
    welcomeMessageSpan.textContent = 'Good evening';
  }
  
}

// Change the page style based on time of day.-currently not in use
function changeStyleByTime() {
  var currentTime = new Date().getHours();
  const fullBody = document.querySelector("body");

    if (7 >= currentTime || currentTime > 19) {
      fullBody.classList.add("night");
    } 
}



$(document).ready(function(){
  // Call functions to populate welcome msg, weather, and style based on time
    getWelcomeMessage();
    getWeather('40.3487','-74.659', "#tourAdvisory"); // Get Princeton Weather
    //getWeather('40.3487','-74.659', "#tourAdvisory"); // Get NY Weather
    changeStyleByTime();
  
  
  // Initially set images to Black/White
  $(".photo").addClass("filter");
  
  
  // Change img from Black/White to color: https://codepen.io/rvsanches/pen/djydEj
  $(".toggleColor").click(function(){
    if ( $(".toggleColor").text() == "Black and white" ) {
      $(".toggleColor").text("Colorful");
    } else {
      $(".toggleColor").text("Black and white");
    }
    $(".photo").toggleClass("filter");
  });
  
});




