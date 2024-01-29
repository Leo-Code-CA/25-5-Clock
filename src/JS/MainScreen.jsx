import { useEffect, useRef } from "react";

export default function MainScreen({ clockOn, timerOn, time, setTime, start, timerBreak, timerSession }) {

    const clockIntervalID = useRef(null);

    useEffect(() => {

        if (clockOn) {

            clockIntervalID.current = setInterval(() => {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                setTime(`${hours}:${minutes}:${seconds}`);
                
            }, 1000);

        }
        
        return () => clearInterval(clockIntervalID.current);

    }, [clockOn]);


    return (
        <div className="clock__mainScreenContainer">
            <div className="clock__mainScreen">
                <div className="clock__secondaryDisplay" id="timer-label">
                    {timerOn ? (timerBreak.ongoing === true ? "Break" : "Session") : null}
                </div>
                <div className="clock__mainDisplay" id={timerOn ? "time-left" : undefined}>
                    {timerOn ? (timerBreak.ongoing === true ? timerBreak.current : timerSession.current) 
                    : clockOn ? time
                    : null}
                </div>
            </div>
        </div>
    )
}
