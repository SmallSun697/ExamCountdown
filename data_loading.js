let database;

function updateDatabase() {
    fetch("databaseUpdate"/*TODO*/, {
        headers: {"databaseUpdateTime": ""/*TODO*/}
    })
        .then(response => response.text())
        .then(data => {
            if (data === "true") {
                location.reload();
            }
        });
}

function loadPage(page) {
    const old = document.body.querySelectorAll(".display");
    const iframe = document.createElement("iframe");
    if (window.location.hash) {
        page = window.location.hash.slice(1);
    } else if (!page) {
        //page = /*TODO:database*/
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
    iframe.style.display = "none";
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
