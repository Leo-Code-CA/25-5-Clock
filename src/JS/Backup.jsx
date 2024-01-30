function resetAnimation() {
        
    const moveBtn = [
        {transform: "translateY(0)"},
        {transform: "translateY(70%)"},
        // {transform: "translateY(0)"}
    ]

    const animationOptions = {
        duration: 1000,
        iteration: 1,
        fill: "forwards"
    }

    resetRef.current.animate(moveBtn, animationOptions);

    setTimeout(() => {
        clickRef.current.play();
    }, 500);

}