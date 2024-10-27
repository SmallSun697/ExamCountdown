const express = require('express');
const {join} = require('path');
const {execSync} = require('child_process');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

let fetch;

app.use(express.static(join(__dirname, '')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/time', (req, res) => {
    res.sendFile(join(__dirname, 'time.html'));
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

cron.schedule('*/10 * * * * *', () => {
    fetch(""/*TODO*/, {
        headers: {"branchUpdateTime": ""/*TODO*/}
    })
        .then(response => response.text())
        .then(data => {
            if (data === "true") {
                execSync("git pull https://github.com/SmallSun697/ExamCountdown");
            }
        });
});