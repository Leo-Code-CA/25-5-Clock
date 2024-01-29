import { useEffect, useRef } from "react";

export default function MainScreen({ clockOn, timerOn, session, setSession, time, setTime, start, timerBreak, timerSession }) {

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







    // useEffect(() => {

    //     const sessionTime = session.currentTimer;
    //     const breakTime = session.currentBreak;
        
    //     // let minutes = Number(ongoingTimer.slice(0, 2));
    //     // let seconds = Number(ongoingTimer.slice(3, 5));

    //     if (start) {

    //         timerIntervalID.current = setInterval(() => {

              
    //             let ongoingTimer = sessionTime;
    //             console.log(ongoingTimer)
    //             let minutes = Number(ongoingTimer.slice(0, 2));
    //             let seconds = Number(ongoingTimer.slice(3, 5));

                
    //             if (seconds === 0 && minutes === 0) {
    //                 // ring bell
                    
                  
    //                 ongoingTimer === sessionTime ? ongoingTimer = breakTime : ongoingTimer = sessionTime;


    //                 console.log(minutes, seconds)
                    
    //                 // minutes = Number(ongoingTimer.slice(0, 2));
    //                 // seconds = Number(ongoingTimer.slice(3, 5));
                    
    //                 // return;


    //             } else if (seconds === 0) {

    //                 minutes--;
    //                 seconds = 59;

    //             } else {

   
    //                 seconds--;

    //             }

    //             minutes.toString().length === 1 ? minutes = "0" + minutes : null;
    //             seconds.toString().length === 1 ? seconds = "0" + seconds : null;
    //             console.log(minutes, seconds)


    //             ongoingTimer === sessionTime ? 
    //             setSession({...session, currentTimer: `${minutes}:${seconds}`, ongoing: "Session"})
    //             : setSession({...session, currentBreak: `${minutes}:${seconds}`, ongoing: "Break"})
                    

    //         }, 1000)

    //     }

    //     // console.log(ongoingTimer.slice(0, 2))
    //     // console.log(ongoingTimer.slice(3, 5))

    //     return () => {
    //         clearInterval(timerIntervalID.current);
    //     };


    // }, [session, start])




    return (
        <div className="clock__mainScreenContainer">
            <div className="clock__mainScreen">
                <div className="clock__secondaryDisplay" id="timer-label">
                    {/* {timerOn && session.ongoing} */}
                </div>
                <div className="clock__mainDisplay" id={timerOn ? "time-left" : undefined}>
                    {/* {clockOn ? time : timerOn ? (session.ongoing === "Break" ? session.currentBreak : session.currentTimer) : null} */}
                    {timerBreak.ongoing === true ? timerBreak.current : timerSession.current}
                </div>
            </div>
        </div>
    )
}







// timerIntervalID.current = setInterval(() => {

                
//     if (seconds === 0 && minutes === 0) {
//         // ring bell
      
//         ongoingTimer === sessionTime ? ongoingTimer = breakTime : ongoingTimer = sessionTime;
//         minutes = Number(ongoingTimer.slice(0, 2));
//         seconds = Number(ongoingTimer.slice(3, 5));

//     } else if (seconds === 0) {

//         minutes--;
//         seconds = 59;

//     } else {


//         seconds--;

//     }