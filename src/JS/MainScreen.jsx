import { useEffect, useRef } from "react";

export default function MainScreen({ clockOn, timerOn, time, setTime, timerBreak, timerSession }) {

    const clockIntervalID = useRef(null);

    useEffect(() => {

        if (clockOn) {

            clockIntervalID.current = setInterval(() => {

                const date = new Date();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

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
                       hours = hours;
                }
                
                hours.toString().length === 1 ? hours = "0" + hours : null;
                minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                seconds.toString().length === 1 ? seconds = "0" + seconds : null;

                setTime(`${hours}:${minutes}${seconds}`);
                
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
                : clockOn ? <div className="clock__time">{time.slice(0, 5)}<span>{time.slice(5)}</span></div>
                : null}
            </div>
        </div>
    )
};
