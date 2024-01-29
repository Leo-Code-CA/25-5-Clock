import { useRef } from "react";

export default function ExternalControls({ setStart, start, timerBreak, setTimerBreak, timerSession, setTimerSession }) {
    
    const timerIntervalID = useRef(null);

    function handleStartStop() {

            clearInterval(timerIntervalID.current);
            setStart(!start);

        if (start) {

            const sessionT = timerSession.initial;
            const breakT = timerBreak.initial;
            let inProgress;
            timerSession.ongoing ? inProgress = sessionT : inProgress = breakT;
            console.log(`the session is in progress: ${timerSession.ongoing}`)
            let minutes = inProgress === sessionT ? timerSession.current.slice(0, 2) : timerBreak.current.slice(0, 2);
            let seconds = inProgress === sessionT ? timerSession.current.slice(3, 5) : timerBreak.current.slice(3, 5);

            timerIntervalID.current = setInterval(() => {
                        
                if (seconds === "00" && minutes === "00") {

                    console.log(`Zero, inProgress is sessionT: ${inProgress === sessionT}`)

                    if (inProgress === sessionT) {
                        inProgress = breakT;
                        setTimerSession({...timerSession, current: "", ongoing: false});
                        setTimerBreak({...timerBreak, current: breakT, ongoing: true});
                    } else {
                        inProgress = sessionT;
                        setTimerSession({...timerSession, current: sessionT, ongoing: true});
                        setTimerBreak({...timerBreak, current: "", ongoing: false});
                    }

                    minutes = inProgress.slice(0, 2);
                    seconds = inProgress.slice(3, 5);

    
                } else if (seconds === "00") {
            
                    minutes--;
                    seconds = 59;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : null;
        
                    inProgress === sessionT ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`, ongoing: true})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`, ongoing: true});
        
                } else {
            
                    seconds--;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : null;
        
                    inProgress === sessionT ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`, ongoing: true})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`, ongoing: true});
            
                }
                
            
                }, 1000)

        }
            

    }

    console.log("session")
    console.log(timerSession)
    console.log("break")
    console.log(timerBreak)

    return (
        <div className="clock__externalControls">
            <Button trigger={handleStartStop}>
                START
            </Button>
            <Button>
                RESET
            </Button>
        </div>
    )
}

function Button({ children, trigger }) {

    return (
        <>
            <button
            onClick={trigger}
            id={children === "START" ? "start_stop" : "reset"}>
                {children}
            </button>
        </>
    )
}







// function handleStartStop() {

//     setStart(s => !s);


//         clearInterval(timerIntervalID.current);

//         const sessionCurrentTime = session.currentTimer;
//         const breakCurrentTime = session.currentBreak;
//         const sessionInitialTime = session.initialTimer;
//         const breakInitialTime = session.initialBreak;

//         let ongoingTimer = sessionCurrentTime;
//         let minutes = Number(ongoingTimer.slice(0, 2));
//         let seconds = Number(ongoingTimer.slice(3, 5));

//         console.log("outside")
//         console.log(`Current Session time is ${sessionCurrentTime}`);
//         console.log(`Current Break time is ${breakCurrentTime}`);
//         console.log(`Initial Session time is ${sessionInitialTime}`);
//         console.log(`Initial Break time is ${breakInitialTime}`);
        
//         timerIntervalID.current = setInterval(() => {

//             if (start) {
    
                    
//             if (seconds === "00" && minutes === "00") {

//                 console.log("ZERO")
//                 console.log(ongoingTimer === sessionCurrentTime, ongoingTimer, sessionCurrentTime)
//                         // ring bell
//                         setSession({...session, currentBreak: breakInitialTime});
//                         setSession({...session, currentTimer: sessionInitialTime});

//                         if (ongoingTimer === sessionCurrentTime) {

//                             ongoingTimer = breakInitialTime;
//                             console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
//                             setSession({...session, currentBreak: breakInitialTime});


//                         } else {

//                             ongoingTimer = sessionInitialTime;
//                             console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
//                             setSession({...session, currentTimer: sessionInitialTime});


//                         }
                
//                 // ongoingTimer === sessionCurrentTime ? ongoingTimer = breakInitialTime : ongoingTimer = sessionInitialTime;


//                 minutes = Number(ongoingTimer.slice(0, 2));
//                 seconds = Number(ongoingTimer.slice(3, 5));
//                 // console.log(minutes, seconds);
    
    
//             } else if (seconds === "00") {
    
//                 minutes--;
//                 seconds = 59;

//             } else {
    
       
//                 seconds--;
    
//             }
    
//             minutes.toString().length === 1 ? minutes = "0" + minutes : null;
//             seconds.toString().length === 1 ? seconds = "0" + seconds : null;

    
//             console.log(ongoingTimer === sessionCurrentTime);
    
//             ongoingTimer === sessionCurrentTime ? 
//             setSession({...session, currentTimer: `${minutes}:${seconds}`, ongoing: "Session"})
//             : setSession({...session, currentBreak: `${minutes}:${seconds}`, ongoing: "Break"})

//         }
                        
    
//             }, 1000)

// }

