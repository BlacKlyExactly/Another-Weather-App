import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import { white } from "./assets/colors";
import WeatherInfo from "./components/WeatherInfo";
import InfoPanel from "./components/InfoPanel";
import PageLoader from "./components/PageLoader";
import { Unit, WeatherApiResponse } from "./utils/openweathermap";
import useWeather from "./hooks/useWeather";
import backgroundDesktop from "./assets/imgs/background1.png";

interface WeatherContextProps {
  weatherData: WeatherApiResponse | undefined,
  fetchWeatherData: ( location: string, unit?: Unit ) => void,
  error: Error | null,
  isLoading: boolean,
}

export const WeatherContext = React.createContext<WeatherContextProps>({
  weatherData: undefined,
  fetchWeatherData: () => {},
  error: null,
  isLoading: false,
})

const App: React.FC = () => {
  const { 
    weather, 
    fetchWeatherData, 
    error,
    isLoading
  } = useWeather();

  return(
    <Wrapper>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet"
        />
      </Helmet>
      <PageLoader/>
      <Global/>
      <WeatherContext.Provider value={{
        weatherData: weather,
        fetchWeatherData,
        error,
        isLoading
      }}>
        <ToastContainer/>
        <InfoPanel/>
        <Weather>
          <WeatherInfo/>
        </Weather>
      </WeatherContext.Provider>
    </Wrapper>
  )
};

const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    color: ${white};
  }

  html, body{
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
  }

  p{
    margin: 0;
    padding: 0;
  }

  body{
    background: url(${backgroundDesktop});
    background-size: cover;
    background-position: center;
  }

  button{
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
`;
 
const Weather = styled.div`
  @media screen and (min-width: 1150px){
    position: absolute;
    bottom: 7%;
    left: 5%;
  }
`;

export default App;