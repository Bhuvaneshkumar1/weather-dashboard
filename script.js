document.getElementById('searchButton').addEventListener('click', function() {
    document.getElementById('weatherResult').innerHTML = '<p>Loading...</p>'; // Loading indicator

    const city = document.getElementById('cityInput').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
    document.getElementById('cityInput').value = ''; // Clear input field

    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`; // New RapidAPI endpoint


    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
            'X-RapidAPI-Key': '224fa37515mshae19ab80cf57ed2p10374fjsn64675fb35144' // Replace with your RapidAPI key
        }
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weatherResult').innerHTML = ''; // Clear previous results

            const weatherResult = `
                <div class="weather-card">
                    <h2>${data.name} <span class="country">${data.sys.country}</span></h2>
                    <div class="current-weather">
                        <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                        <div class="temp-main">${Math.round(data.main.temp)}°C</div>
                        <div class="condition">${data.weather[0].description}</div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <i class="fas fa-temperature-low"></i>
                            <div>Feels Like: ${Math.round(data.main.feels_like)}°C</div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-tint"></i>
                            <div>Humidity: ${data.main.humidity}%</div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-wind"></i>
                            <div>Wind: ${data.wind.speed} m/s</div>
                        </div>
                        <div class="weather-detail">
                            <i class="fas fa-compress-alt"></i>
                            <div>Pressure: ${data.main.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('weatherResult').innerHTML = weatherResult; // Display weather data

        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${error.message}</p>`; // Styled error message
        });
});

// Allow search by pressing Enter key
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});
