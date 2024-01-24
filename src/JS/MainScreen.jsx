export default function MainScreen({ clockOn }) {

    return (
        <div className="clock__mainScreenContainer">
            <div className="clock__mainScreen">
                <div className="clock__secondaryDisplay"></div>
                <div className="clock__mainDisplay">{clockOn ? "11:49" : null}</div>
            </div>
        </div>
    )
}