import ExternalControls from "./ExternalControls.jsx";
import InternalControls from "./InternalControls.jsx";
import MainScreen from "./MainScreen.jsx";
import Stations from "./Stations.jsx";
import { useState } from 'react';

export default function RadioClock() {

    const [clockOn, setClockOn] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [sessionLength, setSessionLength] = useState({inital: 25000, current: 25000});
    const [breakLength, setBreakLength] = useState({initial: 5000, current: 5000});

    return (
        <div className="clock">
            <ExternalControls />
            <InternalControls setClockOn={setClockOn} clockOn={clockOn}/>
            <div className="clock__screenAndStations">
                <MainScreen />
                <Stations />
            </div>
        </div>
    )
}