import { useState, useRef } from 'react';

export default function Stations() {

    const [currentStation, setCurrentStation] = useState(0);
    const cursorRef = useRef(null);
    const sliderRef = useRef(null);
    const indicatorRef = useRef(null);

    async function handleFetch() {


    }

    function handleSlide(e) {

        e.preventDefault();

        let shiftX = e.clientX - cursorRef.current.getBoundingClientRect().left;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        

        function handleMouseMove(e) {

            let newLeft = e.clientX - shiftX - sliderRef.current.getBoundingClientRect().left;
            let rightEdge = sliderRef.current.offsetWidth - cursorRef.current.offsetWidth;

            newLeft < 0 ? newLeft = 0 : null;
            newLeft > rightEdge ? newLeft = rightEdge : null;

            cursorRef.current.style.left = newLeft + "px";
            indicatorRef.current.style.left = newLeft + "px";

            console.log(newLeft)

        }

        function handleMouseUp() {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

    }

    return (
        <div className="clock__stationsContainer">
            <div className="clock__stationsOverview">
                <div className="clock__stationOverviewIndicator" ref={indicatorRef}></div>
            </div>
            <div className="clock__stationsCursorContainer" ref={sliderRef}>
                <div 
                className="clock__stationsCursor"
                onMouseDown={(e) => handleSlide(e)}
                onClick={handleFetch}
                ref={cursorRef}></div>
            </div>
        </div>
    )
}