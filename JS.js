// Slider

// Function to create a slide with image and caption
function createSlide(imageSrc, altText, captionText) {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = altText;

  const caption = document.createElement("div");
  caption.classList.add("slide-caption");
  caption.textContent = captionText;

  slide.appendChild(image);
  slide.appendChild(caption);

  return slide;
}

// Define anime data
const animeData = [
  {
    imageSrc: "images/1.jpg",
    altText: "Naruto Shippuden",
  },
  { imageSrc: "images/2.jpg", altText: "One Piece" },
  {
    imageSrc: "images/3.jpg",
    altText: "Attack on Titan",
  },
  { imageSrc: "images/4.jpg", altText: "Code Geass" },
  {
    imageSrc: "images/5.jpg",
    altText: "Naruto Shippuden",
  },
  { imageSrc: "images/6.jpg", altText: "One Piece" },
  {
    imageSrc: "images/7.jpg",
    altText: "Attack on Titan",
  },
  { imageSrc: "images/8.jpg", altText: "Code Geass" },
  {
    imageSrc: "images/9.jpg",
    altText: "Naruto Shippuden",
  },
  { imageSrc: "images/10.jpg", altText: "One Piece" },
  {
    imageSrc: "images/11.jpg",
    altText: "Attack on Titan",
  },
  { imageSrc: "images/12.jpg", altText: "Code Geass" },
  {
    imageSrc: "images/13.jpg",
    altText: "Naruto Shippuden",
  },
  { imageSrc: "images/14.jpg", altText: "One Piece" },
];

// Get the slider container
const sliderContainer = document.getElementById("animeSlider");

// Dynamically generate slides based on anime data
animeData.forEach((anime) => {
  const slide = createSlide(anime.imageSrc, anime.altText);
  sliderContainer.appendChild(slide);
});

// Function to initialize the slider
function initializeSlider() {
  const slider = document.querySelector(".slider");
  let counter = 0;

  setInterval(() => {
    counter += 1;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${-counter * 100}%)`;
  
    // Reset to the beginning when reaching the end
    if (counter === animeData.length - 11) {
      counter = 0;
      slider.style.transition = "none";
      slider.style.transform = "translateX(0)";
    }
  }, 3000);
}

// Call the function to initialize the slider when the page loads
document.addEventListener("DOMContentLoaded", initializeSlider);


// dropdown

const dropdown = document.getElementById("genreDropdown");

dropdown.addEventListener("change", () => {
  const selectedGenre = dropdown.value;

  // Redirect to the selected genre page
  if (selectedGenre) {
    window.location.href = `${selectedGenre}.html`;
  }
});


// 5-Star Rating
$(document).ready(function () {
  $("#submit-rating").click(function () {
    var rating = $('input[name="rating"]:checked').val();
    if (rating) {
      // Send the rating to your server or a third-party review service
      console.log("Rating submitted: " + rating);
    } else {
      alert("Please select a rating before submitting.");
    }
  });
});


// Weather API

// Replace 'YOUR_ACCUWEATHER_API_KEY' with your actual AccuWeather API key
const apiKey = 'M9KuwqcVchTXGC2KQ0sMcXBqMNtVmi63';

// Function to get weather information
function getWeather(city) {
  const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search`;
    
  // Perform a location search to get the AccuWeather location key for the given city
  $.ajax({
    url: locationUrl,
    method: 'GET',
    data: {
      apikey: apiKey,
      q: city,
    },
    success: function (locationData) {
      const locationKey = locationData[0]?.Key;

      if (locationKey) {
        const currentConditionsUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`;

        // Fetch current weather conditions using the location key
        $.ajax({
          url: currentConditionsUrl,
          method: 'GET',
          data: {
            apikey: apiKey,
          },
          success: function (weatherData) {
            // Extract relevant data from the API response
            const headline = weatherData.Headline.Text;
            const temperatureMin = weatherData.DailyForecasts[0]?.Temperature.Minimum.Value;
            const temperatureMax = weatherData.DailyForecasts[0]?.Temperature.Maximum.Value;
            const weatherTextDay = weatherData.DailyForecasts[0]?.Day.IconPhrase;
            const weatherTextNight = weatherData.DailyForecasts[0]?.Night.IconPhrase;

            // Convert temperatures to Celsius
            const temperatureMinCelsius = Math.round(((temperatureMin - 32) * 5) / 9);
            const temperatureMaxCelsius = Math.round(((temperatureMax - 32) * 5) / 9);

            // Update the weather information on the webpage
            const weatherInfo = `
              <p><strong>City:</strong> ${city}</p>
              <p><strong>Headline:</strong> ${headline}</p>
              <p><strong>Minimum Temperature:</strong> ${temperatureMinCelsius}°C</p>
              <p><strong>Maximum Temperature:</strong> ${temperatureMaxCelsius}°C</p>
              <p><strong>Day Weather:</strong> ${weatherTextDay}</p>
              <p><strong>Night Weather:</strong> ${weatherTextNight}</p>
            `;

            $('#weatherInfo').html(weatherInfo);
          },
          error: function (error) {
            console.error('Error fetching weather data:', error);
            $('#weatherInfo').html('<p>Unable to fetch weather data</p>');
          },
        });
      } else {
        console.error('Location key not found.');
        $('#weatherInfo').html('<p>Unable to fetch weather data</p>');
      }
    },
    error: function (error) {
      console.error('Error fetching location data:', error);
      $('#weatherInfo').html('<p>Unable to fetch weather data</p>');
    },
  });
}

// Fetch weather information for a default city (you can change this)
getWeather('istanbul');