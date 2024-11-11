let data;

async function fetchDatabase() {
    try {
        data = await (await fetch("http://localhost:3000/api/v2/data")).json();
        localStorage.setItem("database", JSON.stringify(data));
        loadPage(data.page);
    } catch (error) {
        setTimeout(fetchDatabase, 3000);
    }
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
        iframe.style.opacity = "1";
        document.querySelectorAll(".old").forEach((item) => {
            setTimeout(() => {
                item.remove()
            }, 1500);
        })
    }
}

function updateDatabase() {
    fetch("http://localhost:3000/api/v2/version?ver=" + data.version)
        .then(response => response.text())
        .then(async data => {
            if (data.trim() === "true") {
                await fetchDatabase();
            } else if (data.trim() === "reload") {
                window.location.reload();
            }
        });
}

(async () => {
    await fetchDatabase();
    setInterval(updateDatabase, 10000);
})();
