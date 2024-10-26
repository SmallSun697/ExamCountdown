const express = require('express');
const {join} = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/time', (req, res) => {
    res.sendFile(join(__dirname, 'time.html'));
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});