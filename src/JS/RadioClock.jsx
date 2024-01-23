import ExternalControls from "./ExternalControls.jsx";
import InternalControls from "./InternalControls.jsx";
import MainScreen from "./MainScreen.jsx";
import Stations from "./Stations.jsx";

export default function RadioClock() {

    return (
        <div className="clock">
            <ExternalControls />
            <InternalControls />
            <div className="clock__screenAndStations">
                <MainScreen />
                <Stations />
            </div>
        </div>
    )
}