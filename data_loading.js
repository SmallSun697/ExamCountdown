let database;

function updateDatabase() {
    fetch("databaseUpdate"/*TODO*/, {
        headers: {"databaseUpdateTime": ""/*TODO*/}
    })
        .then(response => response.text())
        .then(data => {
            if (data === "true") {
                location.href = '/';
            }
        });
}

function loadPage(page) {
    if (!page) {
        //page = /*TODO:database*/
        return;
    }
    if (window.location.hash) {
        page = window.location.hash.slice(1);
    }
    const iframe = document.createElement("iframe");
    iframe.src = `${page}.html`;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    document.body.innerHTML = '';
    document.body.appendChild(iframe);
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