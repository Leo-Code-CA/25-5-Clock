import { useRef } from "react";

export default function ExternalControls({ timerOn, setSession, session, setStart, start }) {
    
    const timerIntervalID = useRef(null);

    function handleStartStop() {

        setStart(s => !s);


            clearInterval(timerIntervalID.current);

            const sessionCurrentTime = session.currentTimer;
            const breakCurrentTime = session.currentBreak;
            const sessionInitialTime = session.initialTimer;
            const breakInitialTime = session.initialBreak;
  
            let ongoingTimer = sessionCurrentTime;
            let minutes = Number(ongoingTimer.slice(0, 2));
            let seconds = Number(ongoingTimer.slice(3, 5));

            console.log("outside")
            console.log(`Current Session time is ${sessionCurrentTime}`);
            console.log(`Current Break time is ${breakCurrentTime}`);
            console.log(`Initial Session time is ${sessionInitialTime}`);
            console.log(`Initial Break time is ${breakInitialTime}`);
            
            timerIntervalID.current = setInterval(() => {

                if (start) {
        
                        
                if (seconds === "00" && minutes === "00") {

                    console.log("ZERO")
                    console.log(ongoingTimer === sessionCurrentTime, ongoingTimer, sessionCurrentTime)
                            // ring bell
                            setSession({...session, currentBreak: breakInitialTime});
                            setSession({...session, currentTimer: sessionInitialTime});

                            if (ongoingTimer === sessionCurrentTime) {

                                ongoingTimer = breakInitialTime;
                                console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
                                setSession({...session, currentBreak: breakInitialTime});


                            } else {

                                ongoingTimer = sessionInitialTime;
                                console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
                                setSession({...session, currentTimer: sessionInitialTime});


                            }
                    
                    // ongoingTimer === sessionCurrentTime ? ongoingTimer = breakInitialTime : ongoingTimer = sessionInitialTime;

    
                    minutes = Number(ongoingTimer.slice(0, 2));
                    seconds = Number(ongoingTimer.slice(3, 5));
                    // console.log(minutes, seconds);
        
        
                } else if (seconds === "00") {
        
                    minutes--;
                    seconds = 59;
    
                } else {
        
           
                    seconds--;
        
                }
        
                minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                seconds.toString().length === 1 ? seconds = "0" + seconds : null;
  
        
                console.log(ongoingTimer === sessionCurrentTime);
        
                ongoingTimer === sessionCurrentTime ? 
                setSession({...session, currentTimer: `${minutes}:${seconds}`, ongoing: "Session"})
                : setSession({...session, currentBreak: `${minutes}:${seconds}`, ongoing: "Break"})

            }
                            
        
                }, 1000)

    }

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







function handleStartStop() {

    setStart(s => !s);


        clearInterval(timerIntervalID.current);

        const sessionCurrentTime = session.currentTimer;
        const breakCurrentTime = session.currentBreak;
        const sessionInitialTime = session.initialTimer;
        const breakInitialTime = session.initialBreak;

        let ongoingTimer = sessionCurrentTime;
        let minutes = Number(ongoingTimer.slice(0, 2));
        let seconds = Number(ongoingTimer.slice(3, 5));

        console.log("outside")
        console.log(`Current Session time is ${sessionCurrentTime}`);
        console.log(`Current Break time is ${breakCurrentTime}`);
        console.log(`Initial Session time is ${sessionInitialTime}`);
        console.log(`Initial Break time is ${breakInitialTime}`);
        
        timerIntervalID.current = setInterval(() => {

            if (start) {
    
                    
            if (seconds === "00" && minutes === "00") {

                console.log("ZERO")
                console.log(ongoingTimer === sessionCurrentTime, ongoingTimer, sessionCurrentTime)
                        // ring bell
                        setSession({...session, currentBreak: breakInitialTime});
                        setSession({...session, currentTimer: sessionInitialTime});

                        if (ongoingTimer === sessionCurrentTime) {

                            ongoingTimer = breakInitialTime;
                            console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
                            setSession({...session, currentBreak: breakInitialTime});


                        } else {

                            ongoingTimer = sessionInitialTime;
                            console.log(`reinitialized, ongoingtimer is ${ongoingTimer}`)
                            setSession({...session, currentTimer: sessionInitialTime});


                        }
                
                // ongoingTimer === sessionCurrentTime ? ongoingTimer = breakInitialTime : ongoingTimer = sessionInitialTime;


                minutes = Number(ongoingTimer.slice(0, 2));
                seconds = Number(ongoingTimer.slice(3, 5));
                // console.log(minutes, seconds);
    
    
            } else if (seconds === "00") {
    
                minutes--;
                seconds = 59;

            } else {
    
       
                seconds--;
    
            }
    
            minutes.toString().length === 1 ? minutes = "0" + minutes : null;
            seconds.toString().length === 1 ? seconds = "0" + seconds : null;

    
            console.log(ongoingTimer === sessionCurrentTime);
    
            ongoingTimer === sessionCurrentTime ? 
            setSession({...session, currentTimer: `${minutes}:${seconds}`, ongoing: "Session"})
            : setSession({...session, currentBreak: `${minutes}:${seconds}`, ongoing: "Break"})

        }
                        
    
            }, 1000)

}

