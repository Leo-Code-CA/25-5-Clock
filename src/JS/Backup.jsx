import { useState, useRef } from 'react';
import Playlist from '../assets/playlist.mp3';
import Radio from '../assets/radio.mp3';

export default function Stations() {

    // const [changeStation, setChangeStation] = useState(true);
    const cursorRef = useRef(null);
    const sliderRef = useRef(null);
    const indicatorRef = useRef(null);
    const playlistRef = useRef(null);
    const radioRef = useRef(null);


    function handleSlide(e) {

        e.preventDefault();

        let shiftX = e.clientX - cursorRef.current.getBoundingClientRect().left;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        
        function handleMouseMove(e) {

            playlistRef.current.pause();
            radioRef.current.play();


            let newLeft = e.clientX - shiftX - sliderRef.current.getBoundingClientRect().left;
            let rightEdge = sliderRef.current.clientWidth - cursorRef.current.clientWidth;
            const playlistDuration = playlistRef.current.duration;

            newLeft < 0 ? newLeft = 0 : null;
            newLeft > rightEdge ? newLeft = rightEdge : null;

            cursorRef.current.style.left = newLeft + "px";
            indicatorRef.current.style.left = newLeft + 2 + "px";

            const currentCursorPosition = newLeft / rightEdge * 100;
            const currentPlaylistTime = currentCursorPosition / 100 * playlistDuration;

            playlistRef.current.currentTime = currentPlaylistTime;


            newLeft === 0 || newLeft === rightEdge ? playlistRef.current.pause() : null;


        }

        function handleMouseUp() {

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            radioRef.current.pause();
            playlistRef.current.play();
            // fix the fact that it does not stop at the beginning
    
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
                ref={cursorRef}></div>
            </div>
            <audio src={Playlist} ref={playlistRef}></audio>
            <audio src={Radio} ref={radioRef}></audio>
        </div>
    )
}