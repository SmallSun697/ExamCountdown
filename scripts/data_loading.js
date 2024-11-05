import {setDatabase, database} from "./database.js";

function updateDatabase() {
    fetch("http://192.168.202.130:19132/api/v2/database"
    )
        .then(response => response.text())
        .then(data => {
            if (data === "true") {
                loadPage();
            }
        });
}

function loadPage(page) {
    const hash = window.location.hash.slice(1);
    const old = document.body.querySelectorAll(".display");
    const iframe = document.createElement("iframe");
    if (hash) {
        page = hash.split('&')[0];
    }
    old.forEach(item => {
        item.classList.add("old");
    });
    iframe.src = `${page}.html`;
    iframe.classList.add("display");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    document.body.appendChild(iframe);
    iframe.onload = () => {
        document.querySelectorAll(".old").forEach((item) => {
            item.remove();
        })
        iframe.style.display = "block";
    }
}

async function fetchDatabase() {
    try {
        setDatabase(await (await fetch("http://192.168.202.130:19132/api/v2/data")).json());
        loadPage();
        setInterval(updateDatabase, 10000);
    } catch (error) {
        console.log(error);
        setTimeout(fetchDatabase, 5000);
    }
}

let use = true;

(async () => {
    if (use) {
        await fetchDatabase();
        use = false;
    }
})();
