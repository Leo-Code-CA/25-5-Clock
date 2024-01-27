import ExternalControls from "./ExternalControls.jsx";
import InternalControls from "./InternalControls.jsx";
import MainScreen from "./MainScreen.jsx";
import Stations from "./Stations.jsx";
import { useState } from 'react';

export default function RadioClock() {

    const [time, setTime] = useState("");
    const [start, setStart] = useState(true);
    const [clockOn, setClockOn] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [session, setSession] = useState({initialTimer: "00:10", initialBreak: "00:05", currentTimer: "00:10", currentBreak: "00:05", ongoing: ""})

    return (
        <div className="clock">

            <ExternalControls 
            timerOn={timerOn}
            setSession={setSession}
            session={session}
            start={start}
            setStart={setStart}
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
                start={start}
                />

                <Stations />
            </div>
        </div>
    )
}