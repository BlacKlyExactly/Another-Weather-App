import * as React from 'react';
import styled from "styled-components";
import gsap from "gsap";
import Loader from "react-spinkit";

import MenuButton from "./MenuButton";
import { ReactComponent as Loupe } from "../assets/svgs/Loupe.svg";
import { blue, white } from '../assets/colors';
import { WeatherContext } from '../App';

const InfoPanel: React.FC = () => {
    const [ opened, setOpenedState ] = React.useState<boolean>(true);
    const [ city, setCity ] = React.useState<string>("");

    const { 
        fetchWeatherData, 
        weatherData,
        isLoading,
    } = React.useContext(WeatherContext);

    const panel = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(!panel.current) return;

        const x = opened ? "0%" : "100%";
        const options: GSAPTweenVars = { x, duration: 0.5, ease: "expo.inOut" };

        opened ?
            gsap.to(panel.current, options) :
            gsap.to(panel.current, options);
    }, [ opened ]);

    const toggleMenu = () => setOpenedState(prev => !prev);

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setCity(e.target.value);
    }

    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        city && fetchWeatherData(city);
    }

    if(!weatherData) return null;
    const { main, clouds, name, wind, sys } = weatherData;
    
    return(
        <>
            <Panel ref={panel}>
                <WeatherForm onSubmit={e => handleSubmit(e)}>
                    <CityInput 
                        value={city} 
                        onChange={e => handleInputChange(e)}
                        placeholder="Type your location"
                    />
                    <CitySubmit type="submit">
                        <Loupe />
                    </CitySubmit>
                </WeatherForm>
                <WeatherDetails>
                    {weatherData && !isLoading && (
                        <>
                            <WeatherDetailsTitle>
                                Weather Details
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                                    alt={weatherData.weather[0].icon}
                                />
                            </WeatherDetailsTitle>
                            <WeatherData name="Temperature" value={`${main.temp}°C`}/>
                            <WeatherData name="Cloudy" value={`${clouds.all}%`}/>
                            <WeatherData name="Humidity" value={`${main.humidity}`}/>
                            <WeatherData name="Wind Speed" value={`${wind.speed} m/s`}/>
                            <WeatherData name="Wind Deg" value={`${wind.deg} °`}/>
                            <WeatherData name="Pressure" value={`${main.pressure} hPa`}/>
                            <WeatherData name="City" value={`${name}`}/>
                            <WeatherData name="Country" value={`${sys.country}`}/>
                        </>
                    )}
                    {isLoading && <Loader name="pacman"/>}
                </WeatherDetails>
            </Panel>
            <MenuToggler onClick={toggleMenu}>
                <MenuButton/>
            </MenuToggler>
        </>
    )
}

const WeatherData: React.FC<WeatherDataProps> = ({ name, value }) => (
    <WeatherDetailsInfo>
        <WeatherDetailsInfoName>
            {name}
        </WeatherDetailsInfoName>
        <WeatherDetailsInfoName>
            {value}
        </WeatherDetailsInfoName>
    </WeatherDetailsInfo>
);

interface WeatherDataProps {
    name: string,
    value: string | number
}

const Panel = styled.div`
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(18px);
    z-index: 100;
    padding-left: 30px;

    @media screen and (min-width: 1150px){
        width: 43%;
        padding-left: 5vw;
    }
`;

const MenuToggler = styled.div`
  position: absolute;
  bottom: 5%;

  @media screen and (min-width: 1150px){
    top: 7%;
    left: 5%;
  }
`;

const WeatherForm = styled.form`
    width: 100%;
    height: 106px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media screen and (min-width: 1150px){
        height: 137px;
    }
`;

const CityInput = styled.input`
    background: transparent;
    border: none;
    width: 55%;
    height: 80px;
    border-bottom: 2px solid ${white};
    color: ${white};

    @media screen and (min-width: 1150px){
        width: 70%;
        font-size: 18px;
    }
`;

const CitySubmit = styled.button`
    width: 106px;
    height: 106px;
    background: ${blue};
    border: none;

    svg{
        width: 43px;
        height: 43px;
    }

    @media screen and (min-width: 1150px){
        height: 137px;
        width: 137px;
    }
`;

const WeatherDetails = styled.div`
    width: 75%;
    height: 162px;
    margin-top: 25%;
`;

const WeatherDetailsTitle = styled.div`
    position: relative;
    font-size: 25px;
    margin-bottom: 50px;
    width: 150%;

    img{
        position: absolute;
        top: -140%;
    }

    @media screen and (min-width: 1150px){
        font-size: 28px;
    }
`;

const WeatherDetailsInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 10px;

    @media screen and (min-width: 1150px){
        margin: 30px 10px
    }
`;

const WeatherDetailsInfoName = styled.p`
    font-size: 17px;

    @media screen and (min-width: 1150px){
        font-size: 19px;
    }
`;

export default InfoPanel;
