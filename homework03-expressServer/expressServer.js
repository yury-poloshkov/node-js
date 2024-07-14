const express = new require('express');
const fs = new require('fs');
const path = new require('path');

const countersFilePath = path.join(__dirname, 'pagesCounters.json');

const expressServer = express();

const pagesCounters = JSON.parse(fs.readFileSync(countersFilePath));

expressServer.get('', (req, res) => {
    res.send(`<h1>Главная страница</h1><a href="./about">About</a><p>Page loaded: ${++pagesCounters.index} times</p>`);
    fs.writeFileSync(countersFilePath, JSON.stringify(pagesCounters, null, 2));
});
expressServer.get('/', (req, res) => {
    res.send(`<h1>Главная страница</h1><a href="./about">About</a><p>Page loaded: ${++pagesCounters.index} times</p>`);
    fs.writeFileSync(countersFilePath, JSON.stringify(pagesCounters, null, 2));
});
expressServer.get('/index', (req, res) => {
    res.send(`<h1>Главная страница</h1><a href="./about">About</a><p>Page loaded: ${++pagesCounters.index} times</p>`);
    fs.writeFileSync(countersFilePath, JSON.stringify(pagesCounters, null, 2));
});

expressServer.get('/about', (req, res) => {
    res.send(`<h1>Страница about</h1><a href="./">Главная</a><p>Page loaded: ${++pagesCounters.about} times</p>`);
    fs.writeFileSync(countersFilePath, JSON.stringify(pagesCounters, null, 2));
});

expressServer.use((req, res, next) => {
    res.status(404).send(`<h1>Запрашиваемая страница не найдена!</h1><a href="./">Главная</a><p>Error 404!</p><p>Page loaded: ${++pagesCounters.error404} times</p>`);
    fs.writeFileSync(countersFilePath, JSON.stringify(pagesCounters, null, 2));
});

const port = 30000;

expressServer.listen(port, () => {
    console.log(`ExpressServer maintained at port ${port}`);
});