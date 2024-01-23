export default function ExternalControls() {

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
            <button>{children}</button>
        </>
    )
}