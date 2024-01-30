import { useRef } from 'react';
import Playlist from '../assets/playlist.mp3';
import Radio from '../assets/radio.mp3';

export default function Stations() {

    const cursorRef = useRef(null);
    const sliderRef = useRef(null);
    const indicatorRef = useRef(null);
    const playlistRef = useRef(null);
    const radioRef = useRef(null);
    const cursorPosition = useRef(null);
    const sliderRightEdge = useRef(null);

    function handleSlide(e) {

        e.preventDefault();

        let shiftX = e.clientX - cursorRef.current.getBoundingClientRect().left;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        
        function handleMouseMove(e) {

            playlistRef.current.pause();
            radioRef.current.play();

            cursorPosition.current = e.clientX - shiftX - sliderRef.current.getBoundingClientRect().left;
            sliderRightEdge.current = sliderRef.current.clientWidth - cursorRef.current.clientWidth;
            const playlistDuration = playlistRef.current.duration;

            cursorPosition.current < 0 ? cursorPosition.current = 0 : null;
            cursorPosition.current > sliderRightEdge.current ? cursorPosition.current = sliderRightEdge.current : null;

            cursorRef.current.style.left = cursorPosition.current + "px";
            indicatorRef.current.style.left = cursorPosition.current + 2 + "px";

            const currentCursorPosition = cursorPosition.current / sliderRightEdge.current * 100;
            const currentPlaylistTime = currentCursorPosition / 100 * playlistDuration;

            playlistRef.current.currentTime = currentPlaylistTime;

        }

        function handleMouseUp() {

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            radioRef.current.pause();

            cursorPosition.current === 0 || cursorPosition.current === sliderRightEdge.current ? playlistRef.current.pause() : playlistRef.current.play();
    
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