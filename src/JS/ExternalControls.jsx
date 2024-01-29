import { useRef } from "react";

export default function ExternalControls({ setStart, start, timerBreak, setTimerBreak, timerSession, setTimerSession, timerOn }) {
    
    const timerIntervalID = useRef(null);

    function handleReset() {

        clearInterval(timerIntervalID.current);
        setStart(false);
        setTimerSession({initial: "25:00", current: "25:00", ongoing: "true"});
        setTimerBreak({initial: "05:00", current: "05:00", ongoing: "false"});

    }

    function handleStartStop() {

            clearInterval(timerIntervalID.current);
            setStart(!start);

        if (start) {

            const sessionT = timerSession.initial;
            const breakT = timerBreak.initial;
            let inProgress;
            timerSession.ongoing ? inProgress = sessionT : inProgress = breakT;
            let minutes = inProgress === sessionT ? timerSession.current.slice(0, 2) : timerBreak.current.slice(0, 2);
            let seconds = inProgress === sessionT ? timerSession.current.slice(3, 5) : timerBreak.current.slice(3, 5);

            timerIntervalID.current = setInterval(() => {
                        
                if (seconds === "00" && minutes === "00") {


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


    return (
        <div className="clock__externalControls">
            <Button trigger={handleStartStop}>
                START
            </Button>
            <Button trigger={handleReset}>
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