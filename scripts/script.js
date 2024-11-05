window.onload = function () {
    const hash = window.parent.location.hash.slice(1);
    let mainColor, secondaryColor;
    if (hash) {
        [mainColor, secondaryColor] = hash.split('&').slice(-2);
    } else {
        [mainColor, secondaryColor] = [];/*TODO: API database theme*/
    }
    if (mainColor && secondaryColor) {
        document.documentElement.style.setProperty("--main-color", `#${mainColor}`);
        document.documentElement.style.setProperty("--secondary-color", `#${secondaryColor}`);
    }
}

document.addEventListener("mousemove", () => {
    document.body.style.cursor = "default";
});

document.addEventListener("keydown", (Event) => {
    if (Event.key === " ") {
        document.body.style.cursor = "none";
    }
});
