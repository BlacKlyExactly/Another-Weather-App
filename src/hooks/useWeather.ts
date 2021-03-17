import { useState, useEffect } from "react";
import { WeatherApiResponse, Unit } from "../utils/openweathermap";
import axios, { AxiosResponse } from "axios";

const API = "https://api.openweathermap.org/data/2.5/weather";
const KEY = process.env.REACT_APP_WEATHER_API_KEY;

const useWeather = ( startLocation?: string, startUnit?: Unit ) => {
    const [ weather, setWeather ] = useState<WeatherApiResponse>();
    const [ error, setError ] = useState<Error>();

    useEffect(() => {
        fetchWeatherData(startLocation || "Polska", startUnit || Unit.metric);
    }, [ startLocation, startUnit])

    const fetchWeatherData = async ( locaion?: string, unit?: Unit ) => {
        try {
            const response: AxiosResponse<WeatherApiResponse>
                = await axios.get(`${API}?q=${locaion}&units=${unit || Unit.metric}&appid=${KEY}`);
            setWeather(response.data);
        } catch (e) {
            setError(e);
        }
    }

    return { fetchWeatherData, weather, error };
}

export default useWeather;