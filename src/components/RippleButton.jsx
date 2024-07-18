



import React, { useEffect, useState } from 'react';
import { useTheme } from './context/ThemeContext';


function RippleButton() {

    const { theme } = useTheme();
    const [rippleStyle, setRippleStyle] = useState({});
    const [isActive, setIsActive] = useState(false);

    const createRipple = (e) => {
        const rippleContainer = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rippleContainer.width, rippleContainer.height);
        const x = e.clientX - rippleContainer.left - size / 2;
        const y = e.clientY - rippleContainer.top - size / 2;

        setRippleStyle({
            top: y + "px",
            left: x + "px",
            width: size + "px",
            height: size + "px",
        });

        setIsActive(true);

        setTimeout(() => {
            setIsActive(false);
        }, 1000);
    };


    return (
        <>
            <div className="align-self-start ripple-container">
                <button className="btn border-0 ripple-button" onClick={createRipple}>
                    <i
                        className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-brightness-low-fill"
                            }`}
                    ></i>
                </button>
                {isActive && <span className="ripple " style={rippleStyle}></span>}
            </div>
        </>
    )
}

export default RippleButton;









