import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function InternalControls({clockOn, setClockOn, timerOn, setTimerOn, session, setSession}) {



    function handleSwitch(current, setCurrent, other, setOther) {

        if (!current && other) {
            setCurrent(c => !c);
            setOther(o => !o);
        } else {
            setCurrent(c => !c)
        }
    }

    function handleSessionChange(change, type) {

        if (change === "increase") {

            session[type] !== 59 ? setSession({...session, [type]: session[type] + 1}) : null;

 
        } else if (change === "decrease") {

            session[type] !== 1 ? setSession({...session, [type]: session[type] - 1}) : null;

        }
        
    }

    return (
        <div className="clock__internalControls">
            <div className="clock__switchContainer">
                <Switch 
                turnedOn={clockOn} 
                onSwitch={() => handleSwitch(clockOn, setClockOn, timerOn, setTimerOn)}>CLOCK</Switch>
                <Switch 
                turnedOn={timerOn} 
                onSwitch={() => handleSwitch(timerOn, setTimerOn, clockOn, setClockOn)}>TIMER</Switch>
            </div>
            <div className="clock__lengthContainer">
                <Length
                timerOn={timerOn}
                // display={session.initialTimer}
                decreaseTime={() => handleSessionChange("decrease", "initialTimer")}
                increaseTime={() => handleSessionChange("increase", "initialTimer")}
                >
                    Session
                </Length>
                <Length
                timerOn={timerOn}
                // display={session.initialBreak}
                decreaseTime={() => handleSessionChange("decrease", "initialBreak")}
                increaseTime={() => handleSessionChange("increase", "initialBreak")}
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
                        {/* {timerOn && display} */}
                </div>
                <button
                onClick={increaseTime}
                id={children === "Session" ? "session-increment" : "break-increment" }
                >
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} />
                </button>
                <button
                onClick={decreaseTime}
                id={children === "Session" ? "session-decrement" : "break-decrement" }
                >
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} rotation={180} />
                </button>
            </div>
        </div>
    )
}