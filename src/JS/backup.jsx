EXTERNAL CONTROLS: 

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

        !start ? setTimeout(() => {handleAnimation(playRef.current, "backwardsOnly")}, 1000) : null;

        clearInterval(timerIntervalID.current);
        setStart(true);
        setTimerSession({initial: 25, current: "25:00", ongoing: true});
        setTimerBreak({initial: 5, current: "05:00", ongoing: false});
    };

    function handleStartStop() {

            clearInterval(timerIntervalID.current);
            setStart(!start);

        if (start) {

            handleAnimation(playRef.current, "forwardsOnly");

            function handleDisplay(initialtime) {
                let time = initialtime;
                time.toString().length === 1 ? time = "0" + time + ":00" : time = time + ":00";
                return time;
            }

            let minutes, seconds;
            timerSession.ongoing ? minutes = timerSession.current.slice(0, 2) : minutes = timerBreak.current.slice(0, 2);
            timerSession.ongoing ? seconds = timerSession.current.slice(3, 5) : seconds = timerBreak.current.slice(3, 5);

            timerIntervalID.current = setInterval(() => {

                        
                if (seconds === "00" && minutes === "00") {

                    beepAudioRef.current.play();

                    if (timerSession.ongoing) {

                        setTimerSession({...timerSession, current: "", ongoing: false});
                        setTimerBreak({...timerBreak, current: handleDisplay(timerBreak.initial), ongoing: true});
                        minutes = handleDisplay(timerBreak.initial).slice(0, 2);
                        seconds = handleDisplay(timerBreak.initial).slice(3, 5);

                        
                    } else {

                        setTimerSession({...timerSession, current: handleDisplay(timerSession.initial), ongoing: true});
                        setTimerBreak({...timerBreak, current: "", ongoing: false});
                        minutes = handleDisplay(timerSession.initial).slice(0, 2);
                        seconds = handleDisplay(timerSession.initial).slice(3, 5);


                    }

                    minutes = "00";
                    seconds = "05"

                } else if (seconds === "00") {
            
                    minutes--;
                    seconds = 59;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : minutes = minutes;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : seconds = seconds;
        
                    timerSession.ongoing ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`});
        
                } else {
            
                    seconds--;
    
                    minutes.toString().length === 1 ? minutes = "0" + minutes : minutes = minutes;
                    seconds.toString().length === 1 ? seconds = "0" + seconds : seconds = seconds;
        
                    timerSession.ongoing ? 
                    setTimerSession({...timerSession, current: `${minutes}:${seconds}`})
                    : setTimerBreak({...timerBreak, current: `${minutes}:${seconds}`});
            
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
            <audio src={Beep} ref={beepAudioRef}></audio>
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



INTERNAL CONTROLS :

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function InternalControls({ clockOn, setClockOn, timerOn, setTimerOn, timerBreak, setTimerBreak, timerSession, setTimerSession, start }) {

    function handleSwitch(current, setCurrent, other, setOther) {

        if (!current && other) {
            setCurrent(c => !c);
            setOther(o => !o);
        } else {
            setCurrent(c => !c)
        }
    };

    function handleSessionChange(change, type, setType) {

        function displayMinutes(minutes) {
            return minutes.toString().length === 1 ? minutes = "0" + minutes : minutes = minutes;
        }

        if (start) {

            let minutes = type.initial;

            if (change === "increase") {

                minutes++;

                type.initial !== 60 ? setType({...type, initial: minutes, current: `${displayMinutes(minutes)}:00`}) : null;
                

            } else if (change === "decrease") {

                minutes--;

                type.initial !== 1 ? setType({...type, initial: minutes, current: `${displayMinutes(minutes)}:00`}) : null;
            }
        }
    };


    return (
        <div className="clock__internalControls">
            <div className="clock__switchContainer">
                <Switch 
                turnedOn={clockOn} 
                onSwitch={() => handleSwitch(clockOn, setClockOn, timerOn, setTimerOn)}>
                    CLOCK
                </Switch>
                <Switch 
                turnedOn={timerOn} 
                onSwitch={() => handleSwitch(timerOn, setTimerOn, clockOn, setClockOn)}>
                    TIMER
                </Switch>
            </div>
            <div className="clock__lengthContainer">
                <Length
                timerOn={timerOn}
                display={timerSession.initial}
                decreaseTime={() => handleSessionChange("decrease", timerSession, setTimerSession)}
                increaseTime={() => handleSessionChange("increase", timerSession, setTimerSession)}
                >
                    Session
                </Length>
                <Length
                timerOn={timerOn}
                display={timerBreak.initial}
                decreaseTime={() => handleSessionChange("decrease", timerBreak, setTimerBreak)}
                increaseTime={() => handleSessionChange("increase", timerBreak, setTimerBreak)}
                start={start}
                >
                    Break
                </Length>
            </div>
        </div>
    )
};

function Switch({ children, onSwitch, turnedOn }) {

    return (
        <div className="clock__switch">
            <h2>{children}</h2>
            <div className="clock__onOffBtn">
                <span>ON</span>
                <div
                className={turnedOn ? "clock__onContainer clock__onContainer--on" : "clock__onContainer clock__onContainer--off"}>
                    <button
                    onClick={onSwitch}
                    className="clock__on"
                    ></button>
                </div>
                <span>OFF</span>
            </div>
        </div>
    )
};

function Length({ children, timerOn, display, decreaseTime, increaseTime }) {

    return (
        <div className="clock__length">
            <h3 id={children === "Session" ? "session-label" : "break-label" }>{children} Length</h3>
            <div className="clock__smallScreenContainer">
                <div 
                    id={children === "Session" ? "session-length" : "break-length" }
                    className="clock__smallScreen">
                        {timerOn && display}
                </div>
                <button
                onClick={increaseTime}
                id={children === "Session" ? "session-increment" : "break-increment" }>
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} style={{color: '#FFF'}}/>
                </button>
                <button
                onClick={decreaseTime}
                id={children === "Session" ? "session-decrement" : "break-decrement" }>
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} rotation={180} style={{color: '#FFF'}}/>
                </button>
            </div>
        </div>
    )
};


MAIN SCREEN : 

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
                {timerOn ? (timerBreak.ongoing ? "Break" : "Session") : null}
            </div>
            <div className="clock__mainDisplay" id={timerOn ? "time-left" : undefined}>
                {timerOn ? timerSession.current 
                : clockOn ? <div className="clock__time">{time.slice(0, 5)}<span>{time.slice(5)}</span></div>
                : null}
            </div>
        </div>
    )
};


// {timerOn ? (timerBreak.ongoing ? timerBreak.current : timerSession.current) 
//     : clockOn ? <div className="clock__time">{time.slice(0, 5)}<span>{time.slice(5)}</span></div>
//     : null}