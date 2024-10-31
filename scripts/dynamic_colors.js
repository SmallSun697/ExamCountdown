window.onload = function () {
    const hash = window.parent.location.hash.slice(1);
    let mainColor, secondaryColor;
    if (hash) {
        [mainColor, secondaryColor] = hash.split('&').slice(-2);
    } else {
        [mainColor, secondaryColor] = [];/*TODO: API database theme*/
    }
    document.documentElement.style.setProperty("--main-color", `#${mainColor}`);
    document.documentElement.style.setProperty("--secondary-color", `#${secondaryColor}`);
}