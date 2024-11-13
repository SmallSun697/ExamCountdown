const express = require('express');
const {execSync} = require('child_process');
const {join} = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

let gitVersion = null;

function getVersion() {
    const stats = fs.statSync("database/database.json");
    return stats.mtime.getTime();
}

app.get('/api/v2/data', (req, res) => {
    const database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));
    const nowTime = new Date().getHours() * 60 + new Date().getMinutes();
    const timeList = database.schedule.map(item => item.time);
    let data = database.schedule[0];
    let nextTime = timeList[1];
    for (let i = 1; i < timeList.length; i++) {
        if (nowTime >= timeList[i]) {
            data = database.schedule[i];
            nextTime = timeList[i + 1];
        }
    }
    if (!nextTime) {
        nextTime = 1440;
    }
    data = {
        version: getVersion(),
        nextTime: nextTime,
        notepad: database.notepad,
        ...data.days[new Date().getDay()]
    };
    res.send(data);
});

app.get('/api/v2/version', (req, res) => {
    const version = req.query.ver;
    const nowVersion = getVersion();
    const hash = execSync(
        "git ls-remote https://github.com/SmallSun697/ExamCountdown.git refs/heads/master",
        {stdio: 'pipe'}
    ).toString();
    if (hash === gitVersion) {
        if (nowVersion.toString() === version) {
            res.send(false);
        } else {
            res.send(true);
        }
    } else {
        execSync("git pull https://github.com/SmallSun697/ExamCountdown");
        gitVersion = hash;
        res.send("reload");
    }
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
