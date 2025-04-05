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
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Condition: ${data.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
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
