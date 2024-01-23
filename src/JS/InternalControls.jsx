export default function InternalControls() {

    return (
        <div className="clock__internalControls">
            <div className="clock__switchContainer">
                <Switch>CLOCK</Switch>
                <Switch>TIMER</Switch>
            </div>
            <div className="clock__lengthContainer">
                <Length>Session</Length>
                <Length>Break</Length>
            </div>
        </div>
    )
};

function Switch({ children }) {

    return (
        <div className="clock__switch">
            <h2>{children}</h2>
            <div>
                <span>ON</span>
                <button></button>
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
                <button>UP</button>
                <button>DOWN</button>
            </div>
        </div>
    )
}