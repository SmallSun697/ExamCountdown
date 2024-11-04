import {setDatabase, database} from "./database.js";

function updateDatabase() {
    fetch("databaseUpdate"/*TODO*/
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

(async () => {
    async function fetchDatabase() {
        try {
            database = await (await fetch("fetchDatabase"/*TODO:API(fetch database.json)*/)).json();
            loadPage();
            setInterval(updateDatabase, 10000);
        } catch (error) {
            setTimeout(fetchDatabase, 5000);
        }
    }

    await fetchDatabase();
})();
