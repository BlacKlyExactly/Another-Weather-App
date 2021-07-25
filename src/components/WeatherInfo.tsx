import * as React from 'react';
import styled from "styled-components";
import Loader from "react-spinkit";
import gsap from "gsap";

import { WeatherContext } from '../App';

const WeatherInfo = () => {
    const { weatherData, isLoading, error } = React.useContext(WeatherContext);

    const info = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        !isLoading && gsap.from(info.current, { opacity: 0, y: 20, duration: 0.5, ease: "expo.inOut" });
    }, [ isLoading ])

    if(!weatherData) return null;
    const { main, name, weather } = weatherData;

    return (
        <Wrapper ref={info}>
            {isLoading && <Loader name="pacman"/>}
            {!isLoading && !error && (
                <>
                    <Temperature>{main.temp}°</Temperature>
                    <div>
                        <CityName>{name}</CityName>
                        <Description>{weather[0].description}</Description>
                    </div>
                    <Icon src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].icon}/>
                </>
            )}
            {error && <CityName>Error occurred :(</CityName>}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 200px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Temperature = styled.p`
    font-size: 70px;
    font-weight: 800;
    margin: 0 7px;

    @media screen and (min-width: 1150px){
        font-size: 100px;
    }
`;

const CityName = styled.div`
    font-size: 28px;

    @media screen and (min-width: 1150px){
        font-size: 40px;
    }
`;

const Description = styled.div`
    font-size: 15px;

    @media screen and (min-width: 1150px){
        font-size: 25px;
    }
`;

const Icon = styled.img`
    position: absolute;
    top: -2%;
    left: 80%;

    @media screen and (min-width: 1150px){
        top: -8%;
    }
`;

export default WeatherInfo;