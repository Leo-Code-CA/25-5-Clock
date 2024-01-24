import { useState } from 'react';

export default function Stations() {

    const [currentStation, setCurrentStation] = useState(0);

    return (
        <div className="clock__stationsContainer">
            <div className="clock__stationsOverview">
                <div className="clock__stationOverviewIndicator"></div>
            </div>
            <div className="clock__stationsCursorContainer">
                <div className="clock__stationsCursor"></div>
            </div>
        </div>
    )
}