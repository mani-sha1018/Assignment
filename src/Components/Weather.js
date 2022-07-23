import React, { useEffect, useState } from "react";
import './style.css'

const Weather = () => {

    const base_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const unit_url = '&units=metric&appid=';
    const Api_key = '25f9aabf9954df7d59fc83a4d8760b20';
    
    const icon = {
        "src": "http://openweathermap.org/img/wn/",
        "size": "@2x",
        "type": ".png"
      }

    const [city, setCity] = useState("");
    const [sunrise, setSunrise] = useState([]);
    const [sunset, setSunset] = useState([]);
    const [data, setData] = useState("");
    const [data1, setData1] = useState("");
    const [weather, setWeather] = useState([]);
    const [search, setSearch] = useState("");

//api calling

    useEffect(() => {
        const fetchApi = async () => {
            const url = `${base_url}${search}${unit_url}${Api_key}`
            const response = await fetch(url);
            const resJson = await response.json();
            // console.log(resJson);

            setCity(resJson.main);
            setData(resJson.coord);
            setData1(resJson.sys);
            setWeather(resJson.weather[0])

            const part = data1.sunrise;
            const date = new Date(part * 1000);
            setSunrise(date.toLocaleTimeString());

            const part1 = data1.sunset;
            const date1 = new Date(part1 * 1000);
            setSunset(date1.toLocaleTimeString());
        }

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    return (
        <>
            <div className="background">
                <div className="box">
                    <div className="inputData">
                        <input
                            type="search"
                            placeholder="Search for city"
                            value={search}
                            className="inputField" onChange={(event) => { setSearch(event.target.value) }} />
                    </div>
                    {!city ? (
                        <p className="errorMsg"> No Data Found </p>
                    ) : (
                        <div>
                            <div className="info">
                                <h2 className="location">
                                    <i> {search} </i>
                                </h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3 className="day">Today</h3>
                                    </div>
                                    <div className="col-md-6">
                                        <img src={`${icon.src}${weather.icon}${icon.size}${icon.type}`} alt='icon' />
                                    </div>
                                </div>
                                <h1 className="temp">{city.temp}°C</h1>
                                <h3 className="tempmin_max"> Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel</h3>
                                <h3 className="tempmin_max"> Humidity : {city.humidity}% </h3>
                                <h3 className="tempmin_max"> Latitude : {data.lat}°  | Longitude : {data.lon}°</h3>
                                <h3 className="tempmin_max"> Sunrise: {sunrise} | Sunset: {sunset} </h3>
                            </div>
                            <div className="wave -one"></div>
                            <div className="wave -two"></div>
                            <div className="wave -three"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Weather