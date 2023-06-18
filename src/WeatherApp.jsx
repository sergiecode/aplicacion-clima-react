import { useState, useEffect } from 'react';
import './styles/weatherStyles.css'

export const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');

    let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    let api_key = '605507acf87117e111e54a3ab5238541'
    let difKelvin = 273.15

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${api_key}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
                <button type="submit">Buscar</button>
            </form>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperatura: {parseInt(weatherData.main?.temp - difKelvin)}°C</p>
                    <p>Condición: {weatherData.weather[0]?.description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
                </div>
            )}
        </div>
    );

};