import * as React from 'react';
import styled from 'styled-components';
import Loader from "react-spinkit";
import gsap from "gsap";
import { blue } from '../assets/colors';

const PageLoader: React.FC = () => {
    const [ isLoaded, setLoadedState ] = React.useState<boolean>(false);

    const tl = React.useRef<GSAPTimeline>(gsap.timeline());
    const pageLoader = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const load = () => setLoadedState(true);
        window.addEventListener("load", load);

        if(isLoaded){
            tl.current.to(pageLoader.current, { opacity: 0, delay: 0.5, duration: 0.5, ease: "power4.in" })
                      .set(pageLoader.current, { zIndex: -1 });
        }

        return () => {
            window.removeEventListener("load", load);
        }
    }, [ isLoaded ])

    return (
        <Wrapper ref={pageLoader}>
            <Loader name="pacman" fadeIn="none" color="blue"/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    z-index: 100000000;

    .sk-spinner{
        div{
            &:first-child{
                color: ${blue};
            }

            &:nth-child(2){
                color: ${blue};
            }

            &:nth-child(3){
                background: ${blue};
            }

            &:nth-child(4){
                background: ${blue};
            }
            &:nth-child(5){
                background: ${blue};
            }
        }
    }
`;

export default PageLoader;
