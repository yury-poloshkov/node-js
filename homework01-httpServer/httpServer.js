const http = new require('http');

// Счетчики, объявляем как глобальную переменную в рамках текущей задачи,
// но можно хранить на сервере в Базе данных или серверном файле,
// получать при запорсе на сервер и сохранять со значением +1 после удачной загрузки.
const pagesCounters = {
    index: 0,
    about: 0,
    error404: 0
}

const server = http.createServer((req, res) => {
    console.log('New request recieved');
    switch (req.url) {
        case '/':
        case '/index':
        case '':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>Главная страница</h1><a href="./about">About</a><p>Page loaded: ${++pagesCounters.index} times</p>`);
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>Страница about</h1><a href="./">Главная</a><p>Page loaded: ${++pagesCounters.about} times</p>`);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>Запрашиваемая страница не найдена!</h1><a href="./">Главная</a><p>Error 404!</p><p>Page loaded: ${++pagesCounters.error404} times</p>`);
            break;
    }

});

const port = 3000;

server.listen(port, () => {
    console.log(`HttpServer maintained at port ${port}`);
});