const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const DIST = './dist/optimy-pwa-app';
const PORT = 8080;
const DIST_DIR = path.join(__dirname, DIST);

const template = fs.readFileSync(path.join(DIST_DIR, 'index.html')).toString();

app.get('*.*', express.static(DIST_DIR, { maxAge: '1y' }));

app.get('*', (req, res) => {
    res.send(template);
});

app.listen(PORT, () => {
    console.log(`Listing on http://127.0.0.1:${PORT}`);
});
