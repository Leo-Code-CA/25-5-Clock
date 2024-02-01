import { useRef } from "react";
import Click from './../assets/button_click.mp3';
import Beep from './../assets/alarm.mp3';

export default function ExternalControls({ setStart, start, timerBreak, setTimerBreak, timerSession, setTimerSession, timerOn }) {

    const timerIntervalID = useRef(null);
    const clickAudioRef = useRef(null);
    const beepAudioRef = useRef(null);
    const resetRef = useRef(null);
    const playRef = useRef(null);
    const animation = useRef(null);
    const inProgress = useRef(null);

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
            setTimeout(() => {clickAudioRef.current.play()}, 500);

        } else if (type === "backwardsOnly") {

            clickAudioRef.current.play();
            animation.current.reverse();

        } else {

            animation.current.play();
            setTimeout(() => {
                clickAudioRef.current.play();
                animation.current.reverse();
            }, 500)
        }
    };

    function handleReset() {

        handleAnimation(resetRef.current)
        beepAudioRef.current.pause();
        beepAudioRef.current.currentTime = 0;

        !start ? setTimeout(() => {handleAnimation(playRef.current, "backwardsOnly")}, 1000) : null;

        clearInterval(timerIntervalID.current);
        setStart(true);
        setTimerSession({initial: "25:00", current: "25:00", ongoing: "true"});
        setTimerBreak({initial: "05:00", current: "05:00", ongoing: "false"});
    };

    function handleStartStop() {

            clearInterval(timerIntervalID.current);
            setStart(!start);

        if (start) {

            handleAnimation(playRef.current, "forwardsOnly");

            const sessionT = timerSession.initial;
            const breakT = timerBreak.initial;
            // let inProgress;
            timerSession.ongoing ? inProgress.current = "session" : inProgress.current = "break";
            let minutes = inProgress.current === "session" ? timerSession.current.slice(0, 2) : timerBreak.current.slice(0, 2);
            let seconds = inProgress.current === "session" ? timerSession.current.slice(3, 5) : timerBreak.current.slice(3, 5);

            timerIntervalID.current = setInterval(() => {
                        
                if (seconds === "00" && minutes === "00") {

                    beepAudioRef.current.play();

                    console.log(timerSession, timerBreak)

                    if (inProgress.current === "session") {
                        inProgress.current = "break";
                        setTimerSession({...timerSession, current: "", ongoing: false});
                        setTimerBreak({...timerBreak, current: breakT, ongoing: true});

                        minutes = breakT.slice(0, 2);
                        seconds = breakT.slice(3, 5);
                    } else {
                        inProgress.current = "session";
                        setTimerSession({...timerSession, current: sessionT, ongoing: true});
                        setTimerBreak({...timerBreak, current: "", ongoing: false});

                        minutes = sessionT.slice(0, 2);
                        seconds = sessionT.slice(3, 5);
                    }

                } else if (seconds === "00") {
            
                    minutes--;
                    seconds = 59;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : null;
        
                    inProgress.current === "session" ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`, ongoing: true})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`, ongoing: true});
        
                } else {
            
                    seconds--;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : null;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : null;
        
                    inProgress.current === "session" ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`, ongoing: true})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`, ongoing: true});
            
                }
                
            }, 1000)

        } else {

            handleAnimation(playRef.current, "backwardsOnly");

        }

    };

    return (
        <div className="clock__externalControls">
            <Button 
            trigger={handleStartStop} 
            click={clickAudioRef}
            animate={playRef}
            timerOn={timerOn}>
                START
            </Button>
            <Button 
            trigger={handleReset} 
            click={clickAudioRef}
            animate={resetRef}
            timerOn={timerOn}>
                RESET
            </Button>
            <audio src={Beep} ref={beepAudioRef} id="beep"></audio>
        </div>
    )
};

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
};