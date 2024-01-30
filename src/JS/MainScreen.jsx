import { useEffect, useRef } from "react";

export default function MainScreen({ clockOn, timerOn, time, setTime, start, timerBreak, timerSession }) {

    const clockIntervalID = useRef(null);

    useEffect(() => {

        if (clockOn) {

            clockIntervalID.current = setInterval(() => {
                const date = new Date();
                let hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                switch (hours) {
                    case 13:
                        hours = "01";
        break;                        
                    case 14:
                        hours = "02";
                        break;
                    case 15:
                        hours = "03"
                        break;
                    case 16:
                        hours = "04";
                        break;
                    case 17:
                        hours = "05";
                        break;
                    case 18:
                        hours = "06";
                        break;
                    case 19:
                        hours = "07";
                        break;
                    case 20:
                        hours = "08";
                        break;
                    case 21:
                        hours = "09";
                        break;
                    case 22:
                        hours = "10";
                        break;
                    case 23:
                        hours = "11";
                        break;
                    case 24:
                        hours = "00";
                        break;
                    default:
                        throw new Error("time not reconized");
                }       

                setTime(`${hours}:${minutes}:${seconds}`);
                
            }, 1000);

        }
        
        return () => clearInterval(clockIntervalID.current);

    }, [clockOn]);


    return (
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
    )
}
