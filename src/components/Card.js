import '../css/card.css';
import sunset from '../assets/sunset.gif';
import sunrise from '../assets/sunrise.gif';
import hot from '../assets/hot.gif';
import cold from '../assets/cold.gif';
import humidity from '../assets/humidity.png';
import pressure from '../assets/pressure.png';
import wind from '../assets/wind.gif';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

function Card() {
    const [defaultCity] = useState('Bhubaneswar');
    const [timeGap, setTimeGap] = useState(null);
    const [data, setData] = useState({
        city: "",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        sunrise: 0,
        sunset: 0,
        country: "",
        desc: "",
        icon: "",
        windSpeed: 0,
        pressure: 0
    });

    // Fetch weather data
    const getData = (city) => {
        if (!city) return; // Prevent API call for empty input

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e5f40b77255ee0147eb7c5e42185933b`)
            .then((response) => {
                setData({
                    desc: response.data.weather[0].main,
                    icon: response.data.weather[0].icon,
                    city: response.data.name,
                    temp: response.data.main.temp,
                    temp_max: response.data.main.temp_max,
                    temp_min: response.data.main.temp_min,
                    humidity: response.data.main.humidity,
                    pressure: response.data.main.pressure,
                    sunrise: response.data.sys.sunrise,
                    sunset: response.data.sys.sunset,
                    country: response.data.sys.country,
                    windSpeed: response.data.wind.speed
                });
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setData((prevState) => ({
                    ...prevState,
                    city: "City not found",
                    country: "",
                    temp: "--",
                    temp_max: "--",
                    temp_min: "--",
                    windSpeed: "--",
                    pressure: "--",
                    humidity: "--",
                    desc: "N/A",
                    icon: "N/A",
                    sunrise: 0,
                    sunset: 0
                }));
            });
    };

    // Fetch data for the default city when the component mounts
    useEffect(() => {
        getData(defaultCity);
    }, [defaultCity]);

    // Handle user input and debounce API calls
    const handleOnChange = (e) => {
        const city = e.target.value.trim();
        clearTimeout(timeGap);
        const timeout = setTimeout(() => {
            getData(city);
        }, 500);
        setTimeGap(timeout);
    };

    return (
        <div>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="container">
                <div className="card">
                    <div className="inputData">
                        <input
                            type="text"
                            className="inputField"
                            placeholder="Enter City Name"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="city">
                        <h3>
                            <i className="fa-sharp fa-solid fa-location-dot"></i> {data.city} {data.country}
                        </h3>
                    </div>
                    <div className="info">
                        <h2>{data.temp} °C</h2>
                    </div>
                    <div className="boxes">
                        <div className="box">
                            <h4>Max Temp</h4>
                            <div className="border">
                                <img src={hot} className="img" alt="max temperature" />
                            </div>
                            <h3>{data.temp_max} °C</h3>
                        </div>
                        <div className="box">
                            <h4>Min Temp</h4>
                            <div className="border">
                                <img src={cold} className="img" alt="min temperature" />
                            </div>
                            <h3>{data.temp_min} °C</h3>
                        </div>
                        <div className="box">
                            <h3>Wind Speed</h3>
                            <div className="border">
                                <img src={wind} className="img" alt="wind speed" />
                            </div>
                            <h3>{data.windSpeed} m/s</h3>
                        </div>
                        <div className="box">
                            <h3>Feels Like</h3>
                            <div className="border">
                                <img
                                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                                    className="icon-img"
                                    alt="weather icon"
                                />
                            </div>
                            <h3>{data.desc}</h3>
                        </div>
                        <div className="box rise">
                            <h3>Sunrise</h3>
                            <div className="border">
                                <img src={sunrise} className="img" alt="sunrise" />
                            </div>
                            <h3>{moment(data.sunrise * 1000).format("hh:mm a")}</h3>
                        </div>
                        <div className="box">
                            <h3>Sunset</h3>
                            <div className="border">
                                <img src={sunset} className="img" alt="sunset" />
                            </div>
                            <h3>{moment(data.sunset * 1000).format("hh:mm a")}</h3>
                        </div>
                        <div className="box">
                            <h3>Pressure</h3>
                            <div className="border">
                                <img src={pressure} className="img" alt="pressure" />
                            </div>
                            <h3>{data.pressure} hPa</h3>
                        </div>
                        <div className="box">
                            <h3>Humidity</h3>
                            <div className="border">
                                <img src={humidity} className="img" alt="humidity" />
                            </div>
                            <h3>{data.humidity} %</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
