export default function ExternalControls({ timerOn, setSession }) {

    return (
        <div className="clock__externalControls">
            <Button>START</Button>
            <Button>RESET</Button>
        </div>
    )
}

function Button({ children }) {

    return (
        <>
            <button
            id={children === "START" ? "start_stop" : "reset"}>
                {children}
            </button>
        </>
    )
}