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

(async () => {
    async function fetchDatabase() {
        try {
            database = await (await fetch("fetchDatabase"/*TODO:API(fetch database.json)*/)).json();
            setInterval(updateDatabase, 10000);
        } catch (error) {
            setTimeout(fetchDatabase, 5000);
        }
    }

    await fetchDatabase();
})();