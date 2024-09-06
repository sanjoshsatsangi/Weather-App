import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search1.png'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                description: data.weather[0].description
            });

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search(inputRef.current.value);
        }
    };


    useEffect(() => {
        search("Delhi")
    }, []);

    return (
        <div className='weather'>
            <div className='weather-widget'>
                <div className="search-bar">
                    <input ref={inputRef} type="text" placeholder='Search City' onKeyDown={handleKeyPress} />
                    <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
                </div>
                {weatherData &&
                    <>
                        <p className='location'>Weather in {weatherData.location}</p>
                        <p className='temperature'>{weatherData.temperature}°C</p>
                        <div className='weather-description'>
                            <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                            {weatherData.description}
                        </div>
                        <div className='weather-data'>
                            <p>Humidity: {weatherData.humidity}%</p>
                            <p>Wind speed: {weatherData.windSpeed} km/h</p>
                        </div>
                    </>
                }
            </div>
        </div>
        
    )
}

export default Weather;
