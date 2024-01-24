import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


export default function InternalControls({ clockOn, setClockOn }) {

    return (
        <div className="clock__internalControls">
            <div className="clock__switchContainer">
                <Switch clockOn={clockOn} setClockOn={setClockOn}>CLOCK</Switch>
                <Switch>TIMER</Switch>
            </div>
            <div className="clock__lengthContainer">
                <Length>Session</Length>
                <Length>Break</Length>
            </div>
        </div>
    )
};

function Switch({ children, clockOn, setClockOn }) {

    return (
        <div className="clock__switch">
            <h2>{children}</h2>
            <div className="clock__onOffBtn">
                <span>ON</span>
                <div>
                    <button
                    onClick={() => setClockOn(prev => !prev)}
                    className={clockOn ? "clock__on--on" : "clock__on--off"}
                    ></button>
                </div>
                <span>OFF</span>
            </div>
        </div>
    )
};

function Length({ children }) {

    return (
        <div className="clock__length">
            <h3>{children} Length</h3>
            <div className="clock__smallScreenContainer">
                <div className="clock__smallScreen"></div>
                <button>
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} />
                </button>
                <button>
                    <FontAwesomeIcon icon={icon({name: 'up-long'})} rotation={180} />
                </button>
            </div>
        </div>
    )
}