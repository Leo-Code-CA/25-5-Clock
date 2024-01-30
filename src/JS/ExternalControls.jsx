import { useRef } from "react";
import Click from '../assets/button_click.mp3';
import Beep from '../assets/alarm.mp3';

export default function ExternalControls({ setStart, start, timerBreak, setTimerBreak, timerSession, setTimerSession, timerOn }) {

    const timerIntervalID = useRef(null);
    const clickRef = useRef(null);
    const beepRef = useRef(null);
    const resetRef = useRef(null);
    const playRef = useRef(null);
    const animation = useRef(null);

    // console.log(start)

    function handleAnimation(elem, type) {
    
        const keyFrame = new KeyframeEffect(elem, [
            {transform: "translateY(0)"},
            {transform: "translateY(75%)"}
            ],
            {
                duration: 500,
                iteration: 1,
                fill: type === "backwardsOnly" ? "backwards" : "forwards"
            }
        )

        animation.current = new Animation(keyFrame);

        if (type === "forwardsOnly") {

            animation.current.play();
            setTimeout(() => {clickRef.current.play()}, 500);

        } else if (type === "backwardsOnly") {

            clickRef.current.play();
            animation.current.reverse();

        } else {

            animation.current.play();
            setTimeout(() => {
                clickRef.current.play();
                animation.current.reverse();
            }, 500)

        }

        

    }
    

    function handleReset() {

        handleAnimation(resetRef.current)

        !start ? setTimeout(() => {handleAnimation(playRef.current, "backwardsOnly")}, 1000) : null;

        clearInterval(timerIntervalID.current);
        setStart(true);
        setTimerSession({initial: "25:00", current: "25:00", ongoing: "true"});
        setTimerBreak({initial: "05:00", current: "05:00", ongoing: "false"});

    }

    function handleStartStop() {

            clearInterval(timerIntervalID.current);
            setStart(!start);

        if (start) {

            handleAnimation(playRef.current, "forwardsOnly");

            const sessionT = timerSession.initial;
            const breakT = timerBreak.initial;
            let inProgress;
            timerSession.ongoing ? inProgress = sessionT : inProgress = breakT;
            let minutes = inProgress === sessionT ? timerSession.current.slice(0, 2) : timerBreak.current.slice(0, 2);
            let seconds = inProgress === sessionT ? timerSession.current.slice(3, 5) : timerBreak.current.slice(3, 5);

            timerIntervalID.current = setInterval(() => {
                        
                if (seconds === "00" && minutes === "00") {

                    beepRef.current.play();

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

        } else {
            handleAnimation(playRef.current, "backwardsOnly");
        }

    }


    return (
        <div className="clock__externalControls">
            <Button 
            trigger={handleStartStop} 
            click={clickRef}
            animate={playRef}
            timerOn={timerOn}>
                START
            </Button>
            <Button 
            trigger={handleReset} 
            click={clickRef}
            animate={resetRef}
            timerOn={timerOn}>
                RESET
            </Button>
            <audio src={Beep} ref={beepRef}></audio>
        </div>
    )
}

function Button({ children, trigger, click, animate, timerOn }) {

    return (
        <>
            <button
            onClick={timerOn ? trigger : null}
            id={children === "START" ? "start_stop" : "reset"}
            ref={animate}>
                {children}
            </button>
            <audio src={Click} ref={click}></audio>
        </>
    )
}