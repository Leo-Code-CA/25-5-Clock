import ExternalControls from "./ExternalControls.jsx";
import InternalControls from "./InternalControls.jsx";
import MainScreen from "./MainScreen.jsx";
import Stations from "./Stations.jsx";
import { useState } from 'react';

export default function RadioClock() {

    const [clockOn, setClockOn] = useState(false);
    const [time, setTime] = useState("");
    const [timerOn, setTimerOn] = useState(false);
    const [session, setSession] = useState({initialTimer: 25, initialBreak: 5, currentTimer: "00:15", currentBreak: "00:10", ongoing: ""})

    return (
        <div className="clock">

            <ExternalControls 
            timerOn={timerOn}
            setSession={setSession}
            />

            <InternalControls 
            setClockOn={setClockOn} 
            clockOn={clockOn}
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            session={session}
            setSession={setSession}/>

            <div className="clock__screenAndStations">
                
                <MainScreen
                time={time}
                setTime={setTime} 
                clockOn={clockOn}
                timerOn={timerOn}
                session={session}
                setSession={setSession}
                />

                <Stations />
            </div>
        </div>
    )
}