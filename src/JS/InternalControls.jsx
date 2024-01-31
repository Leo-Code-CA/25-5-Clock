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

        if (start) {

            let minutes = type.initial.slice(0, 2);

            if (change === "increase") {

                minutes++;

                minutes.toString().length === 1 ? minutes = "0" + minutes : null;

                type.initial !== "60:00" ? setType({...type, initial: `${minutes}:00`, current: `${minutes}:00`}) : null;
                

            } else if (change === "decrease") {

                minutes--;

                minutes.toString().length === 1 ? minutes = "0" + minutes : null;

                type.initial !== "01:00" ? setType({...type, initial: `${minutes}:00`, current: `${minutes}:00`}) : null;
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