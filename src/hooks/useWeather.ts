import { useState, useEffect } from "react";
import { WeatherApiResponse, Unit } from "../utils/openweathermap";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const API = "https://api.openweathermap.org/data/2.5/weather";
const KEY = process.env.REACT_APP_WEATHER_API_KEY;

const useWeather = ( startLocation?: string, startUnit?: Unit ) => {
    const [ weather, setWeather ] = useState<WeatherApiResponse>();
    const [ error, setError ] = useState<Error | null>(null);
    const [ isLoading, setLoadingState ] = useState<boolean>(false);

    useEffect(() => {
        fetchWeatherData(startLocation || "Polska", startUnit || Unit.metric);
    }, [ startLocation, startUnit ])

    const fetchWeatherData = async ( locaion?: string, unit?: Unit ) => {
        try {
            setLoadingState(true);
            setError(null);

            const response: AxiosResponse<WeatherApiResponse>
                = await axios.get(`${API}?q=${locaion}&units=${unit || Unit.metric}&appid=${KEY}`);

            setLoadingState(false);
            setWeather(response.data);
        } catch (e) {
            setError(e);
            setLoadingState(false);
            toast.error("Error occurred, check if name of city that you provided is valid and try again later.")
        }
    }

    return { 
        fetchWeatherData, 
        weather, 
        error,
        isLoading
    };
}

export default useWeather;