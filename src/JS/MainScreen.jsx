import { useEffect, useRef } from "react";

export default function MainScreen({ clockOn, timerOn, session, setSession, time, setTime }) {

    const clockIntervalID = useRef(null);
    const timerIntervalID = useRef(null);


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






    useEffect(() => {

        const sessionTime = session.currentTimer;
        const breakTime = session.currentBreak;
        let ongoingTimer = sessionTime;

        console.log('I m in the effect')

        if (timerOn) {

            console.log("timer is ON!")

            let minutes = Number(ongoingTimer.slice(0, 2));
            let seconds = Number(ongoingTimer.slice(3, 5));

            timerIntervalID.current = setInterval(() => {

                if (seconds === 0 && minutes === 0) {
                    // ring bell
                    ongoingTimer === sessionTime ? ongoingTimer = breakTime : ongoingTimer = sessionTime;

                    minutes = Number(ongoingTimer.slice(0, 2));
                    seconds = Number(ongoingTimer.slice(3, 5));

                } else if (seconds === 0) {

                    minutes--;
                    seconds = 59;

                } else {

                    seconds--;

                }

                
                ongoingTimer === sessionTime ? 
                setSession({...session, currentTimer: `${minutes}:${seconds}`, ongoing: "Session"})
                : setSession({...session, currentBreak: `${minutes}:${seconds}`, ongoing: "Break"})
                    

            }, 1000)

            return () => clearInterval(timerIntervalID);

        }


    }, [timerOn])

    console.log(session);


    return (
        <div className="clock__mainScreenContainer">
            <div className="clock__mainScreen">
                <div className="clock__secondaryDisplay" id="timer-label">
                    {timerOn && "Session"}
                </div>
                <div className="clock__mainDisplay" id={timerOn ? "time-left" : undefined}>
                    {clockOn ? time : timerOn ? (session.ongoing === "Session" ? session.currentTimer : session.currentBreak) : null}
                </div>
            </div>
        </div>
    )
}




