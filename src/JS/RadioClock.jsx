import ExternalControls from "./ExternalControls.jsx";
import InternalControls from "./InternalControls.jsx";
import MainScreen from "./MainScreen.jsx";
import Stations from "./Stations.jsx";
import Antenna from './../assets/antenna.svg';
import { useState } from 'react';

export default function RadioClock() {

    const [time, setTime] = useState("");
    const [start, setStart] = useState(true);
    const [clockOn, setClockOn] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [timerBreak, setTimerBreak] = useState({initial: "05:00", current: "05:00", ongoing: false});
    const [timerSession, setTimerSession] = useState({initial: "25:00", current: "25:00", ongoing: true});

    return (
        <div className="clock">

            <img src={Antenna} alt="radio antenna illustration" className="clock__extrernalAntenna"/>

            <ExternalControls 
            timerOn={timerOn}
            start={start}
            setStart={setStart}
            timerBreak={timerBreak}
            setTimerBreak={setTimerBreak}
            timerSession={timerSession}
            setTimerSession={setTimerSession}
            />

            <div className="clock__bg">

                <InternalControls 
                clockOn={clockOn}
                setClockOn={setClockOn}
                timerOn={timerOn}
                setTimerOn={setTimerOn}
                timerBreak={timerBreak}
                setTimerBreak={setTimerBreak}
                timerSession={timerSession}
                setTimerSession={setTimerSession}
                start={start}
                />

                <div className="clock__screenAndStations">
                    
                    <MainScreen
                    time={time}
                    setTime={setTime} 
                    clockOn={clockOn}
                    timerOn={timerOn}
                    timerSession={timerSession}
                    timerBreak={timerBreak}
                    />

                    <Stations />

                    <div className="clock__speakers"></div>

                </div>

            </div>

        </div>
    )
};