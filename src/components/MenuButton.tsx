import * as React from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ReactComponent as MenuButtonSvg } from "../assets/svgs/Menu.svg";
import { red } from "../assets/colors";

const MenuButton: React.FC = () => {
    const [ tl ] = React.useState<GSAPTimeline>(gsap.timeline());

    const button = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        const lines = button.current?.querySelector("#Lines");
        const circle = button.current?.querySelector('#Circle');

        if(!lines || !circle) return;  

        const [ l1, l2, l3 ] = lines.children;

        tl.to(l3, { opacity: 0, duration: 0.2 }, 0)
            .to([ l1, l2, l3, circle ], { stroke: red, duration: 0.2 }, 0)
            .to(l1, { rotationZ: -45, y: 2, duration: 0.2, transformOrigin: "50% 50%" }, 0)
            .to(l2, { rotationZ: 45, y: 2, duration: 0.2, transformOrigin: "50% 50%" }, 0)
    }, [ tl ]);

    const toggle = () => tl.reversed(!tl.reversed());

    return(
        <Wrapper onClick={toggle}>
            <MenuButtonSvg ref={button}/>
        </Wrapper>
    )
}

const Wrapper = styled.button`
    position: relative;
    background: transparent;
    border: none;
    width: 68px;
    height: 68px;
    z-index: 101;
`;

export default MenuButton;